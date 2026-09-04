type CardProps = {
    children: React.ReactNode
    className?: string
}

function Card({ children, className = '' }: CardProps) {
    return (
        <div
            className={`
        rounded-xl
        border
        border-border
        bg-card
        p-6
        shadow-sm
        ${className}
      `}
        >
            {children}
        </div>
    )
}

export default Card
