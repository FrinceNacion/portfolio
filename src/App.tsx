import { useState, useEffect } from 'react'
import DitherShape from './DitherShape'
import { MoveUpRight } from 'lucide-react';

const PALETTE = {
  cream: '#F7F4EC',
  ink_light: '#C7D4E8',
  ink_mid: '#5E7FA3',
  ink_primary: '#2A4D7A',
  ink_deep: '#16283F',
  shadow: '#DCD5C4',
}


function useMobile(): boolean {
  const [is_mobile, set_is_mobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const on_resize = () => set_is_mobile(window.innerWidth < 768)
    window.addEventListener('resize', on_resize, { passive: true })
    return () => window.removeEventListener('resize', on_resize)
  }, [])
  return is_mobile
}

function useShapeSize(): number {
  const [shape_size, set_shape_size] = useState(
    () => Math.round(Math.min(window.innerWidth, window.innerHeight) * 1.1)
  )
  useEffect(() => {
    const on_resize = () =>
      set_shape_size(Math.round(Math.min(window.innerWidth, window.innerHeight) * 1.1))
    window.addEventListener('resize', on_resize, { passive: true })
    return () => window.removeEventListener('resize', on_resize)
  }, [])
  return shape_size
}

type PanelKey = 'work' | 'skills' | 'experience' | 'contact'

const PROJECTS = [
  {
    name: 'Code Complexity Analyzer',
    year: '2026',
    tags: ['Python', 'JavaScript', 'React', 'Bootstrap', 'CSS'],
    type: 'Developer Tool',
    description: 'A Python code quality and complexity analysis tool that measures maintainability metrics, builds call graphs, and predicts Big-O complexity using a machine learning model.',
    link: 'https://code-complexity-analyze.vercel.app'
  },
  {
    name: 'Algorithm Complexity Analyzer',
    year: '2026',
    tags: ['HTML', 'JavaScript', 'CSS'],
    type: 'Developer Tool',
    description: 'An algorithm complexity analyzer that helps users evaluate and compare the efficiency of different algorithms by analyzing their time and space complexity. It provides a user-friendly interface for exploring algorithm behavior, saving results, and managing account-based history and verification features.',
    link: 'https://frincenacion.github.io/algorithm-complexity-analyzer'
  },
  {
    name: 'Pathfinding Algorithm Playground',
    year: '2026',
    tags: ['JavaScript', 'React', 'Bootstrap', 'CSS'],
    type: 'Developer Tool',
    description: 'An interactive pathfinding algorithm playground that visualizes how different search and traversal algorithms navigate a grid. Users can watch each algorithm compute a path in real time, making it a useful tool for learning and comparing pathfinding strategies.',
    link: 'https://frincenacion.github.io/pathfinding-algorithm-playground'
  },
  {
    name: 'Movie Gallery API',
    year: '2026',
    tags: ['PHP', 'REST API'],
    type: 'Developer Tool',
    description: 'A REST API for a movie gallery application that provides endpoints for retrieving movie information and links for watching movies and series.',
    link: 'https://github.com/FrinceNacion/movie-gallery-API'
  },
]

