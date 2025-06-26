import React from 'react'
import { Select, Space } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useLanguage, type Language } from '@/hooks'

const { Option } = Select

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, getAvailableLanguages, t } = useLanguage()

  const languages = getAvailableLanguages()

  const handleLanguageChange = (value: Language) => {
    changeLanguage(value)
  }

  return (
    <Space>
      <GlobalOutlined />
      <Select
        value={currentLanguage}
        onChange={handleLanguageChange}
        style={{ width: 120 }}
        size="small"
        title={t('language.language')}
      >
        {languages.map(language => (
          <Option key={language.code} value={language.code}>
            {language.nativeName}
          </Option>
        ))}
      </Select>
    </Space>
  )
}
export default LanguageSelector
