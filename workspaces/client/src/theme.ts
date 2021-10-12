const theme = {
  colors: {
    yellow: '#EEC643',
    dark: '#141414',
    light: '#EEF0F2',
    blue: '#011638',
    main: {
      black: '#0C0910',
      darkGray: '#453750',
      gray: '#73648A',
      lightGray: '#9882AC',
      lighterGray: '#A393BF',
    },
  },
} as const

export type MyTheme = typeof theme

export default theme
