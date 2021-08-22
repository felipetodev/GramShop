import { parseCurrency, addToCart, TOAST_SELECTOR } from 'helpers'
import SizeSelector from 'components/SizeSelector'
import { Text, Button, HStack, Image, Stack, useToast } from '@chakra-ui/react'

export default function Product ({ product, cart, setCart }) {
  const toast = useToast()

  const handleClick = (product) => {
    const newCart = addToCart(product, cart)
    setCart(newCart)
    toast(TOAST_SELECTOR.addToCart(product))
  }

  return (
    <Stack justifyContent='space-between' data-test-id='product' spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor='gray.100'>
      <Image loading='lazy' src={product.image} alt={product.title} h={300} objectFit='cover' />
      <Stack spacing={1}>
        <Text>{product.title}</Text>
        <HStack>
          <Text fontSize='sm' fontWeight='500' color='green.500'>${parseCurrency(product.price)}</Text>
          <SizeSelector />
        </HStack>
      </Stack>
      <Button
        size='sm'
        colorScheme='primary'
        // TODO -> FIX STATE OF SIZE SELECTOR
        onClick={() => handleClick({ ...product, qty: 1 /* size: Array(size) */ })}
      >
        Agregar
      </Button>
    </Stack>
  )
}
