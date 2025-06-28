import { toast } from 'react-hot-toast'

export const toastHelper = {
  loading: (message: string) => {
    return toast.loading(message, {
      duration: Infinity,
    })
  },

  success: (toastId: string, message: string) => {
    toast.success(message, {
      id: toastId,
      duration: 3000,
    })
  },

  error: (toastId: string, message: string) => {
    toast.error(message, {
      id: toastId,
      duration: 3000,
    })
  },

  async withLoadingToast<T>(
    operation: () => Promise<T>,
    {
      loadingMessage,
      successMessage,
      errorMessage,
    }: {
      loadingMessage: string
      successMessage: string
      errorMessage: string
    },
  ): Promise<T> {
    const toastId = this.loading(loadingMessage)

    try {
      const result = await operation()
      this.success(toastId, successMessage)
      return result
    } catch (error: any) {
      this.error(toastId, `${errorMessage}: ${error.message}`)
      throw error
    }
  },
}
