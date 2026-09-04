
import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'


function AbstractPatternLeft() {
    return (
        <svg
            className="absolute bottom-0 left-0 w-full opacity-[0.04] pointer-events-none"
            viewBox="0 0 480 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="60" cy="260" r="120" fill="#4285F4" />
            <circle cx="360" cy="80" r="160" fill="#EA4335" />
            <circle cx="420" cy="300" r="80" fill="#34A853" />
            <circle cx="160" cy="40" r="60" fill="#FBBC04" />
        </svg>
    )
}

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [focusedField, setFocusedField] = useState<
        'email' | 'password' | null
    >(null)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage('')

        if (!email.trim() || !password.trim()) {
            setErrorMessage('Please enter your email and password.')
            return
        }

        // Temporary UI-only login
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            navigate('/')
        }, 800)
    }

    return (
        <div
            className="min-h-screen w-full flex flex-col"
            style={{
                backgroundColor: '#F8F9FA',
                fontFamily: "'Roboto', sans-serif",
            }}
        >
            <main
                className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 min-h-0"
                style={{ minHeight: 'calc(100vh - 4px)' }}
            >
                {/* Left column */}
                <div className="hidden md:flex items-center justify-center p-16 relative overflow-hidden">
                    <AbstractPatternLeft />

                    <div
                        className="relative w-full max-w-[440px] bg-white rounded-[24px] p-10 flex flex-col gap-8"
                        style={{
                            boxShadow:
                                '0px 1px 2px rgba(0,0,0,0.06), 0px 4px 16px rgba(0,0,0,0.06), 0px 0px 0px 1px rgba(0,0,0,0.04)',
                        }}
                    >
                        <div className="flex flex-col gap-3">

                            <div className="h-px bg-[#F1F3F4] mt-1" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <h1
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                className="text-[42px] font-bold text-[#1C1B1F] leading-[1.15] tracking-[-0.5px]"
                            >
                                Challenge Yourself
                                <br />
                                <span className="text-[#3A7CF5]">Technically</span>
                            </h1>

                            <p
                                className="text-[16px] text-[#5F6368] leading-relaxed font-normal max-w-[340px]"
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                            >
                                Log in to continue your challenges and keep your Streak going.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#4285F4] flex-shrink-0" />

                                <span
                                    className="text-sm text-[#3C4043]"
                                    style={{ fontFamily: "'Roboto', sans-serif" }}
                                >
                                    Log in to see your points and ranking on the Leaderboard
                                </span>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-[#F1F3F4]">
                            <span
                                className="inline-flex items-center gap-2 text-xs text-[#5F6368] bg-[#F8F9FA] px-3 py-1.5 rounded-full"
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path
                                        d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z"
                                        fill="#FBBC04"
                                    />
                                </svg>

                                GDG on Campus — King Abdulaziz University
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex items-center justify-center p-6 md:p-16 bg-white relative">
                    <div className="absolute top-8 right-8 hidden md:flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
                        <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
                        <div className="w-2 h-2 rounded-full bg-[#FBBC04]" />
                        <div className="w-2 h-2 rounded-full bg-[#34A853]" />
                    </div>

                    <div className="w-full max-w-[380px] flex flex-col gap-6">

                        {/* Mobile logo */}
                        <div className="md:hidden mb-2">

                        </div>

                        <div className="flex flex-col gap-1.5">
                            <h2
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                className="text-[28px] font-bold text-[#1C1B1F] tracking-[-0.3px]"
                            >
                                Sign In
                            </h2>

                            <p
                                className="text-sm text-[#5F6368]"
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                            >
                                Enter your details to continue
                            </p>
                        </div>

                        {(isLoading || errorMessage) && (
                            <div className="transition-all duration-200">
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2.5 py-2">
                                        {[
                                            { color: '#4285F4', delay: '0s' },
                                            { color: '#EA4335', delay: '0.15s' },
                                            { color: '#FBBC04', delay: '0.3s' },
                                            { color: '#34A853', delay: '0.45s' },
                                        ].map(({ color, delay }) => (
                                            <span
                                                key={color}
                                                style={{
                                                    display: 'block',
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    backgroundColor: color,
                                                    animation: `loginBounce 0.8s cubic-bezier(0.33, 0, 0.66, 1) ${delay} infinite`,
                                                }}
                                            />
                                        ))}

                                        <style>{`
                      @keyframes loginBounce {
                        0%, 100% {
                          transform: translateY(0);
                        }

                        45% {
                          transform: translateY(-8px);
                        }
                      }
                    `}</style>
                                    </div>
                                ) : (
                                    <div className="p-3.5 rounded-[8px] bg-[#FFEBEE] border border-[#FFCDD2] flex items-start gap-2.5">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            className="flex-shrink-0 mt-0.5"
                                        >
                                            <circle
                                                cx="8"
                                                cy="8"
                                                r="7"
                                                stroke="#EA4335"
                                                strokeWidth="1.5"
                                            />

                                            <path
                                                d="M8 5V8.5M8 11H8.01"
                                                stroke="#EA4335"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>

                                        <span
                                            className="text-[13px] text-[#C62828] leading-tight"
                                            style={{ fontFamily: "'Roboto', sans-serif" }}
                                        >
                                            {errorMessage}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        <form
                            className="flex flex-col gap-5"
                            onSubmit={handleLogin}
                        >

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="login-email"
                                    className="text-[13px] font-medium text-[#3C4043]"
                                    style={{ fontFamily: "'Roboto', sans-serif" }}
                                >
                                    Email
                                </label>

                                <div className="relative">
                                    <input
                                        id="login-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        disabled={isLoading}
                                        placeholder="you@university.edu.sa"
                                        className="w-full px-4 py-3 text-[15px] text-[#1C1B1F] bg-white rounded-[8px] outline-none transition-all duration-150 disabled:opacity-50"
                                        style={{
                                            border:
                                                focusedField === 'email'
                                                    ? '2px solid #3A7CF5'
                                                    : '1.5px solid #E0E0E0',
                                            fontFamily: "'Roboto', sans-serif",
                                        }}
                                    />

                                    {focusedField === 'email' && !isLoading && (
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="8"
                                                    cy="8"
                                                    r="7"
                                                    stroke="#3A7CF5"
                                                    strokeWidth="1.5"
                                                />

                                                <path
                                                    d="M5 8L7 10L11 6"
                                                    stroke="#3A7CF5"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="login-password"
                                    className="text-[13px] font-medium text-[#3C4043]"
                                    style={{ fontFamily: "'Roboto', sans-serif" }}
                                >
                                    Password
                                </label>

                                <input
                                    id="login-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    disabled={isLoading}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 text-[15px] text-[#1C1B1F] bg-white rounded-[8px] outline-none transition-all duration-150 disabled:opacity-50"
                                    style={{
                                        border:
                                            focusedField === 'password'
                                                ? '2px solid #3A7CF5'
                                                : '1.5px solid #E0E0E0',
                                        fontFamily: "'Roboto', sans-serif",
                                    }}
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col items-center mt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 text-white font-semibold text-[15px] rounded-[100px] transition-all duration-150 disabled:opacity-75 disabled:cursor-not-allowed hover:brightness-95 active:scale-[0.98]"
                                    style={{
                                        backgroundColor: '#3A7CF5',
                                        fontFamily: "'DM Sans', sans-serif",
                                        boxShadow: isLoading
                                            ? 'none'
                                            : '0px 2px 6px rgba(58,124,245,0.30), 0px 1px 2px rgba(58,124,245,0.20)',
                                        letterSpacing: '0.2px',
                                    }}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>

                            <p
                                className="text-center text-[13px] text-[#9AA0A6]"
                                style={{
                                    fontFamily: "'Roboto', sans-serif",
                                    marginTop: '-4px',
                                }}
                            >
                                Don't have an account?{' '}

                                <Link
                                    to="/register"
                                    className="text-[#5F6368] underline underline-offset-2 hover:text-[#3A7CF5] transition-colors duration-150"
                                >
                                    Sign up now
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>
            </main>

            {/* Google colors bottom bar */}
            <div
                className="flex-shrink-0 flex w-full"
                style={{ height: '4px' }}
            >
                <div className="flex-1" style={{ backgroundColor: '#4285F4' }} />
                <div className="flex-1" style={{ backgroundColor: '#EA4335' }} />
                <div className="flex-1" style={{ backgroundColor: '#FBBC04' }} />
                <div className="flex-1" style={{ backgroundColor: '#34A853' }} />
            </div>
        </div>
    )
}

