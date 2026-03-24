import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode, SVGProps } from 'react'
import {
  applyThemeClass,
  getStoredTheme,
  resolveTheme,
  storeTheme,
  type ThemeMode,
} from './theme'

type Project = {
  title: string
  description: string
  tech: string[]
  href?: string
  repo?: string
  date?: string
  featured?: boolean
}

type LinkItem = { label: string; href: string }

const PROFILE = {
  name: 'Mohd Zaid Khan',
  role: 'B.Tech CSE Student • Full-Stack (MERN) • ML/NLP',
  location: 'Phagwara, Punjab (India)',
  bio: `Full‑stack Developer (MERN) with hands‑on ML/NLP experience. I build reliable REST APIs, clean UI, and end‑to‑end features—from database design to deployment-ready frontends.`,
  email: 'mohdzaidkh@gmail.com',
  phone: '+91-8299558862',
  resumeHref: '', // add a PDF link (Drive/Dropbox/GitHub) when ready
  links: {
    github: 'https://github.com/Zaid-khan',
    linkedin: 'https://www.linkedin.com/in/zaid-khan',
  },
}

function useRevealOnScroll() {
  useEffect(() => {
    const reduce =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduce) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            ; (e.target as HTMLElement).classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function ThemeToggle({
  mode,
  onChange,
}: {
  mode: ThemeMode
  onChange: (m: ThemeMode) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(mode === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-zinc-800 shadow-sm transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
      aria-label="Toggle light/dark theme"
    >
      {mode === 'dark' ? (
        // Sun icon
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2.5M12 18.5V21M4.22 4.22 5.9 5.9M18.1 18.1l1.68 1.68M3 12h2.5M18.5 12H21M4.22 19.78 5.9 18.1M18.1 5.9 19.78 4.22" />
        </svg>
      ) : (
        // Moon icon
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M20.5 14.5A7.5 7.5 0 0 1 10 4a6.5 6.5 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  )
}

const PROJECTS: Project[] = [
  {
    title: 'Fake News Detection System',
    description:
      'Engineered an ML app to classify news as genuine vs misleading using NLP; built a streamlined pipeline and evaluated via precision/recall/F1 and confusion matrix.',
    tech: ['Python', 'Scikit-learn', 'NLP'],
    date: "Jul '25",
    featured: true,
  },
  {
    title: 'Tourist Guide Platform',
    description:
      'Built a MERN platform with routing, middleware, and REST APIs; designed MongoDB schemas, integrated real-time availability and reservation flows, and implemented reusable React components.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    date: "Dec '25",
    featured: true,
  },
  {
    title: 'ChaloSeekhein — Rural Education Enhancement System',
    description:
      'Designed an educational portal with role-based access and secure auth; implemented academic modules (assignments, quizzes, attendance) and improved UX with AJAX for smoother data sync.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    date: "Apr '25",
  },
]

const SKILLS = {
  languages: ['C++', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript'],
  frameworks: ['React.js', 'Node.js', 'Express.js', 'Django', 'Laravel'],
  tools: ['Git', 'GitHub', 'MySQL', 'MongoDB', 'Postman', 'VS Code', 'Oracle'],
  soft: ['Problem-solving', 'Team player', 'Multi-tasker', 'Critical thinker'],
}

const TRAINING = [
  {
    title: 'AI & ML for Real‑World Problem Solving',
    org: 'Lovely Professional University',
    date: "Jun '25 – Jul '25",
    points: [
      'Built a Fake News Detection System using supervised ML models.',
      'Performed data cleaning/preprocessing and feature engineering.',
      'Designed ML pipelines with Python, Pandas, NumPy, and Scikit‑learn.',
      'Evaluated model performance using accuracy, precision, recall, and F1‑score.',
    ],
  },
]

const CERTIFICATIONS = [
  { title: 'Cloud Computing', org: 'NPTEL', date: "Apr '25" },
]

const CERTIFICATES = [
  {
    title: 'AI & ML for Real‑World Problem Solving',
    org: 'Lovely Professional University',
    date: "Jul '25",
  },
  { title: 'ByteBash Coding Hackathon', org: '', date: "Oct '23" },
]

const EDUCATION = [
  {
    school: 'Lovely Professional University',
    program: 'B.Tech — Computer Science and Engineering',
    location: 'Phagwara, Punjab',
    date: "Aug '23 – Present",
    note: 'CGPA: 6.7',
  },
  {
    school: 'Surmount International School',
    program: 'Intermediate',
    location: 'Gorakhpur, U.P',
    date: "Mar '21 – May '22",
    note: 'Percentage: 67%',
  },
  {
    school: 'Surmount International School',
    program: 'Matriculation',
    location: 'Gorakhpur, U.P',
    date: "Mar '19 – May '20",
    note: 'Percentage: 60%',
  },
]

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="reveal scroll-mt-24 py-12 sm:py-16">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
      {children}
    </span>
  )
}

function IconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.74c0 4.86 3.16 8.97 7.55 10.42.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.07.67-3.72-1.18-3.72-1.18-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.56 1.19 3.19.91.1-.71.38-1.19.69-1.46-2.45-.28-5.03-1.23-5.03-5.48 0-1.21.43-2.2 1.13-2.98-.11-.28-.49-1.41.11-2.95 0 0 .92-.3 3.02 1.14a10.4 10.4 0 0 1 2.75-.37c.93 0 1.87.13 2.75.37 2.1-1.44 3.02-1.14 3.02-1.14.6 1.54.22 2.67.11 2.95.7.78 1.13 1.77 1.13 2.98 0 4.26-2.59 5.19-5.05 5.47.39.34.74 1.02.74 2.06 0 1.49-.01 2.69-.01 3.06 0 .29.2.64.76.53 4.38-1.46 7.54-5.56 7.54-10.42C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  )
}

function IconLinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.62-1.86 3.34-1.86 3.57 0 4.23 2.35 4.23 5.41v6.34ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-7.4 4.62a2 2 0 0 1-2.12 0L4 8.24V6l7.4 4.62a.5.5 0 0 0 .52 0L20 6v2.24Z" />
    </svg>
  )
}

