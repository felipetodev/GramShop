/*
import { useState, useMemo } from 'react'
import Head from 'next/head'
import { useToast, Button, Grid, Stack, Text, Image, Container, FormLabel, FormControl, Box } from '@chakra-ui/react'
import { itemsInCart, parseCurrency } from 'helpers'
import Navbar from 'components/Navbar'
import Search from 'components/Search'

export default function StoreScreen ({ products }) {
  const [cart, setCart] = useState([])
  const [prodSearch, setProdSearch] = useState('')
  const toast = useToast()
  // Componetizar Checkout Format <-----
  const textMessage = useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.title} X ${product.qty} - $${parseCurrency(product.price * product.qty)}\n`), '')
      .concat(`\nTotal: $${parseCurrency(cart.reduce((total, product) => total + product.price * product.qty, 0))}`)
  }, [cart])

  const addToCart = (product) => {
    toast({
      title: 'Producto agregado.',
      description: product ? `Has agregado ${product.title} a tu carro` : '',
      status: 'success',
      duration: 1500,
      isClosable: true
    })

    const exist = cart.find(x => x.id === product.id)

    if (exist) {
      setCart(
        cart.map(item => item.id === product.id
          ? { ...exist, qty: item.qty + 1 }
          : item
        )
      )
    } else {
      setCart(cart => cart.concat(product))
    }
  }

  const productCard = (
    products
      .filter(el => el.title.toLowerCase().includes(prodSearch.toLowerCase()))
      .map(product => (
        <Stack data-test-id='product' spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor='gray.100'>
          <Image objectFit='cover' src={product.image} alt={product.title} />
          <Stack spacing={1}>
            <Text>{product.title}</Text>
            <Text fontSize='sm' fontWeight='500' color='green.500'>${parseCurrency(product.price)}</Text>
          </Stack>
          <Button
            size='sm'
            colorScheme='primary'
          // variant='outline'
            onClick={() => addToCart({ ...product, qty: 1 })}
          >
            Agregar
          </Button>
        </Stack>
      ))
  )

  return (
    <div>
      <Head>
        <title>Funko-pop Store</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container
        borderRadius='sm'
        maxWidth='1250px'
        padding={0}
      >
        <Navbar
          cart={cart}
          setCart={setCart}
          itemsInCart={itemsInCart}
          textMessage={textMessage}
        />

        <FormControl marginTop='10rem' overflow='hidden' borderRadius='0 0 10px 10px'>
          <FormLabel
            pointerEvents='none'
            color='primary.700'
            display='flex'
            borderRadius='10px 10px 0 0'
            padding={2}
            margin={0}
            fontWeight='bold'
            justifyContent='center'
            backgroundColor='primary.200'
          >
            Enviamos de Lunes a Viernes de 10 - 16hs.
          </FormLabel>

          <Search
            products={products}
            prodSearch={prodSearch}
            setProdSearch={setProdSearch}
          />

        </FormControl>
        <Grid
          // backgroundColor='white'
          margin='2rem 0'
          padding={3}
          gridGap={6}
          templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
        >
          {products && productCard.length > 0
            ? productCard
            : <Box textAlign='center' color='primary.700' backgroundColor='primary.100' padding={4} borderRadius='md'>No se encontraron productos</Box>}
        </Grid>
      </Container>
    </div>
  )
}
*/
