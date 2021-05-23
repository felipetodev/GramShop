
import { useState } from 'react'
import { Box, useToast, Button, Stack, Text, Image, HStack } from '@chakra-ui/react'
import { parseCurrency, addToCart } from 'helpers'
import SizeSelector from 'components/SizeSelector'

export default function ProductsCards ({ products, cart, setCart, productSearch }) {
  const [selector, setSelector] = useState('')
  const toast = useToast()
  const handleClick = (product) => {
    setCart(addToCart(product, cart))
    setSelector('')
    toast({
      title: 'Producto agregado.',
      description: product ? `Has agregado ${product.title} a tu carro` : '',
      status: 'success',
      duration: 1500,
      isClosable: true
    })
  }

  const productList = (
    products
      .filter(el => el.title.toLowerCase().includes(productSearch.toLowerCase()))
      .map(product => (
        <Stack data-test-id='product' spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor='gray.100'>
          <Image objectFit='cover' src={product.image} alt={product.title} />
          <Stack spacing={1}>
            <Text>{product.title}</Text>
            <HStack>
              <Text fontSize='sm' fontWeight='500' color='green.500'>${parseCurrency(product.price)}</Text>
              <SizeSelector selector={selector} setSelector={setSelector} />
            </HStack>
          </Stack>
          <Button
            size='sm'
            colorScheme='primary'
            onClick={() => selector
              ? handleClick({ ...product, qty: 1, size: Array(selector) })
              : toast({
                title: 'Selecciona una talla',
                description: 'Elige una talla antes de añadir al carrito',
                status: 'error',
                isClosable: true
              })}
          >
            Agregar
          </Button>
        </Stack>
      ))
  )

  return (
    <>
      {products && productList.length > 0
        ? productList
        : <Box textAlign='center' color='primary.700' bgColor='primary.100' padding={4} borderRadius='md'>No se encontraron productos</Box>}
    </>
  )
}