function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.2 2.47.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z" />
    </svg>
  )
}

function PillLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon?: ReactNode
}) {
  return (
    <a
      className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-sm text-zinc-900 transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
    >
      {icon ? <span className="text-zinc-600 dark:text-zinc-300">{icon}</span> : null}
      <span>{label}</span>
    </a>
  )
}

function Monogram() {
  const initials = PROFILE.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')
  return (
    <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/35 via-fuchsia-500/15 to-transparent" />
      <div className="relative grid h-full w-full place-items-center text-sm font-semibold tracking-tight">
        {initials}
      </div>
    </div>
  )
}

export default function App() {
  const NAV: LinkItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Training', href: '#training' },
    { label: 'Credentials', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ]

  const [menuOpen, setMenuOpen] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    () => getStoredTheme() ?? 'system'
  )

  const resolvedTheme = useMemo(() => resolveTheme(themeMode), [themeMode])

  useEffect(() => {
    applyThemeClass(resolvedTheme)
    storeTheme(themeMode)
    document.documentElement.classList.add('theme-transition')
    const t = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 260)
    return () => window.clearTimeout(t)
  }, [resolvedTheme, themeMode])

  useEffect(() => {
    if (themeMode !== 'system') return
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return
    const onChange = () => applyThemeClass(resolveTheme('system'))
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [themeMode])

  useRevealOnScroll()

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const scrollSliderBy = (dir: -1 | 1) => {
    const el = sliderRef.current
    if (!el) return
    const amount = Math.max(260, Math.floor(el.clientWidth * 0.9))
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.08] dark:opacity-[0.08]" />
        <div className="absolute inset-0 bg-noise opacity-[0.10] mix-blend-overlay dark:opacity-[0.12]" />
        <div className="absolute -top-48 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/15" />
        <div className="absolute -bottom-48 left-1/3 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-3xl dark:bg-fuchsia-500/10" />
      </div>

      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-zinc-950/65 dark:supports-[backdrop-filter]:bg-zinc-950/55">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-3 font-semibold tracking-tight"
            >
              <Monogram />
              <span className="hidden sm:inline">{PROFILE.name}</span>
            </a>
            <nav className="hidden items-center gap-5 text-sm text-zinc-600 dark:text-zinc-300 sm:flex">
              {NAV.slice(0, 5).map((l) => (
                <a
                  key={l.href}
                  className="hover:text-zinc-950 dark:hover:text-white"
                  href={l.href}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 sm:flex">
                <ThemeToggle mode={themeMode} onChange={setThemeMode} />
                <PillLink
                  href={`mailto:${PROFILE.email}`}
                  label="Email"
                  icon={<IconMail className="h-4 w-4" />}
                />
                {PROFILE.resumeHref ? (
                  <a
                    className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
                    href={PROFILE.resumeHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resume
                  </a>
                ) : null}
              </div>
              <button
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/5 p-2 text-zinc-900 transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10 sm:hidden"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <main id="top">
        {menuOpen ? (
          <div className="sm:hidden">
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setMenuOpen(false)}
            />
            <div className="fixed inset-x-0 top-16 z-50 border-b border-black/10 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-zinc-950/95">
              <Container>
                <div className="py-4">
                  <div className="grid gap-2">
                    {NAV.map((l) => (
                      <a
                        key={l.href}
                        className="rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-zinc-900 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {l.label}
                      </a>
                    ))}
                    <div className="mt-2 grid gap-2">
                      <div className="rounded-xl border border-black/10 bg-black/5 p-2 dark:border-white/10 dark:bg-white/5">
                        <ThemeToggle mode={themeMode} onChange={setThemeMode} />
                      </div>
                      <PillLink
                        href={`mailto:${PROFILE.email}`}
                        label="Email"
                        icon={<IconMail className="h-4 w-4" />}
                      />
                      <PillLink
                        href={PROFILE.links.github}
                        label="GitHub"
                        icon={<IconGithub className="h-4 w-4" />}
                      />
                      <PillLink
                        href={PROFILE.links.linkedin}
                        label="LinkedIn"
                        icon={<IconLinkedIn className="h-4 w-4" />}
                      />
                      {PROFILE.resumeHref ? (
                        <a
                          className="rounded-xl bg-indigo-500 px-4 py-3 text-center text-sm font-medium text-white hover:bg-indigo-400"
                          href={PROFILE.resumeHref}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Resume
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        ) : null}

        <section className="relative overflow-hidden py-14 sm:py-20">
          <Container>
            <div className="grid items-center gap-10 sm:grid-cols-2">
              <div className="reveal">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {PROFILE.location} • {PROFILE.role}
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                  Full‑stack developer building scalable products with premium UX.
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-700 dark:text-zinc-200">
                  {PROFILE.bio}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
                    href="#projects"
                  >
                    View projects
                    <span className="transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
                    href="#contact"
                  >
                    Contact
                  </a>
                  <PillLink
                    href={PROFILE.links.github}
                    label="GitHub"
                    icon={<IconGithub className="h-4 w-4" />}
                  />
                  <PillLink
                    href={PROFILE.links.linkedin}
                    label="LinkedIn"
                    icon={<IconLinkedIn className="h-4 w-4" />}
                  />
                </div>
              </div>

              <div className="reveal relative rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10" />
                <div className="relative">
                  <p className="text-sm text-zinc-300">Quick snapshot</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 transition hover:bg-zinc-950/40">
                      <p className="text-xs text-zinc-400">Focus</p>
                      <p className="mt-1 text-sm">MERN + ML/NLP</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 transition hover:bg-zinc-950/40">
                      <p className="text-xs text-zinc-400">Strength</p>
                      <p className="mt-1 text-sm">APIs + UI</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 transition hover:bg-zinc-950/40">
                      <p className="text-xs text-zinc-400">Stack</p>
                      <p className="mt-1 text-sm">React / Node</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 transition hover:bg-zinc-950/40">
                      <p className="text-xs text-zinc-400">Mobile</p>
                      <p className="mt-1 text-sm">{PROFILE.phone}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <IconMail className="h-4 w-4 text-zinc-400" />
                      <span>{PROFILE.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <IconPhone className="h-4 w-4 text-zinc-400" />
                      <span>{PROFILE.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Container>
          <Section
            id="about"
            title="About"
            subtitle="Building production-ready full‑stack features and ML/NLP prototypes."
          >
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <p className="leading-relaxed text-zinc-700 dark:text-zinc-200">
                  I’m a Computer Science student focused on full‑stack
                  development (MERN) and applied machine learning. I like taking
                  ideas from concept to shipping—designing schemas, building
                  APIs, and crafting UI that feels fast and polished.
                </p>
                <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-200">
                  Recently I’ve been working on structured backend services,
                  improving component reusability in React, and building ML/NLP
                  pipelines with strong evaluation metrics.
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-medium">Now</p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                  <li>Building MERN projects</li>
                  <li>Practicing ML/NLP pipelines</li>
                  <li>Improving DSA + problem-solving</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section
            id="projects"
            title="Projects"
            subtitle="A few strongest projects. Add links, outcomes, and what you learned."
          >
            <div className="reveal">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Selected work (swipe/scroll)
                </p>
                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    className="rounded-xl border border-black/10 bg-black/5 p-2 text-zinc-900 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    onClick={() => scrollSliderBy(-1)}
                    aria-label="Previous"
                  >
                    ←
                  </button>
                  <button
                    className="rounded-xl border border-black/10 bg-black/5 p-2 text-zinc-900 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    onClick={() => scrollSliderBy(1)}
                    aria-label="Next"
                  >
                    →
                  </button>
                </div>
              </div>

              <div
                ref={sliderRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {PROJECTS.map((p) => (
                  <article
                    key={p.title}
                    className="group relative w-[86%] shrink-0 snap-start overflow-hidden border border-black/10 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.07] sm:w-[420px]"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <div className="absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
                    </div>
                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold tracking-tight">
                          {p.title}
                        </h3>
                        {p.date ? (
                          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            {p.date}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        {p.href ? (
                          <a
                            className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live
                          </a>
                        ) : null}
                        {p.repo ? (
                          <a
                            className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Code
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <p className="relative mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                      {p.description}
                    </p>
                    <div className="relative mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="skills"
            title="Skills"
            subtitle="A snapshot of languages, frameworks, tools, and strengths."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:bg-white/[0.07]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                </div>
                <p className="relative text-sm font-medium">Languages</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SKILLS.languages.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:bg-white/[0.07]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
                </div>
                <p className="relative text-sm font-medium">
                  Frameworks / Technologies
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SKILLS.frameworks.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:bg-white/[0.07]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                </div>
                <p className="relative text-sm font-medium">Tools / Platforms</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SKILLS.tools.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:bg-white/[0.07]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
                </div>
                <p className="relative text-sm font-medium">Soft skills</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SKILLS.soft.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section
            id="training"
            title="Training"
            subtitle="Hands-on programs and applied learning."
          >
            <div className="grid gap-4">
              {TRAINING.map((t) => (
                <div
                  key={t.title}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                >
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-white/10" />
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold">{t.title}</p>
                    <p className="text-xs text-zinc-400">{t.date}</p>
                  </div>
                  <p className="mt-1 text-sm text-zinc-300">{t.org}</p>
                  <ul className="mt-4 space-y-2 pl-10 text-sm text-zinc-200">
                    {t.points.map((p) => (
                      <li key={p} className="relative">
                        <span className="absolute -left-6 top-2 h-2 w-2 rounded-full bg-indigo-400/70" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="certifications"
            title="Certifications"
            subtitle="Certifications and achievements."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <p className="text-sm font-medium">Certifications</p>
                <ul className="mt-4 divide-y divide-white/10 text-sm text-zinc-200">
                  {CERTIFICATIONS.map((c) => (
                    <li
                      key={c.title}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span>
                        {c.title}
                        {c.org ? (
                          <span className="text-zinc-400"> • {c.org}</span>
                        ) : null}
                      </span>
                      <span className="text-xs text-zinc-400">{c.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <p className="text-sm font-medium">Certificates</p>
                <ul className="mt-4 divide-y divide-white/10 text-sm text-zinc-200">
                  {CERTIFICATES.map((c) => (
                    <li
                      key={`${c.title}-${c.date}`}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span>
                        {c.title}
                        {c.org ? (
                          <span className="text-zinc-400"> • {c.org}</span>
                        ) : null}
                      </span>
                      <span className="text-xs text-zinc-400">{c.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section
            id="education"
            title="Education"
            subtitle="Academic background."
          >
            <div className="grid gap-4">
              {EDUCATION.map((e) => (
                <div
                  key={`${e.school}-${e.program}-${e.date}`}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:bg-white/[0.07]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold">{e.school}</p>
                    <p className="text-xs text-zinc-400">{e.date}</p>
                  </div>
                  <p className="mt-1 text-sm text-zinc-200">{e.program}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-300">
                    <span>{e.location}</span>
                    <span className="text-zinc-500">•</span>
                    <span>{e.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="contact"
            title="Contact"
            subtitle="Make it easy for people to reach you."
          >
            <div className="reveal border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Email
                  </p>
                  <p className="mt-1 text-base">{PROFILE.email}</p>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    Mobile
                  </p>
                  <p className="mt-1 text-base">{PROFILE.phone}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
                    href={`mailto:${PROFILE.email}`}
                  >
                    Send email
                  </a>
                  <PillLink
                    href={PROFILE.links.github}
                    label="GitHub"
                    icon={<IconGithub className="h-4 w-4" />}
                  />
                  <PillLink
                    href={PROFILE.links.linkedin}
                    label="LinkedIn"
                    icon={<IconLinkedIn className="h-4 w-4" />}
                  />
                </div>
              </div>
            </div>
          </Section>

          <footer className="border-t border-white/10 py-10">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} {PROFILE.name}. Built with React +
              Tailwind.
            </p>
          </footer>
        </Container>
      </main>
    </div>
  )
}
