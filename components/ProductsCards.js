
import { useState } from 'react'
import { Grid, Box, useToast, Button, Stack, Image, Text, HStack } from '@chakra-ui/react'
import { parseCurrency, addToCart, TOAST_SELECTOR } from 'helpers'
import SizeSelector from 'components/SizeSelector'

export default function ProductsCards ({ products, cart, setCart, productSearch }) {
  const [sizeSelector, setSizeSelector] = useState('')
  const toast = useToast()
  const handleClick = (product) => {
    setCart(addToCart(product, cart))
    toast(TOAST_SELECTOR.addToCart(product))
    setSizeSelector('')
  }

  const productList = (
    products
      .filter(el => el.title.toLowerCase().includes(productSearch.toLowerCase()))
      .map(product => (
        <Stack justifyContent='space-between' data-test-id='product' spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor='gray.100'>
          <Image loading='lazy' src={product.image} alt={product.title} h={300} objectFit='cover' />
          <Stack spacing={1}>
            <Text>{product.title}</Text>
            <HStack>
              <Text fontSize='sm' fontWeight='500' color='green.500'>${parseCurrency(product.price)}</Text>
              <SizeSelector sizeSelector={sizeSelector} setSizeSelector={setSizeSelector} />
            </HStack>
          </Stack>
          <Button
            size='sm'
            colorScheme='primary'
            onClick={() => sizeSelector
              ? handleClick({ ...product, qty: 1, size: Array(sizeSelector) })
              : toast(TOAST_SELECTOR.addProductWithoutSize())}
          >
            Agregar
          </Button>
        </Stack>
      ))
  )

  return (
    <Grid
      margin='2rem 0'
      padding={3}
      gridGap={6}
      templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
    >
      {products && productList.length > 0
        ? productList
        : <Box textAlign='center' color='primary.700' bgColor='primary.100' padding={4} borderRadius='md'>No se encontraron productos</Box>}
    </Grid>
  )
}
