import { Grid, Box } from '@chakra-ui/react'
import Product from 'components/Product'

const getSearchProducts = (product, search) => product.filter(el => el.title.toLowerCase().includes(search.toLowerCase())) ?? []

export default function ProductList ({ products, cart, setCart, productSearch }) {
  const hasProductsFound = getSearchProducts(products, productSearch)

  return (
    <Grid
      marginY={8}
      padding={3}
      gridGap={6}
      templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
    >
      {products && hasProductsFound.length > 0
        ? hasProductsFound.map(product => (
          <Product
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
          />))
        : <Box textAlign='center' color='primary.700' bgColor='primary.100' padding={4} borderRadius='md'>No se encontraron productos</Box>}
    </Grid>
  )
}
