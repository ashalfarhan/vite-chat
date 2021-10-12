import { css, Global } from '@emotion/react'

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html,
        body {
          font-family: 'Roboto', sans-serif;
          color: white;
        }
      `}
    />
  )
}
