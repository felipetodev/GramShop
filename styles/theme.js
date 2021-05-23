import { extendTheme, theme } from '@chakra-ui/react'

export default extendTheme({
  colors: {
    primary: theme.colors.green
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'primary.50'
      }
    }
  }
})
