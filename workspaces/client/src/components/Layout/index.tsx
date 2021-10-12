import styled from '@emotion/styled'
import { FC } from 'react'
import BottomInput from './Bottom'
import Header from './Header'

const Wrapper = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: ${({ theme }) => theme.colors.main.black};
  align-items: stretch;
  justify-content: center;
`

const Container = styled.div`
  max-width: 480px;
  flex: 1;
  box-shadow: 1px 1px 4px 1px ${({ theme }) => theme.colors.main.lighterGray};
  border-radius: 9px;
  display: flex;
  flex-direction: column;
`

const Inner = styled.div`
  flex: 1;
  padding: 8px;
  display: flex;
`

const Layout: FC = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <Header />
        <Inner>{children}</Inner>
        <BottomInput />
      </Container>
    </Wrapper>
  )
}

export default Layout
