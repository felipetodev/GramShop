import { useState, useMemo } from 'react'
import Head from 'next/head'
import api from 'products/api'
import { Flex, Button, Grid, Link, Stack, Text, Image } from '@chakra-ui/react'
import DetailsModal from 'components/DetailsModal'

export default function Home ({ products }) {
  const [cart, setCart] = useState([])

  console.log(cart)
  // console.log(products.map(product => ({ ...product, qty: 0 })))

  // formatear bien moneda CLP (componetizar)
  const parseCurrency = (value) => {
    return value.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CHL'
    })
  }

  // Componetizar Checkout Format <-----
  const textMessage = useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), '')
      .concat(`\nTotal: $${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
  }, [cart])

  const addToCart = (product) => {
    setCart(cart => cart.concat(product))

    const exist = cart.find(x => x.id === product.id)

    if (exist) {
      console.log('Tengo que agruparlo')
      setCart(
        cart.map(item => item.id === product.id
          ? { ...exist, qty: item.qty + 1 } // como puedo indentificar un qty?
          : item
        )
      )
    } else {
      console.log('Primera vez añadido')
    }
  }

  return (
    <div>
      <Head>
        <title>Tiendita Gram</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
          {products.map(product => (
            <Stack spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor='gray.100'>
              <Image objectFit='cover' src={product.image} alt={product.title} />
              <Stack spacing={1}>
                <Text>{product.title}</Text>
                <Text fontSize='sm' fontWeight='500' color='green.500'>{parseCurrency(product.price)}</Text>
              </Stack>
              <Button
                size='sm'
                colorScheme='primary'
                variant='outline'
                onClick={() => addToCart({ ...product, qty: 1 })}
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        {cart.length &&
          <Flex bottom={0} padding={4} justifyContent='center' position='sticky'>
            <Button
              width='fit-content'
              isExternal
              as={Link}
              colorScheme='whatsapp'
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent(textMessage)}`}
              leftIcon={
                <Image src='https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff' />
              }
              size='lg'
            >
              Ver carrito ({cart.length} productos)
            </Button>
          </Flex>}
      </Stack>

      <DetailsModal products={cart} setCart={setCart} />
    </div>
  )
}

export async function getStaticProps () {
  const products = await api()

  return {
    revalidate: 10,
    props: {
      products
    }
  }
}
