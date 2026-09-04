import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { theme } from '../../theme'

interface MainLayoutProps {
    darkMode: boolean
    setDarkMode: (value: boolean) => void
}

function MainLayout({ darkMode, setDarkMode }: MainLayoutProps) {
    const t = theme(darkMode)

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: t.bg, color: t.textPrimary }}
        >
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="flex-1 min-h-0">
                <Outlet />
            </main>

            <Footer darkMode={darkMode} />
        </div>
    )
}

export default MainLayout
