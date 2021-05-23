import { useEffect, useMemo, useRef } from 'react'
import {
  Text,
  Stack,
  Image,
  Button,
  useToast,
  useDisclosure,
  List,
  ListItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Divider,
  HStack
} from '@chakra-ui/react'
import { totalCheckout, parseCurrency, getCartResume, handleQuantity } from 'helpers'

export default function DetailsModal ({ products = [], setCart, itemsInCart }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const toast = useToast()

  const textMessage = useMemo(() => {
    return getCartResume(products)
  }, [products])

  useEffect(() => {
    if (products.length === 0) return onClose()
  }, [products])

  const handleQuantitySelector = (product, action, products) => {
    setCart(handleQuantity(product, action, products))
  }

  const handleClick = () => {
    if (products.length) {
      onOpen()
    } else {
      toast({
        title: 'No tienes productos',
        description: 'Agrega productos a tu carrito.',
        position: 'top-right',
        isClosable: true
      })
    }
  }

  const handleEmptyCart = () => {
    setCart([])
    onClose()
  }

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme='primary'
        onClick={handleClick}
        leftIcon={
          <Image src='https://icongr.am/fontawesome/shopping-cart.svg?size=32&color=ffffff' />
        }
      >
        <Text>({itemsInCart(products)})</Text>
      </Button>
      <Drawer
        size='sm'
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize='2xl'>Productos añadidos</DrawerHeader>

            <DrawerBody>
              <List spacing={5}>
                {products.map(product => (
                  <ListItem key={product.id}>
                    <Stack>
                      {product.stock_quantity === 0 &&
                        <Text fontSize='xs' borderRadius='lg' width='max-content' padding={1} backgroundColor='red.200'>Importante: Este podroducto no tiene entrega inmediata</Text>}
                      <HStack justifyContent='space-between'>
                        <Text fontWeight={500}>
                          {product.title}
                          {' '}
                          {product.size.map((item, idx) => (
                            <span key={`${idx}-talla-${item}`}>({item}) </span>
                          ))}
                        </Text>
                        <Text color='primary.400'>${parseCurrency(product.price * product.qty)}</Text>
                      </HStack>
                      <HStack spacing={3} alignSelf='flex-start'>
                        <Button colorScheme='whatsapp' size='xs' onClick={() => handleQuantitySelector(product, 'decrement', products)}>-</Button>
                        <Text>{product.qty}</Text>
                        <Button colorScheme='whatsapp' size='xs' onClick={() => handleQuantitySelector(product, 'increment', products)}>+</Button>
                      </HStack>
                      <Divider pt={1} />
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </DrawerBody>

            <Divider />

            <DrawerFooter display='table-column'>
              <Stack fontWeight='bold' marginBottom={4} direction='row' justifyContent='space-between'>
                <Text color='primary.700'>Total</Text>
                <Text>${parseCurrency(totalCheckout(products))}</Text>
              </Stack>
              <Stack direction='row'>
                <Button
                  width='xl'
                  size='lg'
                  variant='outline'
                  mr={3}
                  onClick={handleEmptyCart}
                >
                  Vaciar carrito
                </Button>
                <Button
                  width='xl'
                  size='lg'
                  colorScheme='whatsapp'
                  as={Link}
                  isExternal
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent(textMessage)}`}
                  leftIcon={
                    <Image src='https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff' />
                }
                >
                  Checkout
                </Button>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
