import { useRef } from 'react'
import {
  Box,
  Text,
  Stack,
  Image,
  Button,
  useToast,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link
} from '@chakra-ui/react'
import { totalCheckout, parseCurrency } from 'helpers'

export default function DetailsModal ({ products = [], setCart, itemsInCart, textMessage }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const toast = useToast()

  const deleteItem = (product) => {
    const exist = products.find(x => x.id === product.id)

    if (exist.qty > 1) {
      setCart(
        products.map(item => item.id === product.id
          ? { ...exist, qty: item.qty - 1 }
          : item
        )
      )
    } else {
      setCart(
        products.filter(item => !Array(exist).includes(item))
      )
    }
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

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme='orange'
        onClick={handleClick}
        leftIcon={
          <Image src='https://icongr.am/fontawesome/shopping-cart.svg?size=32&color=ffffff' />
        }
      >
        <Text>({itemsInCart(products)})</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Productos añadidos</DrawerHeader>

            <DrawerBody>
              <Stack spacing='24px'>
                {products.map(product => (
                  <Box key={product.id} display='flex' justifyContent='space-between'>
                    <Stack>
                      <Text>{product.title} x {product.qty}</Text>
                      <Text>${parseCurrency(product.price * product.qty)}</Text>
                    </Stack>
                    <Button
                      onClick={() => deleteItem(product)}
                      leftIcon={
                        <Image src='https://icongr.am/fontawesome/trash-o.svg?size=26&color=333333' />
                      }
                    />
                  </Box>
                ))}
              </Stack>
            </DrawerBody>

            <Text>Total ${parseCurrency(totalCheckout(products))}</Text>
            <DrawerFooter>
              <Button
                variant='outline'
                mr={3}
                onClick={() => setCart([])}
              >
                Vaciar carrito
              </Button>
              <Button
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
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
