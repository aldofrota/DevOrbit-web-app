import React from 'react'
import { Select } from 'antd'
import { useLanguage, type Language } from '@/hooks'

const { Option } = Select

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, getAvailableLanguages, t } = useLanguage()

  const languages = getAvailableLanguages()

  const handleLanguageChange = (value: Language) => {
    changeLanguage(value)
  }

  return (
    <Select
      className="w-full"
      variant="borderless"
      value={currentLanguage}
      onChange={handleLanguageChange}
      size="small"
      title={t('language.language')}
    >
      {languages.map(language => (
        <Option key={language.code} value={language.code}>
          {language.nativeName}
        </Option>
      ))}
    </Select>
  )
}
export default LanguageSelector
