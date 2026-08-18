import { useState, useEffect } from 'react'
import DitherShape from './DitherShape'
import { MoveUpRight, Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

interface Palette {
  cream: string
  ink_light: string
  ink_mid: string
  ink_primary: string
  ink_deep: string
  shadow: string
  dither_rgb: [number, number, number]
  overlay_dot: string
  overlay_opacity: number
  glass_strip: string
  glass_nav: string
  glass_panel: string
  glass_desktop: string
  glass_active: string
  chip_bg: string
  tag_border: string
  toggle_bg: string
  toggle_border: string
  toggle_icon: string
}

const THEMES: Record<Theme, Palette> = {
  light: {
    cream: '#F7F4EC',
    ink_light: '#C7D4E8',
    ink_mid: '#5E7FA3',
    ink_primary: '#2A4D7A',
    ink_deep: '#16283F',
    shadow: '#DCD5C4',
    dither_rgb: [22, 40, 63],
    overlay_dot: '#16283F',
    overlay_opacity: 0.12,
    glass_strip: '#F7F4ECcc',
    glass_nav: '#F7F4ECcc',
    glass_panel: '#F7F4ECcc',
    glass_desktop: '#F7F4ECb8',
    glass_active: '#F7F4ECb0',
    chip_bg: '#DCD5C455',
    tag_border: '#DCD5C4',
    toggle_bg: '#EAE5D9',
    toggle_border: '#DCD5C4',
    toggle_icon: '#16283F',
  },
  dark: {
    cream: '#12161F',
    ink_light: '#233044',
    ink_mid: '#8FA4BF',
    ink_primary: '#4F86C6',
    ink_deep: '#E6EDF6',
    shadow: '#243042',
    dither_rgb: [120, 155, 200],
    overlay_dot: '#C7D4E8',
    overlay_opacity: 0.08,
    glass_strip: '#12161Fcc',
    glass_nav: '#12161Fcc',
    glass_panel: '#12161Fcc',
    glass_desktop: '#12161Fb8',
    glass_active: '#12161Fb0',
    chip_bg: '#24304277',
    tag_border: '#243042',
    toggle_bg: '#1C2433',
    toggle_border: '#2A374C',
    toggle_icon: '#F1F5F9',
  },
}

function useTheme(): [Theme, () => void] {
  const [theme, set_theme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle_theme = () => set_theme(prev => (prev === 'light' ? 'dark' : 'light'))

  return [theme, toggle_theme]
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
    tags: ['Python', 'JavaScript', 'React', 'Bootstrap', 'ML'],
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

// ── Theme Toggle Button ────────────────────────────────────────────────────────

function ThemeToggle({ theme, onToggle, palette }: { theme: Theme; onToggle: () => void; palette: Palette }) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.4rem 0.8rem',
        background: palette.toggle_bg,
        border: `1px solid ${palette.toggle_border}`,
        borderRadius: '9999px',
        color: palette.toggle_icon,
        cursor: 'pointer',
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.62rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition: 'all 0.3s ease',
        boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = palette.ink_primary
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = palette.toggle_border
      }}
    >
      {theme === 'light' ? (
        <>
          <Moon style={{ width: 13, height: 13 }} />
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun style={{ width: 13, height: 13 }} />
          <span>Light</span>
        </>
      )}
    </button>
  )
}

// ── Panel content components ──────────────────────────────────────────────────

function WorkPanel({ palette }: { palette: Palette }) {
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
            borderBottom: `1px solid ${palette.shadow}`,
            borderTop: index === 0 ? `1px solid ${palette.shadow}` : 'none',
            transition: 'border-color 0.3s ease, background 0.2s',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
            <span className='flex flex-row' style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: hovered_project_name === project.name ? palette.ink_primary : palette.ink_deep,
              transition: 'color 0.2s',
            }}>
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {project.name}
              </a>
              <MoveUpRight style={{ width: 12, height: 12, marginLeft: 4, verticalAlign: 'text-bottom', color: hovered_project_name === project.name ? palette.ink_primary : palette.ink_deep, transition: 'color 0.2s' }} />
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: palette.ink_mid, transition: 'color 0.3s' }}>
              {project.year}
            </span>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: palette.ink_mid,
            margin: '0 0 0.625rem',
            transition: 'color 0.3s',
          }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.56rem',
                color: palette.ink_mid,
                border: `1px solid ${palette.tag_border}`,
                padding: '2px 7px',
                transition: 'border-color 0.3s, color 0.3s',
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

