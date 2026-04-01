import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode, SVGProps } from 'react'
import { motion } from 'framer-motion'
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
    github: 'https://github.com/zaidkhan1002',
    linkedin: 'https://www.linkedin.com/in/zaid-khan',
    instagram: 'https://instagram.com/mohdzaidkh10',
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

    const els = document.querySelectorAll<HTMLElement>('.reveal')
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
    <motion.button
      type="button"
      onClick={() => onChange(mode === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-zinc-800 shadow-sm transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
      aria-label="Toggle light/dark theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {mode === 'dark' ? (
        // Sun icon
        <motion.svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          initial={{ rotate: 0 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2.5M12 18.5V21M4.22 4.22 5.9 5.9M18.1 18.1l1.68 1.68M3 12h2.5M18.5 12H21M4.22 19.78 5.9 18.1M18.1 5.9 19.78 4.22" />
        </motion.svg>
      ) : (
        // Moon icon
        <motion.svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          initial={{ rotate: 0 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M20.5 14.5A7.5 7.5 0 0 1 10 4a6.5 6.5 0 1 0 10.5 10.5Z" />
        </motion.svg>
      )}
    </motion.button>
  )
}

const PROJECTS: Project[] = [
  {
    title: 'Personal Portfolio Website',
    description: 'Built a responsive portfolio website using React, Vite, and Tailwind CSS to showcase projects, skills, and experience with dark/light theme support.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    repo: 'https://github.com/zaidkhan1002/portfolio',
    date: "Current",
    featured: true,
  },
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
    <motion.section
      id={id}
      className="reveal scroll-mt-24 py-12 sm:py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
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
    </motion.section>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.span>
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

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
    <motion.a
      className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-sm text-zinc-900 transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {icon ? <span className="text-zinc-600 dark:text-zinc-300">{icon}</span> : null}
      <span>{label}</span>
    </motion.a>
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
    <motion.div
      className="relative h-12 w-12 overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/35 via-fuchsia-500/15 to-transparent" />
      <div className="relative grid h-full w-full place-items-center text-sm font-semibold tracking-tight">
        {initials}
      </div>
    </motion.div>
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
    <motion.div
      className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
          <motion.div
            className="sm:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="fixed inset-x-0 top-16 z-50 border-b border-black/10 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-zinc-950/95"
            >
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
                      <PillLink
                        href={PROFILE.links.instagram}
                        label="Instagram"
                        icon={<IconInstagram className="h-4 w-4" />}
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
          </motion.div>
        ) : null}

        <motion.section
          className="relative overflow-hidden py-14 sm:py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Container>
            <div className="grid items-center gap-10 sm:grid-cols-2">
              <motion.div
                className="reveal"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {PROFILE.location} • {PROFILE.role}
                </p>
                <motion.h1
                  className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Full‑stack developer building scalable products with premium UX.
                </motion.h1>
                <motion.p
                  className="mt-4 max-w-xl text-base leading-relaxed text-zinc-700 dark:text-zinc-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {PROFILE.bio}
                </motion.p>
                <motion.div
                  className="mt-6 flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
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
                  <PillLink
                    href={PROFILE.links.instagram}
                    label="Instagram"
                    icon={<IconInstagram className="h-4 w-4" />}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="reveal relative rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10" />
                <div className="relative">
                  <p className="text-sm text-zinc-300">Quick snapshot</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <motion.div
                      className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 transition hover:bg-zinc-950/40"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-xs text-zinc-400">Focus</p>
                      <p className="mt-1 text-sm">MERN + ML/NLP</p>
                    </motion.div>
                    <motion.div
                      className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 transition hover:bg-zinc-950/40"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-xs text-zinc-400">Strength</p>
                      <p className="mt-1 text-sm">APIs + UI</p>
                    </motion.div>
                    <motion.div
                      className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 transition hover:bg-zinc-950/40"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-xs text-zinc-400">Stack</p>
                      <p className="mt-1 text-sm">React / Node</p>
                    </motion.div>
                    <motion.div
                      className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 transition hover:bg-zinc-950/40"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-xs text-zinc-400">Mobile</p>
                      <p className="mt-1 text-sm">{PROFILE.phone}</p>
                    </motion.div>
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
              </motion.div>
            </div>
          </Container>
        </motion.section>

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
                  prototypes. I enjoy the challenge of turning complex problems
                  into elegant solutions.
                </p>
                <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-200">
                  When I'm not coding, you'll find me exploring new technologies,
                  contributing to open-source projects, or sharing my knowledge
                  with the developer community.
                </p>
              </div>
              <div className="space-y-4">
                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Interests</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    Machine Learning, Web Development, Open Source, UI/UX Design
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Location</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {PROFILE.location}
                  </p>
                </motion.div>
              </div>
            </div>
          </Section>

          <Section
            id="projects"
            title="Featured Projects"
            subtitle="A selection of projects that showcase my skills and passion for development."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {PROJECTS.filter(p => p.featured).map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group relative rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5" />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {project.title}
                      </h3>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {project.date}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-3">
                      {project.repo && (
                        <PillLink
                          href={project.repo}
                          label="View Code"
                          icon={
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                              <path d="M12 .5C5.73.5.75 5.48.75 11.74c0 4.86 3.16 8.97 7.55 10.42.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.07.67-3.72-1.18-3.72-1.18-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.56 1.19 3.19.91.1-.71.38-1.19.69-1.46-2.45-.28-5.03-1.23-5.03-5.48 0-1.21.43-2.2 1.13-2.98-.11-.28-.49-1.41.11-2.95 0 0 .92-.3 3.02 1.14a10.4 10.4 0 0 1 2.75-.37c.93 0 1.87.13 2.75.37 2.1-1.44 3.02-1.14 3.02-1.14.6 1.54.22 2.67.11 2.95.7.78 1.13 1.77 1.13 2.98 0 4.26-2.59 5.19-5.05 5.47.39.34.74 1.02.74 2.06 0 1.49-.01 2.69-.01 3.06 0 .29.2.64.76.53 4.38-1.46 7.54-5.56 7.54-10.42C23.25 5.48 18.27.5 12 .5Z" />
                            </svg>
                          }
                        />
                      )}
                      {project.href && (
                        <PillLink
                          href={project.href}
                          label="Live Demo"
                          icon={
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1l4-4v3.5l4-4v11l-4-4V13z" />
                            </svg>
                          }
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section
            id="skills"
            title="Skills & Technologies"
            subtitle="Tools and technologies I work with to bring ideas to life."
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Languages</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SKILLS.languages.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Frameworks</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SKILLS.frameworks.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Tools</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SKILLS.tools.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Soft Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SKILLS.soft.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </Section>

          <Section
            id="training"
            title="Training & Certifications"
            subtitle="Professional development and specialized training programs."
          >
            <div className="space-y-6">
              {TRAINING.map((training, index) => (
                <motion.div
                  key={training.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {training.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                        {training.org} • {training.date}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {training.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section
            id="certifications"
            title="Credentials & Achievements"
            subtitle="Certifications and notable achievements in my development journey."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {CERTIFICATES.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {cert.org} • {cert.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section
            id="education"
            title="Education"
            subtitle="Academic background and qualifications."
          >
            <div className="space-y-6">
              {EDUCATION.map((edu, index) => (
                <motion.div
                  key={edu.school}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {edu.program}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                        {edu.school} • {edu.location}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {edu.date} • {edu.note}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section
            id="contact"
            title="Get In Touch"
            subtitle="Let's connect and build something amazing together."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-zinc-700 dark:text-zinc-200">
                  I'm always interested in new opportunities and collaborations.
                  Whether you have a project in mind, want to discuss technology,
                  or just want to connect, feel free to reach out!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                      <IconMail className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">Email</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">{PROFILE.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                      <IconPhone className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">Phone</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">{PROFILE.phone}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-4">Connect with me</h3>
                <div className="grid gap-3">
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
                  <PillLink
                    href={PROFILE.links.instagram}
                    label="Instagram"
                    icon={<IconInstagram className="h-4 w-4" />}
                  />
                  <PillLink
                    href={`mailto:${PROFILE.email}`}
                    label="Send Email"
                    icon={<IconMail className="h-4 w-4" />}
                  />
                </div>
              </motion.div>
            </div>
          </Section>
        </Container>
      </main>
    </motion.div>
  )
}