const SKILL_CATEGORIES = [
  { category: 'Languages', skills: ['Python', 'Java', 'TypeScript', 'C#', 'PHP'] },
  { category: 'Frontend Development', skills: ['React', 'TypeScript', 'Vite', 'Bootstrap', 'Tailwind'] },
  { category: 'Backend Development', skills: ['FastAPI', 'Node.js'] },
  { category: 'Data Visualization', skills: ['D3.js', 'Power BI', 'Chart.js'] },
  { category: 'Data Science & AI', skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'] },
  { category: 'Tools & IDEs', skills: ['VS Code', 'Git', 'Claude', 'Antigravity', 'Docker', 'Figma'] },

]

const WORK_HISTORY = [
  {
    year: '2026',
    experience: 'UNESCO MIL Hackathon',
    role: 'Game Designer & Developer',
    is_current: true,
    description: 'Collaborated on proposing Beyond The Headline, a web game that teaches users important Digital Literacy concepts and skillss. The project was submitted to the UNESCO MIL Hackathon 2026.',
  },
  {
    year: '2026',
    experience: 'eGovPH Hackathon',
    role: 'Backend Developer',
    is_current: false,
    description: 'Collaborated on proposing E-Agapay, a centralized wallet for goverment use. A natural extension of eGovPH',
  },
  {
    year: '2025',
    experience: 'Mobile Dev Club',
    role: 'Club Leader',
    is_current: false,
    description: 'Led and taught an introduction to basic mobile development using React Native',
  },
  {
    year: '2024',
    experience: 'Academic Project: Alertres',
    role: 'Mobile Developer',
    is_current: false,
    description: 'Designed an application for natural disasters and emergencies for Region III, Philippines',
  },
  {
    year: '2024',
    experience: 'STI Codefest Hackathon - 1st Place',
    role: 'Mobile Developer',
    is_current: false,
    description: 'Designed and submitted another mobile Point of Sale (POS)',
  },
  {
    year: '2023',
    experience: 'STI Codefest Hackathon',
    role: 'Mobile Developer',
    is_current: false,
    description: 'Designed and submitted a mobile Point of Sale (POS)',
  },
]

const NAV_LINKS: { key: PanelKey; label: string }[] = [
  { key: 'work', label: 'Work' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'contact', label: 'Contact' },
]

// ── Panel content components ──────────────────────────────────────────────────

function WorkPanel() {
  const [hovered_project_name, set_hovered_project_name] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {PROJECTS.map((project, index) => (
        <div
          key={project.name}
          onMouseEnter={() => set_hovered_project_name(project.name)}
          onMouseLeave={() => set_hovered_project_name(null)}
          style={{
            padding: '1.25rem 0',
            borderBottom: `1px solid ${PALETTE.shadow}`,
            borderTop: index === 0 ? `1px solid ${PALETTE.shadow}` : 'none',
            transition: 'background 0.2s',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
            <span className='flex flex-row' style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: hovered_project_name === project.name ? PALETTE.ink_deep : PALETTE.ink_primary,
              transition: 'color 0.2s',
            }}>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
              <MoveUpRight style={{ width: 12, height: 12, marginLeft: 4, verticalAlign: 'text-bottom', color: hovered_project_name === project.name ? PALETTE.ink_deep : PALETTE.ink_primary, }} />
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: PALETTE.ink_mid }}>
              {project.year}
            </span>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: PALETTE.ink_mid,
            margin: '0 0 0.625rem',
          }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.56rem',
                color: PALETTE.ink_mid,
                border: `1px solid ${PALETTE.shadow}`,
                padding: '2px 7px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function SkillsPanel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 3rem' }}>
      {SKILL_CATEGORIES.map(({ category, skills }) => (
        <div key={category}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.58rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: PALETTE.ink_mid,
            marginBottom: '0.5rem',
          }}>
            {category}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {skills.map(skill_name => (
              <span key={skill_name} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                color: PALETTE.ink_deep,
                background: `${PALETTE.shadow}55`,
                padding: '2px 8px',
              }}>
                {skill_name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperiencePanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {WORK_HISTORY.map((entry, index) => (
        <div
          key={index}
          style={{
            display: 'grid',
            gridTemplateColumns: '7rem 1fr',
            gap: '1.5rem',
            padding: '1.1rem 0',
            borderBottom: index < WORK_HISTORY.length - 1 ? `1px solid ${PALETTE.shadow}` : 'none',
            borderTop: index === 0 ? `1px solid ${PALETTE.shadow}` : 'none',
          }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.85rem',
            fontWeight: 700,
            color: entry.is_current ? PALETTE.ink_primary : PALETTE.ink_mid,
            lineHeight: 1.4,
            paddingTop: '0.1rem',
          }}>
            {entry.year}
          </span>
          <div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              color: PALETTE.ink_deep,
              marginBottom: '0.15rem',
            }}>
              {entry.experience}
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.62rem',
              color: PALETTE.ink_mid,
              marginBottom: '0.4rem',
            }}>
              {entry.role}
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 300,
              lineHeight: 1.65,
              color: PALETTE.ink_mid,
              margin: 0,
            }}>
              {entry.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

const CONTACT_LINKS = [
  { label: 'Email', display_value: 'louienacion9@gmail.com', href: 'mailto:louienacion9@gmail.com' },
  { label: 'GitHub', display_value: 'github.com/FrinceNacion', href: 'https://github.com/FrinceNacion' },
  { label: 'LinkedIn', display_value: 'linkedin.com/in/frincenacion', href: 'https://www.linkedin.com/in/frincenacion/' },
  //{ label: 'Resume',   display_value: 'nacion.dev/resume.pdf',        href: '/resume.pdf' },
]

function ContactPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          color: PALETTE.ink_deep,
          margin: '0 0 1rem',
        }}>
          Let's<br />
          <em style={{ color: PALETTE.ink_primary }}>connect.</em>
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 300,
          lineHeight: 1.8,
          color: PALETTE.ink_mid,
          maxWidth: '32ch',
          margin: 0,
        }}>
          Available for internships and project-based opportunities.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CONTACT_LINKS.map(({ label, display_value, href }) => (
          <a
            key={label}
            href={href}
            style={{
              display: 'grid',
              gridTemplateColumns: '5rem 1fr',
              alignItems: 'baseline',
              gap: '1.5rem',
              padding: '1rem 0',
              borderTop: `1px solid ${PALETTE.shadow}`,
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={ev => {
              ev.currentTarget.style.borderTopColor = PALETTE.ink_primary
              const value_el = ev.currentTarget.querySelector<HTMLElement>('.contact-value')
              if (value_el) value_el.style.color = PALETTE.ink_primary
            }}
            onMouseLeave={ev => {
              ev.currentTarget.style.borderTopColor = PALETTE.shadow
              const value_el = ev.currentTarget.querySelector<HTMLElement>('.contact-value')
              if (value_el) value_el.style.color = PALETTE.ink_deep
            }}
          >
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: PALETTE.ink_mid,
            }}>
              {label}
            </span>
            <span className="contact-value" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              color: PALETTE.ink_deep,
              transition: 'color 0.2s',
            }}>
              {display_value}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Panel registry ────────────────────────────────────────────────────────────

