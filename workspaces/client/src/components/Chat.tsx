import styled from '@emotion/styled'
import moment from 'moment'
import { forwardRef } from 'react'
import { useChat } from '../context/ChatContext'
import { IChat } from '../context/ChatContext/types'
import Text from './Text'

const ChatWrapper = styled('li', { shouldForwardProp: (prop) => prop !== 'isSelf' })<{ isSelf?: boolean }>`
  background-color: ${({ theme }) => theme.colors.main.gray};
  padding: 8px 12px;
  min-width: 35%;
  max-width: 60%;
  align-self: ${({ isSelf }) => (isSelf ? 'flex-start' : 'flex-end')};
  border-radius: 24px;
  border-bottom-left-radius: ${({ isSelf }) => (isSelf ? 0 : '24px')};
  border-bottom-right-radius: ${({ isSelf }) => (isSelf ? '24px' : 0)};
  display: flex;
  flex-direction: column;
`

const DateText = styled(Text)`
  align-self: flex-end;
`

const Chat = forwardRef<HTMLLIElement, IChat>(({ content, from, sentAt }, ref) => {
  const { socket } = useChat()
  return (
    <ChatWrapper isSelf={from.id === socket.id} ref={ref}>
      <Text bold>{from.username}</Text>
      <Text small>{content}</Text>
      <DateText size={12} bold>
        {moment(sentAt).fromNow()}
      </DateText>
    </ChatWrapper>
  )
})

export default Chat
