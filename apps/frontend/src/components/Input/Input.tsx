import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

function Input({ className = '', ...props }: InputProps) {
    return (
        <input
            className={`
        w-full
        rounded-md
        border
        border-border
        bg-input-background
        px-4
        py-2
        text-foreground
        outline-none
        transition
        placeholder:text-muted-foreground
        focus:border-primary
        focus:ring-2
        focus:ring-primary/20
        ${className}
      `}
            {...props}
        />
    )
}

export default Input