function SkillsPanel({ palette }: { palette: Palette }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 3rem' }}>
      {SKILL_CATEGORIES.map(({ category, skills }) => (
        <div key={category}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.58rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: palette.ink_mid,
            marginBottom: '0.5rem',
            transition: 'color 0.3s',
          }}>
            {category}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {skills.map(skill_name => (
              <span key={skill_name} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                color: palette.ink_deep,
                background: palette.chip_bg,
                padding: '2px 8px',
                transition: 'background 0.3s, color 0.3s',
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

function ExperiencePanel({ palette }: { palette: Palette }) {
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
            borderBottom: index < WORK_HISTORY.length - 1 ? `1px solid ${palette.shadow}` : 'none',
            borderTop: index === 0 ? `1px solid ${palette.shadow}` : 'none',
            transition: 'border-color 0.3s',
          }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.85rem',
            fontWeight: 700,
            color: entry.is_current ? palette.ink_primary : palette.ink_mid,
            lineHeight: 1.4,
            paddingTop: '0.1rem',
            transition: 'color 0.3s',
          }}>
            {entry.year}
          </span>
          <div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              color: palette.ink_deep,
              marginBottom: '0.15rem',
              transition: 'color 0.3s',
            }}>
              {entry.experience}
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.62rem',
              color: palette.ink_mid,
              marginBottom: '0.4rem',
              transition: 'color 0.3s',
            }}>
              {entry.role}
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 300,
              lineHeight: 1.65,
              color: palette.ink_mid,
              margin: 0,
              transition: 'color 0.3s',
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
]

