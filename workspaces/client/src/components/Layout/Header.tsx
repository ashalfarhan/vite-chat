import styled from '@emotion/styled'
import { useCallback } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useChat } from '../../context/ChatContext'
import Text from '../Text'
import { FiUsers } from 'react-icons/fi'

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: ${({ theme }) => theme.colors.main.darkGray};
  padding: 12px;
`

const AvatarWrapper = styled.div`
  border-radius: 100%;
  border: 2px solid white;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const UsernameInput = styled.input`
  background-color: transparent;
  border: none;
  padding: 12px;
  color: white;
  flex: 1;
  font-weight: 600;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`

export default function Header() {
  const { user, dispatch, otherUser } = useChat()
  const onUsernameChange = useCallback(
    (e) => {
      dispatch({ type: 'user/changeUsername', payload: e.target.value })
    },
    [dispatch]
  )
  return (
    <HeaderWrapper>
      <AvatarWrapper>
        <AiOutlineUser size={'24px'} color="#fff" />
      </AvatarWrapper>
      <UsernameInput type="text" value={user.username} onChange={onUsernameChange} />
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <Text size={14}>{otherUser.total}</Text>
        <FiUsers size={18} color="#fff" />
      </div>
    </HeaderWrapper>
  )
}
