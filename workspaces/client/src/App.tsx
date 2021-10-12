import styled from '@emotion/styled'
import Chat from './components/Chat'
import Layout from './components/Layout'
import Text from './components/Text'
import { useChat } from './context/ChatContext'

const ChatContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 8px;
  height: 80vh;
  overflow-y: scroll;
  flex: 1;
  & li {
    list-style-type: none;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
`

function App() {
  const { chats, lastChatRef, otherUser } = useChat()
  return (
    <Layout>
      <ChatContainer>
        {chats.length > 0 ? (
          chats.map((chat, idx) => (
            <Chat {...chat} key={`Chat__${idx}`} ref={idx === chats.length - 1 ? lastChatRef : null} />
          ))
        ) : (
          <Text bold style={{ width: '100%' }} center>
            This chat is empty
          </Text>
        )}
        {otherUser.typing.isTyping && (
          <Text center style={{ width: '100%', fontStyle: 'italic' }}>
            {otherUser.typing.username} is typing...
          </Text>
        )}
      </ChatContainer>
    </Layout>
  )
}

export default App