function ContactPanel({ palette }: { palette: Palette }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          color: palette.ink_deep,
          margin: '0 0 1rem',
          transition: 'color 0.3s',
        }}>
          Let's<br />
          <em style={{ color: palette.ink_primary, fontStyle: 'italic', transition: 'color 0.3s' }}>connect.</em>
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 300,
          lineHeight: 1.8,
          color: palette.ink_mid,
          maxWidth: '32ch',
          margin: 0,
          transition: 'color 0.3s',
        }}>
          Available for internships and project-based opportunities.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CONTACT_LINKS.map(({ label, display_value, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'grid',
              gridTemplateColumns: '5rem 1fr',
              alignItems: 'baseline',
              gap: '1.5rem',
              padding: '1rem 0',
              borderTop: `1px solid ${palette.shadow}`,
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={ev => {
              ev.currentTarget.style.borderTopColor = palette.ink_primary
              const value_el = ev.currentTarget.querySelector<HTMLElement>('.contact-value')
              if (value_el) value_el.style.color = palette.ink_primary
            }}
            onMouseLeave={ev => {
              ev.currentTarget.style.borderTopColor = palette.shadow
              const value_el = ev.currentTarget.querySelector<HTMLElement>('.contact-value')
              if (value_el) value_el.style.color = palette.ink_deep
            }}
          >
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: palette.ink_mid,
              transition: 'color 0.3s',
            }}>
              {label}
            </span>
            <span className="contact-value" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              color: palette.ink_deep,
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

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [active_panel, set_active_panel] = useState<PanelKey | null>(null)
  const [theme, toggle_theme] = useTheme()
  const palette = THEMES[theme]
  const is_mobile = useMobile()
  const shape_size = useShapeSize()

  function toggle_panel(key: PanelKey) {
    set_active_panel(prev => prev === key ? null : key)
  }

  const renderPanel = () => {
    if (!active_panel) return null
    switch (active_panel) {
      case 'work': return <WorkPanel palette={palette} />
      case 'skills': return <SkillsPanel palette={palette} />
      case 'experience': return <ExperiencePanel palette={palette} />
      case 'contact': return <ContactPanel palette={palette} />
    }
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      background: palette.cream,
      transition: 'background 0.35s ease',
    }}>

      {/* Halftone dither texture overlay — fixed to avoid scroll artifacts */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(circle, ${palette.overlay_dot} 0.45px, transparent 0.45px),
          radial-gradient(circle, ${palette.overlay_dot} 0.45px, transparent 0.45px)`,
        backgroundSize: '4px 4px, 4px 4px',
        backgroundPosition: '0 0, 2px 2px',
        opacity: palette.overlay_opacity,
        transition: 'opacity 0.35s ease',
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
        <DitherShape size={shape_size} dot_spacing={7} dot_radius={0.9} ink_color={palette.dither_rgb} />
      </div>

      {/* ── Mobile layout ── */}
      {is_mobile ? (
        <div style={{ position: 'relative', zIndex: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>

          {/* Identity strip */}
          <div style={{
            padding: '1.5rem 1.5rem 1.25rem',
            background: palette.glass_strip,
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${palette.shadow}`,
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            transition: 'background 0.35s, border-color 0.35s',
          }}>
            <div>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: palette.ink_mid,
                margin: '0 0 0.4rem',
                transition: 'color 0.35s',
              }}>
                Software Engineer
              </p>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 9vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                color: palette.ink_deep,
                margin: 0,
                transition: 'color 0.35s',
              }}>
                Frince<br />
                <span style={{ color: palette.ink_primary, transition: 'color 0.35s' }}>Nacion</span>
              </h1>
            </div>

            <ThemeToggle theme={theme} onToggle={toggle_theme} palette={palette} />
          </div>

          {/* Navigation tabs */}
          <div style={{
            display: 'flex',
            flexShrink: 0,
            borderBottom: `1px solid ${palette.shadow}`,
            background: palette.glass_nav,
            backdropFilter: 'blur(8px)',
            transition: 'background 0.35s, border-color 0.35s',
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
                  color: active_panel === key ? palette.ink_primary : palette.ink_mid,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: active_panel === key
                    ? `2px solid ${palette.ink_primary}`
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
            background: palette.glass_panel,
            transition: 'background 0.35s',
          }}>
            {active_panel ? renderPanel() : (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 300,
                lineHeight: 1.8,
                color: palette.ink_mid,
                margin: 0,
                transition: 'color 0.35s',
              }}>
                CS undergrad building algorithm analyzers and visualization tools.
                <br /> Open to internships and project-based opportunities.
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
            background: palette.glass_desktop,
            backdropFilter: 'blur(4px)',
            borderRight: `1px solid ${palette.shadow}`,
            transition: 'background 0.35s, border-color 0.35s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 1.25rem' }}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: palette.ink_mid,
                margin: 0,
                transition: 'color 0.35s',
              }}>
                Software Engineering & Data Science Enthusiast
              </p>

              <ThemeToggle theme={theme} onToggle={toggle_theme} palette={palette} />
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3.5rem, 6vw, 6.5rem)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: palette.ink_deep,
              margin: '0 0 1.5rem',
              transition: 'color 0.35s',
            }}>
              Frince<br />
              <span style={{ color: palette.ink_primary, transition: 'color 0.35s' }}>Nacion</span>
            </h1>

            <div style={{ width: 56, height: 2, background: palette.ink_primary, marginBottom: '1.5rem', transition: 'background 0.35s' }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 300,
              lineHeight: 1.8,
              color: palette.ink_mid,
              maxWidth: '26ch',
              margin: '0 0 2.5rem',
              transition: 'color 0.35s',
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
                    background: active_panel === key ? palette.ink_primary : palette.shadow,
                    transition: 'width 0.3s, background 0.3s',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: active_panel === key ? palette.ink_primary : palette.ink_mid,
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
                color: palette.ink_mid,
                letterSpacing: '0.06em',
                transition: 'color 0.35s',
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
              background: active_panel ? palette.glass_active : 'transparent',
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
                      color: palette.ink_mid,
                      transition: 'color 0.35s',
                    }}>
                      {active_panel}
                    </span>
                    <div style={{ flex: 1, height: 1, background: palette.shadow, transition: 'background 0.35s' }} />
                    <button
                      onClick={() => set_active_panel(null)}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.6rem',
                        color: palette.ink_mid,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        letterSpacing: '0.1em',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = palette.ink_primary}
                      onMouseLeave={e => e.currentTarget.style.color = palette.ink_mid}
                    >
                      ✕ close
                    </button>
                  </div>
                  {renderPanel()}
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
                color: palette.ink_primary,
                transition: 'color 0.35s',
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
