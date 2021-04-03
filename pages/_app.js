import { ChakraProvider, Container, VStack, Image, Heading, Text, Box, Divider } from '@chakra-ui/react'
import theme from 'theme'

function MyApp ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          backgroundColor='white'
          borderRadius='sm'
          boxShadow='md'
          marginY={4}
          maxWidth='container.xl'
          padding={4}
        >
          <VStack>
            <Image borderRadius={9999} src='//placehold.it/128x128' />
            <Heading>Tiendita Gram</Heading>
            <Text>El almacen de tu comuna</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
