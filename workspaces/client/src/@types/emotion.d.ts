import type { MyTheme } from '../theme'

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
