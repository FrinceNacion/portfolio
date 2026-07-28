/**
 * DitherShape — rotating 3-D icosahedron rendered entirely with
 * Bayer-ordered dither dots. Drop it anywhere; only p5 is required.
 *
 * Props
 * ─────
 * size         canvas width & height in px          (default 420)
 * dot_spacing  grid spacing between dots in px      (default 6)
 * dot_radius   radius of each dot in px             (default 0.8)
 * ink_color    [r, g, b] of the ink dots            (default #16283F)
 * speed_x      rotation speed around X axis         (default 0.55)
 * speed_y      rotation speed around Y axis         (default 1.0)
 *
 * Usage
 * ─────
 * <DitherShape size={460} dot_spacing={6} dot_radius={0.8} />
 */

import { useEffect, useRef } from 'react'
import type p5Type from 'p5'

// ── Types ────────────────────────────────────────────────────────────────────

type Vec3 = [number, number, number]

// ── Bayer 4×4 ordered dither matrix, values normalised to [0, 1] ─────────────

const BAYER_MATRIX_4X4 = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
].map(row => row.map(cell_value => cell_value / 16))

// ── Icosahedron geometry ──────────────────────────────────────────────────────

// Golden ratio — defines the proportions of icosahedron vertex coordinates.
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

// Twelve vertices of a unit icosahedron, normalised to lie on the unit sphere.
const ICOSAHEDRON_VERTICES: Vec3[] = [
  [ 0,  1,  GOLDEN_RATIO], [ 0, -1,  GOLDEN_RATIO],
  [ 0,  1, -GOLDEN_RATIO], [ 0, -1, -GOLDEN_RATIO],
  [ 1,  GOLDEN_RATIO,  0], [-1,  GOLDEN_RATIO,  0],
  [ 1, -GOLDEN_RATIO,  0], [-1, -GOLDEN_RATIO,  0],
  [ GOLDEN_RATIO,  0,  1], [-GOLDEN_RATIO,  0,  1],
  [ GOLDEN_RATIO,  0, -1], [-GOLDEN_RATIO,  0, -1],
].map(([x, y, z]) => {
  const length = Math.sqrt(x * x + y * y + z * z)
  return [x / length, y / length, z / length]
})

// Twenty triangular faces, each as vertex-index triples.
const ICOSAHEDRON_FACES: [number, number, number][] = [
  [0, 1, 8], [0, 8,  4], [0,  4,  5], [0,  5, 9], [0, 9, 1],
  [1, 6, 8], [8, 10, 4], [4,  2,  5], [5, 11, 9], [9, 7, 1],
  [3, 6,10], [3, 10, 2], [3,  2, 11], [3, 11, 7], [3, 7, 6],
  [6, 1, 7], [7,  9,11], [11, 5,  2], [2,  4, 10],[10, 8, 6],
]

// ── 3-D math helpers ─────────────────────────────────────────────────────────

function rotate_around_x(vec: Vec3, angle: number): Vec3 {
  const cos_a = Math.cos(angle)
  const sin_a = Math.sin(angle)
  return [
    vec[0],
    vec[1] * cos_a - vec[2] * sin_a,
    vec[1] * sin_a + vec[2] * cos_a,
  ]
}

function rotate_around_y(vec: Vec3, angle: number): Vec3 {
  const cos_a = Math.cos(angle)
  const sin_a = Math.sin(angle)
  return [
    vec[0] * cos_a + vec[2] * sin_a,
    vec[1],
    -vec[0] * sin_a + vec[2] * cos_a,
  ]
}

// Perspective-projects a 3-D vertex onto a 2-D plane.
// camera_depth pushes the geometry away from the lens; higher = less distortion.
function project_vertex(vec: Vec3, canvas_scale: number, camera_depth = 3): [number, number] {
  const depth = vec[2] + camera_depth
  return [
    (vec[0] * camera_depth / depth) * canvas_scale,
    (vec[1] * camera_depth / depth) * canvas_scale,
  ]
}

