import { ChatState, ChatStateActionType } from './types'

export const initialChatState: ChatState = {
  chats: [],
  user: {
    username: 'Unknown',
    id: '',
  },
  otherUser: {
    allConnected: [],
    typing: {
      id: null,
      isTyping: false,
      username: '',
    },
    total: 0,
  },
}

export function chatStateeducer(state: ChatState = initialChatState, action: ChatStateActionType): ChatState {
  switch (action.type) {
    case 'user/changeUsername':
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      }
    case 'user/newUser':
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          allConnected: [...state.otherUser.allConnected, action.payload],
        },
      }
    case 'user/totalConnected':
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          total: action.payload,
        },
      }
    case 'user/disconnected':
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          allConnected: state.otherUser.allConnected.filter((u) => u !== action.payload),
        },
      }
    case 'user/otherTyping':
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          typing: action.payload
        },
      }
    case 'chat/insertChat':
      return {
        ...state,
        chats: [...state.chats, action.payload],
      }
    default:
      return state
  }
}
