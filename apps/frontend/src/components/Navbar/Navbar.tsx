import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gdgLogo from '../../assets/gdg-logo.png'
import { PRIMARY, theme } from '../../theme'

const links = [
    { to: '/challenge', label: 'Daily Challenge' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/profile', label: 'Profile' },
]

interface NavbarProps {
    darkMode: boolean
    setDarkMode: (value: boolean) => void
}

function Navbar({ darkMode, setDarkMode }: NavbarProps) {
    const [open, setOpen] = useState(false)
    const t = theme(darkMode)

    return (
        <header
            className="sticky top-0 z-40 border-b"
            style={{ backgroundColor: t.surface, borderColor: t.border }}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        to="/"
                        className="flex min-w-0 items-center gap-2.5"
                        onClick={() => setOpen(false)}
                    >
                        <img
                            src={gdgLogo}
                            alt="GDG KAU logo"
                            className="h-9 w-9 shrink-0 object-contain"
                        />
                        <span className="min-w-0">
                            <span
                                className="block truncate text-sm font-semibold leading-tight tracking-tight"
                                style={{ fontFamily: "'DM Sans', sans-serif", color: t.textPrimary }}
                            >
                                GDG KAU
                            </span>
                            <span
                                className="hidden text-[11px] leading-tight sm:block"
                                style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}
                            >
                                Challenges
                            </span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className="rounded-[8px] px-4 py-2 text-sm font-medium transition-all duration-150 hover:bg-[#E8F0FE]"
                                style={({ isActive }) => ({
                                    fontFamily: "'DM Sans', sans-serif",
                                    color: isActive ? PRIMARY.base : t.textMuted,
                                    backgroundColor: isActive ? t.primaryTint : 'transparent',
                                })}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={() => setDarkMode(!darkMode)}
                            className="flex h-8 w-8 items-center justify-center rounded-[8px] border transition-all duration-150 hover:bg-[#E8F0FE] active:scale-[0.97]"
                            style={{ borderColor: t.border, color: darkMode ? '#FBBC04' : t.textMuted }}
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={darkMode ? 'Light mode' : 'Dark mode'}
                        >
                            {darkMode ? (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
                                    <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M12.8 10.4A5.6 5.6 0 0 1 5.6 3.2a5.7 5.7 0 1 0 7.2 7.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>

                        <Link
                            to="/login"
                            className="hidden rounded-[10px] px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#2563EB] active:scale-[0.97] md:block"
                            style={{ backgroundColor: PRIMARY.base, fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Login
                        </Link>

                        <button
                            type="button"
                            onClick={() => setOpen((value) => !value)}
                            className="flex h-8 w-8 items-center justify-center rounded-[8px] border md:hidden"
                            style={{ borderColor: t.border, color: t.textMuted }}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                        >
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                                {open ? (
                                    <path d="M4 4l9 9M13 4l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                ) : (
                                    <path d="M2.5 4.5h12M2.5 8.5h12M2.5 12.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {open && (
                    <div className="border-t py-4 md:hidden" style={{ borderColor: t.border }}>
                        <div className="flex flex-col gap-2">
                            {links.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setOpen(false)}
                                    className="rounded-[8px] px-3 py-2 text-sm font-medium transition-colors"
                                    style={({ isActive }) => ({
                                        fontFamily: "'DM Sans', sans-serif",
                                        color: isActive ? PRIMARY.base : t.textMuted,
                                        backgroundColor: isActive ? t.primaryTint : 'transparent',
                                    })}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="mt-2 rounded-[10px] px-4 py-2 text-center text-sm font-semibold text-white"
                                style={{ backgroundColor: PRIMARY.base, fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar
