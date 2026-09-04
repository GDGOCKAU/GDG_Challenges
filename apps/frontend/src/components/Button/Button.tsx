import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, className = '', ...props }: ButtonProps) {
    return (
        <button
            className={`
        rounded-md
        bg-primary
        px-4
        py-2
        text-sm
        font-medium
        text-primary-foreground
        transition
        hover:opacity-90
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
