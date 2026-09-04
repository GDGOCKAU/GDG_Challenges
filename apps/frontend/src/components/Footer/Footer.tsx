function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
                © {new Date().getFullYear()} GDG on Campus — King Abdulaziz University. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer