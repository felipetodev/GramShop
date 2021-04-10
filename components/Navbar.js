import DetailsModal from 'components/DetailsModal'
import { Box, Flex, Link, Text, Image, Stack } from '@chakra-ui/react'

export default function Navbar ({ cart = [], setCart, itemsInCart, textMessage }) {
  return (
    <>
      <Box>
        <Image
          margin='0 auto'
          height={250}
          width='100%'
          borderRadius='0 0 10px 10px'
          objectFit='cover'
          src='https://res.cloudinary.com/goncy/image/upload/v1589912646/pency/y0vy0hpyz5m1echx0het.jpg'
        />
      </Box>
      <Flex
        zIndex={1}
        position='absolute'
        top='210px'
        left={0}
        right={0}
        as='nav'
        justifyContent='space-between'
        alignItems='baseline'
        maxWidth='1200px'
        margin='0 auto'
        padding='0 1rem'
      >
        <Stack
          border='5px solid #fff'
          display='flex'
          justifyContent='center'
          alignItems='center'
          borderRadius='50%'
          width={150}
          height={150}
          backgroundColor='orange'
        >
          <Text color='#fff' fontWeight='bold' fontSize={40}>Funk</Text>
        </Stack>
        <Flex marginLeft={4} justifyContent='flex-end' flexDirection='column' marginRight='auto'>
          <Text as='h1' fontSize={35} fontWeight='bold'>Funko-Pop Store</Text>
          <Text as='h2'>Pizzas Argentinas estilo Barrio Italia</Text>
          <Link>Av. Barrio Italia #3888</Link>
        </Flex>

        <DetailsModal
          products={cart}
          setCart={setCart}
          itemsInCart={itemsInCart}
          textMessage={textMessage}
        />
      </Flex>
    </>
  )
}
