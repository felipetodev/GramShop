import { useState } from 'react'
import Head from 'next/head'
import { Container, FormLabel, FormControl } from '@chakra-ui/react'
import Search from 'components/Search'
import ProductsCards from 'components/ProductsCards'
import Header from 'components/Header'
import Checkout from 'components/Checkout'
import { useSessionStorage } from 'hooks/useSessionStorage'
import { APP } from 'app/constants'

export default function Home ({ products }) {
  const [cart, setCart] = useSessionStorage('CART_STORAGE', [])
  const [productSearch, setProductSearch] = useState('')

  return (
    <div>
      <Head>
        <title>Angle Chile || Camisetas 👕</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container
        borderRadius='sm'
        maxWidth='container.xl'
        padding={{ base: 0, sm: 3 }}
      >
        <Header />
        <FormControl borderRadius='0 0 10px 10px'>
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
            fontSize={{ base: 14, sm: 16 }}
          >
            {APP.schedule}
          </FormLabel>

          <Search
            products={products}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
          />

        </FormControl>

        <ProductsCards products={products} cart={cart} setCart={setCart} productSearch={productSearch} />

        <Checkout cart={cart} setCart={setCart} />
      </Container>
    </div>
  )
}

export async function getStaticProps () {
  const { api } = require('../products/api')
  const products = await api()

  return {
    revalidate: 10,
    props: {
      products
    }
  }
}
