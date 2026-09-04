import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
    { to: '/challenge', label: 'Daily Challenge' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/profile', label: 'Profile' },
]

function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-card">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-foreground"
                        onClick={() => setOpen(false)}
                    >
                        GDG Challenges
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 md:flex">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-secondary text-secondary-foreground'
                                        : 'text-muted-foreground hover:text-primary'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Login + Mobile Button */}
                    <div className="flex items-center gap-3">

                        {/* Login Desktop */}
                        <Link
                            to="/login"
                            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 md:block"
                        >
                            Login
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setOpen((value) => !value)}
                            className="rounded-md border border-border p-2 md:hidden"
                            aria-label="Open menu"
                            aria-expanded={open}
                        >
                            ☰
                        </button>

                    </div>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="border-t border-border py-4 md:hidden">
                        <div className="flex flex-col gap-2">

                            {links.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `rounded-lg px-3 py-2 text-sm font-medium ${isActive
                                            ? 'bg-secondary text-secondary-foreground'
                                            : 'text-muted-foreground hover:text-primary'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="mt-2 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
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