import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { ThemeToggle } from '@/components'
import { useTheme } from '@/hooks'

vi.mock('@/hooks', () => ({
  useTheme: vi.fn(),
}))

describe('ThemeToggle', () => {
  const mockToggleTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('theme display', () => {
    it('should show moon icon when theme is dark', () => {
      ;(useTheme as any).mockReturnValue({
        theme: 'dark',
        toggleTheme: mockToggleTheme,
      })

      render(<ThemeToggle />)

      const themeIcon = screen.getByTestId('theme-icon')
      expect(themeIcon).toHaveAttribute('data-testid', 'theme-icon')

      const svg = themeIcon.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg?.innerHTML).toContain('M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z')
    })

    it('should show sun icon when theme is light', () => {
      ;(useTheme as any).mockReturnValue({
        theme: 'light',
        toggleTheme: mockToggleTheme,
      })

      render(<ThemeToggle />)

      const themeIcon = screen.getByTestId('theme-icon')

      const svg = themeIcon.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg?.innerHTML).toContain('circle cx="12" cy="12" r="4"')
    })
  })

  describe('interactions', () => {
    it('should call toggleTheme when clicked', () => {
      ;(useTheme as any).mockReturnValue({
        theme: 'light',
        toggleTheme: mockToggleTheme,
      })

      render(<ThemeToggle />)

      const themeIcon = screen.getByTestId('theme-icon')
      fireEvent.click(themeIcon)

      expect(mockToggleTheme).toHaveBeenCalledTimes(1)
    })
  })

  describe('dependencies', () => {
    it('should use useTheme hook correctly', () => {
      ;(useTheme as any).mockReturnValue({
        theme: 'dark',
        toggleTheme: mockToggleTheme,
      })

      render(<ThemeToggle />)

      expect(useTheme).toHaveBeenCalled()
    })
  })

  describe('props and refs', () => {
    it('should apply custom className', () => {
      ;(useTheme as any).mockReturnValue({
        theme: 'dark',
        toggleTheme: mockToggleTheme,
      })

      const customClass = 'custom-theme-toggle'
      render(<ThemeToggle className={customClass} />)

      const themeIcon = screen.getByTestId('theme-icon')
      expect(themeIcon).toHaveClass(customClass)
    })

    it('should spread additional props', () => {
      ;(useTheme as any).mockReturnValue({
        theme: 'light',
        toggleTheme: mockToggleTheme,
      })

      render(<ThemeToggle data-custom="test" />)

      const themeIcon = screen.getByTestId('theme-icon')
      expect(themeIcon).toHaveAttribute('data-custom', 'test')
    })
  })
})