const PANEL_CONTENT_MAP: Record<PanelKey, React.ReactNode> = {
  work: <WorkPanel />,
  skills: <SkillsPanel />,
  experience: <ExperiencePanel />,
  contact: <ContactPanel />,
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [active_panel, set_active_panel] = useState<PanelKey | null>(null)
  const is_mobile = useMobile()
  const shape_size = useShapeSize()

  function toggle_panel(key: PanelKey) {
    set_active_panel(prev => prev === key ? null : key)
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative', background: PALETTE.cream }}>

      {/* Halftone dither texture overlay — fixed to avoid scroll artifacts */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(circle, ${PALETTE.ink_deep} 0.45px, transparent 0.45px),
          radial-gradient(circle, ${PALETTE.ink_deep} 0.45px, transparent 0.45px)`,
        backgroundSize: '4px 4px, 4px 4px',
        backgroundPosition: '0 0, 2px 2px',
        opacity: 0.12,
      }} />

      {/* 3-D dither icosahedron — spans the full viewport as a background element */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <DitherShape size={shape_size} dot_spacing={7} dot_radius={0.9} />
      </div>

      {/* ── Mobile layout ── */}
      {is_mobile ? (
        <div style={{ position: 'relative', zIndex: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>

          {/* Identity strip */}
          <div style={{
            padding: '2rem 1.5rem 1.5rem',
            background: `${PALETTE.cream}cc`,
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${PALETTE.shadow}`,
            flexShrink: 0,
          }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: PALETTE.ink_mid,
              margin: '0 0 0.5rem',
            }}>
              Software Engineer
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 10vw, 3rem)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: PALETTE.ink_deep,
              margin: 0,
            }}>
              Frince<br />
              <span style={{ color: PALETTE.ink_primary }}>Nacion</span>
            </h1>
          </div>

          {/* Navigation tabs */}
          <div style={{
            display: 'flex',
            flexShrink: 0,
            borderBottom: `1px solid ${PALETTE.shadow}`,
            background: `${PALETTE.cream}cc`,
            backdropFilter: 'blur(8px)',
          }}>
            {NAV_LINKS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggle_panel(key)}
                style={{
                  flex: 1,
                  padding: '0.75rem 0',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: active_panel === key ? PALETTE.ink_primary : PALETTE.ink_mid,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: active_panel === key
                    ? `2px solid ${PALETTE.ink_primary}`
                    : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Active panel content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            background: `${PALETTE.cream}cc`,
          }}>
            {active_panel ? PANEL_CONTENT_MAP[active_panel] : (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 300,
                lineHeight: 1.8,
                color: PALETTE.ink_mid,
                margin: 0,
              }}>
                CS undergrad building algorithm analyzers and visualization tools.
                < br /> Open to internships and project-based opportunities.
              </p>
            )}
          </div>
        </div>

      ) : (

        /* ── Desktop layout ── */
        <div style={{ position: 'relative', zIndex: 2, height: '100vh', display: 'grid', gridTemplateColumns: '42% 58%' }}>

          {/* Left column — identity and navigation */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem 3rem 3rem 4rem',
            background: `${PALETTE.cream}b8`,
            backdropFilter: 'blur(4px)',
            borderRight: `1px solid ${PALETTE.shadow}`,
          }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: PALETTE.ink_mid,
              margin: '0 0 1.25rem',
            }}>
              Software Engineering & Data Science Enthusiast
            </p>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.5rem, 6vw, 6.5rem)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: PALETTE.ink_deep,
              margin: '0 0 1.5rem',
            }}>
              Frince<br />
              <span style={{ color: PALETTE.ink_primary }}>Nacion</span>
            </h1>

            <div style={{ width: 56, height: 2, background: PALETTE.ink_primary, marginBottom: '1.5rem' }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 300,
              lineHeight: 1.8,
              color: PALETTE.ink_mid,
              maxWidth: '26ch',
              margin: '0 0 2.5rem',
            }}>
              CS undergrad building algorithm analyzers and visualization tools. Open to internships and project-based opportunities.
            </p>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggle_panel(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    background: 'transparent',
                    border: 'none',
                    padding: '0.625rem 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  {/* Animated dash grows when this nav item is active */}
                  <span style={{
                    display: 'block',
                    width: active_panel === key ? 28 : 12,
                    height: 1,
                    background: active_panel === key ? PALETTE.ink_primary : PALETTE.shadow,
                    transition: 'width 0.3s, background 0.3s',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: active_panel === key ? PALETTE.ink_primary : PALETTE.ink_mid,
                    transition: 'color 0.2s',
                  }}>
                    {label}
                  </span>
                </button>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.56rem',
                color: PALETTE.shadow,
                letterSpacing: '0.06em',
              }}>
                © 2026 FrinceNacion 🍟 · Philippines, PH
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

            <div style={{
              position: 'absolute',
              inset: 0,
              padding: '3rem 3.5rem',
              overflowY: 'auto',
              background: active_panel ? `${PALETTE.cream}b0` : 'transparent',
              backdropFilter: active_panel ? 'blur(4px)' : 'none',
              opacity: active_panel ? 1 : 0,
              transform: active_panel ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease, background 0.35s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              {active_panel && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.6rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: PALETTE.ink_mid,
                    }}>
                      {active_panel}
                    </span>
                    <div style={{ flex: 1, height: 1, background: PALETTE.shadow }} />
                    <button
                      onClick={() => set_active_panel(null)}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.6rem',
                        color: PALETTE.ink_mid,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        letterSpacing: '0.1em',
                      }}
                    >
                      ✕ close
                    </button>
                  </div>
                  {PANEL_CONTENT_MAP[active_panel]}
                </div>
              )}
            </div>

            {/* Idle hint shown when no panel is selected */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: active_panel ? 0 : 1,
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.62rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: `${PALETTE.ink_primary}`,
              }}>
                select a section ←
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
