import { createContext, useContext } from 'react'
import { ChatContextValues } from './types'

export const ChatContext = createContext<ChatContextValues | undefined>(undefined)

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('This hooks should be called inside ChatProvider')
  }
  return context
}
