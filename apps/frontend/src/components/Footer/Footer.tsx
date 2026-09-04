import { GOOGLE_BAR, theme } from '../../theme'

interface FooterProps {
    darkMode: boolean
}

function Footer({ darkMode }: FooterProps) {
    const t = theme(darkMode)

    return (
        <>
            <footer className="border-t" style={{ backgroundColor: t.surface, borderColor: t.border }}>
                <div
                    className="mx-auto max-w-7xl px-4 py-5 text-center text-[12px] sm:px-6 lg:px-8"
                    style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}
                >
                    © {new Date().getFullYear()} GDG on Campus — King Abdulaziz University.
                </div>
            </footer>
            <div className="flex h-1 w-full shrink-0" aria-hidden="true">
                {GOOGLE_BAR.map((color) => (
                    <span key={color} className="flex-1" style={{ backgroundColor: color }} />
                ))}
            </div>
        </>
    )
}

export default Footer
