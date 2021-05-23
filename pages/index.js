import { useState } from 'react'
import Head from 'next/head'
import { Grid, Container, FormLabel, FormControl } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Search from 'components/Search'
import ProductsCards from 'components/ProductsCards'
import { itemsInCart } from 'helpers'
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
        maxWidth='1250px'
        padding={0}
      >
        <Navbar
          cart={cart}
          setCart={setCart}
          itemsInCart={itemsInCart}
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
            {APP.schedule}
          </FormLabel>

          <Search
            products={products}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
          />

        </FormControl>
        <Grid
          margin='2rem 0'
          padding={3}
          gridGap={6}
          templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
        >
          <ProductsCards products={products} cart={cart} setCart={setCart} productSearch={productSearch} />
        </Grid>
      </Container>
    </div>
  )
}

export async function getStaticProps () {
  const { api } = require('../products/api')
  const products = await api()

  return {
    revalidate: 5,
    props: {
      products
    }
  }
}
