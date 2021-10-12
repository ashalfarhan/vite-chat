import styled from '@emotion/styled'
import { FormEventHandler, useCallback, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useChat } from '../../context/ChatContext'

const BottomForm = styled.form`
  background-color: ${({ theme }) => theme.colors.main.lighterGray};
  padding: 12px;
  height: 64px;
  display: flex;
  align-items: stretch;
  column-gap: 12px;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
`

const ChatInput = styled.textarea`
  flex: 1;
  border: none;
  font-family: 'Roboto', sans-serif;
  border-radius: 24px;
  padding: 12px;
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.main.darkGray};
  outline: none;
  transition: outline 200ms ease-in-out;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.main.gray};
  }
  &::placeholder {
    color: white;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
`

const SendButton = styled.button`
  border-radius: 100%;
  width: 40px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.main.darkGray};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: outline 200ms ease-in-out;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.main.gray};
  }
`

const SendIcon = styled(AiOutlineSend, { shouldForwardProp: (props) => props !== 'isTyping' })<{
  isTyping?: boolean
}>`
  transform: rotate(${({ isTyping }) => (isTyping ? 300 : 90)}deg);
  color: #fff;
  width: 20px;
  height: 20px;
  transition: transform 200ms linear;
`

const BottomInput = () => {
  const [typing, setTyping] = useState(false)
  const [content, setContent] = useState('')
  const { insertChat, inputRef, socket, user } = useChat()
  const handleSend: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      setContent('')
      insertChat(content)
    },
    [insertChat, content]
  )
  const handleTouch = useCallback(
    (e: { type: string }) => {
      if (e.type === 'focus') {
        setTyping(true)
        socket.emit('SOMEONE_TYPING', { username: user.username, isTyping: true })
      } else if (e.type === 'keypress') {
        setTyping(true)
        socket.emit('SOMEONE_TYPING', { username: user.username, isTyping: true })
      } else if (e.type === 'blur') {
        setTyping(false)
        socket.emit('SOMEONE_TYPING', { username: user.username, isTyping: false })
      }
    },
    [socket, user.username]
  )
  return (
    <BottomForm onSubmit={handleSend}>
      <ChatInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={handleTouch}
        onBlur={handleTouch}
        onKeyPress={handleTouch}
        placeholder="Message"
        ref={inputRef}
      />
      <SendButton type="submit">
        <SendIcon isTyping={typing || !!content} />
      </SendButton>
    </BottomForm>
  )
}

export default BottomInput
