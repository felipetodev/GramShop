import { extendTheme, theme } from '@chakra-ui/react'

export default extendTheme({
  colors: {
    primary: theme.colors.orange
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'primary.50'
      }
    }
  }
})
