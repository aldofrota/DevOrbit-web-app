import { vi } from 'vitest'

// Mock i18next for tests
vi.mock('i18next', () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn().mockReturnThis(),
    changeLanguage: vi.fn(),
    language: 'pt',
  },
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'auth.loginLoading': 'Entrando...',
        'auth.loginSuccess': 'Bem-vindo ao DevOrbit!',
        'auth.loginError': 'Erro ao entrar.',
        'auth.logoutError': 'Erro no logout:',
        'common.loading': 'Carregando...',
        'common.error': 'Erro',
        'common.success': 'Sucesso',
        'common.cancel': 'Cancelar',
        'common.save': 'Salvar',
        'common.delete': 'Excluir',
        'common.edit': 'Editar',
        'common.create': 'Criar',
        'common.search': 'Pesquisar',
        'common.filter': 'Filtrar',
        'common.sort': 'Ordenar',
        'common.refresh': 'Atualizar',
        'common.back': 'Voltar',
        'common.next': 'Próximo',
        'common.previous': 'Anterior',
        'common.submit': 'Enviar',
        'common.close': 'Fechar',
        'common.open': 'Abrir',
        'common.yes': 'Sim',
        'common.no': 'Não',
        'common.confirm': 'Confirmar',
        'common.actions': 'Ações',
        'navigation.home': 'Início',
        'navigation.dashboard': 'Painel',
        'navigation.profile': 'Perfil',
        'navigation.settings': 'Configurações',
        'navigation.feed': 'Feed',
        'navigation.conversations': 'Conversas',
        'navigation.assistants': 'Assistentes',
        'navigation.tools': 'Ferramentas',
        'navigation.contacts': 'Contatos',
        'navigation.integrations': 'Integrações',
        'navigation.segments': 'Segmentos',
        'navigation.campaigns': 'Campanhas',
        'sidebar.title': 'DevOrbit',
        'sidebar.menu': 'Menu',
        'sidebar.quickActions': 'Ações Rápidas',
        'sidebar.recentActivity': 'Atividade Recente',
        'profile.title': 'Perfil',
        'profile.personalInfo': 'Informações Pessoais',
        'profile.name': 'Nome',
        'profile.username': 'Nome de usuário',
        'profile.bio': 'Biografia',
        'profile.avatar': 'Avatar',
        'profile.changeAvatar': 'Alterar Avatar',
        'profile.saveChanges': 'Salvar Alterações',
        'profile.changesSaved': 'Alterações salvas com sucesso',
        'profile.errorSaving': 'Erro ao salvar alterações',
        'feed.title': 'Feed',
        'feed.createPost': 'Criar Publicação',
        'feed.whatsOnYourMind': 'O que você está pensando?',
        'feed.post': 'Publicar',
        'feed.like': 'Curtir',
        'feed.comment': 'Comentar',
        'feed.share': 'Compartilhar',
        'feed.noPosts': 'Nenhuma publicação ainda',
        'feed.loadMore': 'Carregar Mais',
        'feed.refreshing': 'Atualizando...',
        'feed.errorLoading': 'Erro ao carregar publicações',
        'language.language': 'Idioma',
        'language.en': 'Inglês',
        'language.pt': 'Português',
        'language.es': 'Espanhol',
      }
      return translations[key] || key
    },
    i18n: {
      changeLanguage: vi.fn(),
      language: 'pt',
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
global.localStorage = localStorageMock as Storage

// Mock console methods
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
  log: vi.fn(),
}
