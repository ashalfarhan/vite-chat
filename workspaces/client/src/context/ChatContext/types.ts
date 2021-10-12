import { RefObject } from 'react'
import { Socket } from 'socket.io-client'

export interface IChat {
  from: IUser
  content: string
  sentAt: string
}

export interface IUser {
  username: string
  id: string
}

export interface ChatContextValues {
  chats: IChat[]
  insertChat: (message: string) => void
  lastChatRef: (node: HTMLLIElement) => void
  inputRef: RefObject<HTMLTextAreaElement>
  user: IUser
  otherUser: {
    allConnected: string[]
    typing: {
      id: string | null
      isTyping: boolean
      username: string
    }
    total: number
  }
  socket: Socket
  dispatch: React.Dispatch<ChatStateActionType>
}

export type ChatState = Pick<ChatContextValues, 'chats' | 'user' | 'otherUser'>

export type ChatStateActionType =
  | { type: 'chat/insertChat'; payload: IChat }
  | { type: 'user/changeUsername'; payload: string }
  | { type: 'user/newUser'; payload: string }
  | { type: 'user/disconnected'; payload: string }
  | { type: 'user/otherTyping'; payload: ChatContextValues['otherUser']['typing'] }
  | { type: 'user/totalConnected'; payload: number }
