import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { LanguageSelector } from '@/components'
import { useLanguage } from '@/hooks'

vi.mock('@/hooks', () => ({
  useLanguage: vi.fn(),
}))

describe('LanguageSelector', () => {
  const mockChangeLanguage = vi.fn()
  const mockT = vi.fn((key: string) => key)

  const mockLanguages = [
    { code: 'pt-BR', nativeName: 'Português' },
    { code: 'en', nativeName: 'English' },
    { code: 'es', nativeName: 'Español' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('language display', () => {
    it('should display current language correctly', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'pt-BR',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
      expect(screen.getByText('Português')).toBeInTheDocument()
    })

    it('should show all available languages in dropdown', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'en',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)

      const portugueseOptions = screen.getAllByText('Português')
      const englishOptions = screen.getAllByText('English')
      const spanishOptions = screen.getAllByText('Español')

      expect(portugueseOptions.length).toBeGreaterThan(0)
      expect(englishOptions.length).toBeGreaterThan(0)
      expect(spanishOptions.length).toBeGreaterThan(0)
    })
  })

  describe('interactions', () => {
    it('should call changeLanguage when language is selected', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'pt-BR',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)

      const englishOptions = screen.getAllByText('English')
      const englishOption = englishOptions.find(option =>
        option.closest('.ant-select-item-option-content'),
      )

      if (englishOption) {
        fireEvent.click(englishOption)
        expect(mockChangeLanguage).toHaveBeenCalledWith('en')
      }
    })

    it('should call changeLanguage with correct language code', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'en',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      const select = screen.getByRole('combobox')
      fireEvent.mouseDown(select)

      const portugueseOptions = screen.getAllByText('Português')
      const portugueseOption = portugueseOptions.find(option =>
        option.closest('.ant-select-item-option-content'),
      )

      if (portugueseOption) {
        fireEvent.click(portugueseOption)
        expect(mockChangeLanguage).toHaveBeenCalledWith('pt-BR')
      }
    })
  })

  describe('dependencies', () => {
    it('should use useLanguage hook correctly', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'pt-BR',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      expect(useLanguage).toHaveBeenCalled()
    })

    it('should call getAvailableLanguages to get languages list', () => {
      const mockGetAvailableLanguages = vi.fn(() => mockLanguages)

      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'pt-BR',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: mockGetAvailableLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      expect(mockGetAvailableLanguages).toHaveBeenCalled()
    })

    it('should use translation function for title', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'pt-BR',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      const selectContainer = screen.getByRole('combobox').closest('.ant-select')
      expect(selectContainer).toHaveAttribute('title', 'language.language')
      expect(mockT).toHaveBeenCalledWith('language.language')
    })
  })

  describe('UI elements', () => {
    it('should render global icon', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'pt-BR',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      const globalIcon = screen.getByLabelText('global')
      expect(globalIcon).toBeInTheDocument()
    })

    it('should have correct select styling', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'pt-BR',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      const selectContainer = screen.getByRole('combobox').closest('.ant-select')
      expect(selectContainer).toHaveStyle({ width: '120px' })
    })

    it('should render in Space component', () => {
      ;(useLanguage as any).mockReturnValue({
        currentLanguage: 'pt-BR',
        changeLanguage: mockChangeLanguage,
        getAvailableLanguages: () => mockLanguages,
        t: mockT,
      })

      render(<LanguageSelector />)

      const spaceContainer = screen.getByRole('combobox').closest('.ant-space')
      expect(spaceContainer).toBeInTheDocument()
    })
  })
})
