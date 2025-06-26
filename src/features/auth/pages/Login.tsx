import { useState } from 'react'
import { Button, Input, Card, Typography } from 'antd'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import logoDark from '@/assets/1.png'
import logoLight from '@/assets/2.png'
import { useTheme } from '@/hooks'
import ThemeToggle from '@/components/ThemeToggle'
import { useAuth } from '@/features/auth/hooks'

const { Title, Text } = Typography

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const { isDark } = useTheme()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-background dark:bg-background-dark`}
    >
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src={isDark ? logoDark : logoLight} alt="Logo DevOrbit" className="h-20" />
        </div>

        <Card
          className={`backdrop-blur-sm border-0 shadow-xl ${isDark ? 'dark-card' : ''}`}
          style={{
            background: isDark ? 'rgba(24, 24, 27, 0.85)' : 'rgba(255,255,255,0.8)',
            color: isDark ? '#fff' : undefined,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={3} style={{ marginBottom: 0, color: isDark ? '#fff' : undefined }}>
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </Title>
            <Text type="secondary" style={{ color: isDark ? '#cbd5e1' : undefined }}>
              {isLogin
                ? 'Entre na sua conta para continuar'
                : 'Crie sua conta e faça parte da comunidade'}
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
            <div className="gap-2 flex flex-col">
              <label
                htmlFor="email"
                className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                size="large"
                required
              />
            </div>

            <div className="gap-2 flex flex-col">
              <label
                htmlFor="password"
                className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
              >
                Senha
              </label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                size="large"
                required
                suffix={
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                }
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-end text-sm mb-2">
                <Button
                  type="link"
                  style={{ padding: 0, height: 'auto', color: isDark ? '#60a5fa' : undefined }}
                >
                  Esqueceu a senha?
                </Button>
              </div>
            )}

            <Button type="primary" htmlType="submit" size="large" block>
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300`}>
                ou
              </span>
            </div>
          </div>

          <ThemeToggle />

          <div className="gap-3 flex flex-col items-center">
            <Button
              type="default"
              icon={<FcGoogle />}
              size="large"
              block
              style={{
                borderColor: isDark ? '#334155' : '#e5e7eb',
                color: isDark ? '#fff' : undefined,
              }}
            >
              Continuar com Google
            </Button>
            <Button
              type="default"
              icon={<AiFillGithub />}
              size="large"
              block
              style={{
                borderColor: isDark ? '#334155' : '#e5e7eb',
                color: isDark ? '#fff' : undefined,
              }}
            >
              Continuar com GitHub
            </Button>
          </div>

          <div className="text-center pt-4">
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            </span>
            <Button
              type="link"
              onClick={() => setIsLogin(!isLogin)}
              style={{ padding: 0, height: 'auto', color: isDark ? '#60a5fa' : undefined }}
            >
              {isLogin ? 'Criar conta' : 'Entrar'}
            </Button>
          </div>
        </Card>

        <div className={`text-center mt-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          <p>© 2024 DevOrbit. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