// Sign-of-cross-product test — returns true when (point_x, point_y) is inside
// the triangle defined by vertices (v1, v2, v3).
function is_point_in_triangle(
  point_x: number, point_y: number,
  v1_x: number, v1_y: number,
  v2_x: number, v2_y: number,
  v3_x: number, v3_y: number,
): boolean {
  const sign_a = (point_x - v2_x) * (v1_y - v2_y) - (v1_x - v2_x) * (point_y - v2_y)
  const sign_b = (point_x - v3_x) * (v2_y - v3_y) - (v2_x - v3_x) * (point_y - v3_y)
  const sign_c = (point_x - v1_x) * (v3_y - v1_y) - (v3_x - v1_x) * (point_y - v1_y)
  return !(
    (sign_a < 0 || sign_b < 0 || sign_c < 0) &&
    (sign_a > 0 || sign_b > 0 || sign_c > 0)
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

interface DitherShapeProps {
  size?: number
  dot_spacing?: number
  dot_radius?: number
  ink_color?: [number, number, number]
  speed_x?: number
  speed_y?: number
}

export default function DitherShape({
  size       = 420,
  dot_spacing = 6,
  dot_radius  = 0.8,
  ink_color   = [22, 40, 63],
  speed_x     = 0.55,
  speed_y     = 1.0,
}: DitherShapeProps) {
  const canvas_container_ref = useRef<HTMLDivElement>(null)
  const p5_instance_ref      = useRef<p5Type | null>(null)

  useEffect(() => {
    if (!canvas_container_ref.current) return

    import('p5').then(({ default: P5 }) => {
      const sketch = (p: p5Type) => {
        const [ink_r, ink_g, ink_b] = ink_color

        // Fixed light direction — upper-left-front hemisphere (not normalised yet).
        const LIGHT_DIR_X = 0.5
        const LIGHT_DIR_Y = -0.5
        const LIGHT_DIR_Z = 0.8
        const light_dir_length = Math.sqrt(
          LIGHT_DIR_X * LIGHT_DIR_X +
          LIGHT_DIR_Y * LIGHT_DIR_Y +
          LIGHT_DIR_Z * LIGHT_DIR_Z,
        )

        p.setup = () => {
          const canvas_element = p.createCanvas(size, size)
          canvas_element.style('display', 'block')
          p.noStroke()
          p.frameRate(30)
        }

        p.draw = () => {
          p.clear()

          const time    = p.frameCount * 0.01
          const angle_x = time * speed_x
          const angle_y = time * speed_y

          const canvas_scale = size * 0.36
          const center_x     = size / 2
          const center_y     = size / 2

          // Apply rotation to all twelve vertices.
          const rotated_vertices = ICOSAHEDRON_VERTICES.map(vertex =>
            rotate_around_y(rotate_around_x(vertex, angle_x), angle_y)
          )

          // Project each rotated vertex into 2-D canvas coordinates.
          const projected_vertices = rotated_vertices.map(vertex => {
            const [screen_x, screen_y] = project_vertex(vertex, canvas_scale)
            return [screen_x + center_x, screen_y + center_y] as [number, number]
          })

          // Painter's algorithm: sort faces back-to-front by average Z depth.
          const faces_back_to_front = ICOSAHEDRON_FACES
            .map(face => ({
              face,
              avg_depth: (
                rotated_vertices[face[0]][2] +
                rotated_vertices[face[1]][2] +
                rotated_vertices[face[2]][2]
              ) / 3,
            }))
            .sort((face_a, face_b) => face_a.avg_depth - face_b.avg_depth)

          for (const { face } of faces_back_to_front) {
            const [vert_idx_a, vert_idx_b, vert_idx_c] = face

            const [v1_x, v1_y] = projected_vertices[vert_idx_a]
            const [v2_x, v2_y] = projected_vertices[vert_idx_b]
            const [v3_x, v3_y] = projected_vertices[vert_idx_c]

            // Compute face normal via cross product of two edge vectors.
            const vert_a_3d = rotated_vertices[vert_idx_a]
            const vert_b_3d = rotated_vertices[vert_idx_b]
            const vert_c_3d = rotated_vertices[vert_idx_c]

            const edge1_x = vert_b_3d[0] - vert_a_3d[0]
            const edge1_y = vert_b_3d[1] - vert_a_3d[1]
            const edge1_z = vert_b_3d[2] - vert_a_3d[2]

            const edge2_x = vert_c_3d[0] - vert_a_3d[0]
            const edge2_y = vert_c_3d[1] - vert_a_3d[1]
            const edge2_z = vert_c_3d[2] - vert_a_3d[2]

            const normal_x = edge1_y * edge2_z - edge1_z * edge2_y
            const normal_y = edge1_z * edge2_x - edge1_x * edge2_z
            const normal_z = edge1_x * edge2_y - edge1_y * edge2_x
            const normal_length = Math.sqrt(
              normal_x * normal_x + normal_y * normal_y + normal_z * normal_z
            )

            // Back-face cull: skip any face whose normal points away from the viewer (+Z axis).
            if (normal_z / normal_length < -0.05) continue

            // Lambertian diffuse dot product determines how bright (dense) this face is.
            const diffuse_intensity = Math.max(0.08, (
              normal_x * LIGHT_DIR_X / light_dir_length +
              normal_y * LIGHT_DIR_Y / light_dir_length +
              normal_z * LIGHT_DIR_Z / light_dir_length
            ) / normal_length)

            // Map diffuse intensity to a Bayer threshold: bright faces draw more dots.
            const dither_threshold = 0.1 + diffuse_intensity * 0.82

            const bbox_left   = Math.floor(Math.min(v1_x, v2_x, v3_x))
            const bbox_right  = Math.ceil(Math.max(v1_x, v2_x, v3_x))
            const bbox_top    = Math.floor(Math.min(v1_y, v2_y, v3_y))
            const bbox_bottom = Math.ceil(Math.max(v1_y, v2_y, v3_y))

            const dot_alpha = Math.round(p.map(diffuse_intensity, 0.08, 1, 60, 220))
            p.fill(ink_r, ink_g, ink_b, dot_alpha)

            // Walk the dot grid within the bounding box, drawing dots that pass the
            // Bayer test and fall inside the triangle.
            const grid_cell_span = 4 * dot_spacing
            for (let grid_x = Math.ceil(bbox_left / dot_spacing) * dot_spacing; grid_x <= bbox_right; grid_x += dot_spacing) {
              for (let grid_y = Math.ceil(bbox_top / dot_spacing) * dot_spacing; grid_y <= bbox_bottom; grid_y += dot_spacing) {
                if (!is_point_in_triangle(grid_x, grid_y, v1_x, v1_y, v2_x, v2_y, v3_x, v3_y)) continue

                // Tile the Bayer matrix across the canvas using modular indexing.
                const bayer_col = Math.floor(((grid_x % grid_cell_span) + grid_cell_span) % grid_cell_span / dot_spacing) % 4
                const bayer_row = Math.floor(((grid_y % grid_cell_span) + grid_cell_span) % grid_cell_span / dot_spacing) % 4

                if (BAYER_MATRIX_4X4[bayer_row][bayer_col] < dither_threshold) {
                  p.ellipse(grid_x, grid_y, dot_radius * 2, dot_radius * 2)
                }
              }
            }
          }
        }
      }

      p5_instance_ref.current = new P5(sketch, canvas_container_ref.current!)
    })

    return () => { p5_instance_ref.current?.remove() }
  }, [size, dot_spacing, dot_radius, ink_color, speed_x, speed_y])

  return (
    <div
      ref={canvas_container_ref}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size,
        height: size,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
