import React, { forwardRef } from 'react'
import { useTheme } from '@/hooks'
import { LuMoon, LuSun } from 'react-icons/lu'

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {}

const ThemeToggle: React.FC<ThemeToggleProps> = forwardRef<HTMLDivElement, ThemeToggleProps>(
  ({ className = '', ...props }, ref) => {
    const { theme, toggleTheme } = useTheme()

    return (
      <div
        ref={ref}
        onClick={toggleTheme}
        data-testid="theme-icon"
        className={`flex items-center justify-center cursor-pointer transition-colors duration-200 ${className}`}
        {...props}
      >
        {theme === 'dark' ? <LuMoon size={22} /> : <LuSun size={22} />}
      </div>
    )
  },
)

ThemeToggle.displayName = 'ThemeToggle'

export default ThemeToggle
