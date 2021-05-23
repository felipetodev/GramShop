import Checkout from 'components/Checkout'
import { Box, Flex, Link, Text, Image } from '@chakra-ui/react'
import { APP } from 'app/constants'

export default function Navbar ({ cart = [], setCart, itemsInCart }) {
  return (
    <>
      <Box>
        <Image
          margin='0 auto'
          height={250}
          width='100%'
          borderRadius='0 0 10px 10px'
          objectFit='cover'
          src={APP.banner}
        />
      </Box>
      <Flex
        as='nav'
        zIndex={1}
        position='absolute'
        top='225px'
        left={0}
        right={0}
        justifyContent='space-between'
        alignItems='center'
        maxWidth='1200px'
        margin='0 auto'
        paddingX={1.5}
      >
        <Image
          h={{ base: 110, sm: 150 }}
          w={{ base: 110, sm: 150 }}
          border='3px solid white'
          borderRadius={20}
          objectFit='cover'
          src={APP.avatar}
        />
        <Flex marginLeft={4} justifyContent='flex-end' direction='column' marginRight='auto'>
          <Text as='h1' fontSize={{ base: '20', sm: '35' }} fontWeight='bold'>{APP.title}</Text>
          <Text as='h2' fontSize={{ base: '15', sm: '17' }}>{APP.description}</Text>
          <Link fontSize={{ base: '15', sm: '17' }}>{APP.address}</Link>
        </Flex>
        <Checkout
          products={cart}
          setCart={setCart}
          itemsInCart={itemsInCart}
        />
      </Flex>
    </>
  )
}
