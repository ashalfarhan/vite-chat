import styled from '@emotion/styled'

interface TextProps {
  small?: boolean
  bold?: boolean
  size?: number
  color?: string
  center?: boolean
}

const Text = styled.p<TextProps>`
  font-size: ${({ small, size }) => (small ? 14 : size ? size : 16)}px;
  line-height: ${({ small, size }) => (small ? 21 : size ? size * 1.5 : 24)}px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ color }) => color ?? 'white'};
  text-align: ${({ center }) => (center ? 'center' : 'start')};
`

export default Text
