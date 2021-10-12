import { FC, useCallback, useEffect, useReducer, useRef } from 'react'
import { ChatContext } from '.'
import { socket } from '../../libs/socketio'
import { chatStateeducer, initialChatState } from './reducer'
import { ChatContextValues } from './types'

const ChatProvider: FC = (props) => {
  const [state, dispatch] = useReducer(chatStateeducer, initialChatState)
  const inputRef = useRef<null | HTMLTextAreaElement>(null)
  const lastChatRef = useCallback((node: HTMLLIElement | undefined) => {
    node && node.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const insertChat: ChatContextValues['insertChat'] = useCallback(
    (content) => {
      if (!content) {
        return
      }
      socket.emit('INCOMING_CHAT', { username: state.user.username, content })
      inputRef.current && inputRef.current.focus()
    },
    [state.user.username]
  )
  useEffect(() => {
    socket.on('NEW_CONNECTED', (payload) => {
      dispatch({ type: 'user/newUser', payload })
    })
    socket.on('INCOMING_CHAT', (payload) => {
      dispatch({ type: 'chat/insertChat', payload })
    })
    socket.on('DISCONNECTED', (payload) => {
      dispatch({ type: 'user/disconnected', payload })
    })
    socket.on('SOMEONE_TYPING', (payload) => {
      dispatch({ type: 'user/otherTyping', payload })
    })
    socket.on('TOTAL_CLIENTS', (payload) => {
      dispatch({ type: 'user/totalConnected', payload })
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <ChatContext.Provider
      value={{
        chats: state.chats,
        otherUser: state.otherUser,
        user: state.user,
        insertChat,
        dispatch,
        lastChatRef,
        inputRef,
        socket,
      }}
      {...props}
    />
  )
}

export default ChatProvider
