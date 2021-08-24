import { useEffect, useMemo, useRef } from 'react'
import {
  Text,
  Stack,
  Flex,
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
import { totalCheckout, itemsInCart, parseCurrency, getCartResume, handleQuantity, TOAST_SELECTOR } from 'helpers'

const EMPTY_CART = []

export default function DetailsModal ({ cart = [], setCart }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const toast = useToast()

  const textMessage = useMemo(() => {
    return getCartResume(cart)
  }, [cart])

  useEffect(() => {
    if (cart.length === 0) return onClose()
  }, [cart])

  const handleQuantitySelector = (product, action, cart) => {
    setCart(handleQuantity(product, action, cart))
  }

  const handleOpenCart = () => {
    cart.length
      ? onOpen()
      : toast(TOAST_SELECTOR.openDrawerWithoutProducts())
  }

  const handleEmptyCart = () => {
    setCart(EMPTY_CART)
    onClose()
  }

  return (
    <>
      {Boolean(cart.length) && (
        <Flex alignItems='center' bottom={4} justifyContent='center' position='sticky'>
          <Button
            boxShadow='xl'
            colorScheme='primary'
            data-testid='show-cart'
            size='lg'
            width={{ base: '100%', sm: 'fit-content' }}
            onClick={handleOpenCart}
          >
            <Stack alignItems='center' direction='row' spacing={6}>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Text fontSize='md' lineHeight={6}>
                  Ver pedido
                </Text>
                <Text
                  backgroundColor='rgba(0,0,0,0.25)'
                  borderRadius='sm'
                  color='gray.100'
                  fontSize='xs'
                  fontWeight='500'
                  paddingX={2}
                  paddingY={1}
                >
                  {itemsInCart(cart)} items
                </Text>
              </Stack>
              <Text fontSize='md' lineHeight={6}>
                ${parseCurrency(totalCheckout(cart))}
              </Text>
            </Stack>
          </Button>
        </Flex>)}

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
                {cart.map(product => (
                  <ListItem key={product.id}>
                    <Stack>
                      {product.stock_quantity === 0 &&
                        <Text fontSize='xs' borderRadius='lg' width='max-content' padding={1} backgroundColor='red.200'>Importante: Este podroducto no tiene entrega inmediata</Text>}
                      <HStack justifyContent='space-between'>
                        <Text fontWeight={500}>
                          {product.title}
                          {' '}
                          {product?.selectedSize?.map((item, idx) => (
                            <span key={`${idx}-talla-${item}`}>({item}) </span>
                          ))}
                        </Text>
                        <Text color='primary.400'>${parseCurrency(product.price * product.qty)}</Text>
                      </HStack>
                      <HStack spacing={3} alignSelf='flex-start'>
                        <Button colorScheme='whatsapp' size='xs' onClick={() => handleQuantitySelector(product, 'decrement', cart)}>-</Button>
                        <Text>{product.qty}</Text>
                        <Button colorScheme='whatsapp' size='xs' onClick={() => handleQuantitySelector(product, 'increment', cart)}>+</Button>
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
                <Text>${parseCurrency(totalCheckout(cart))}</Text>
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
                  w='xl'
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
