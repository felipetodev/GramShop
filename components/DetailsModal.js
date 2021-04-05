import { useRef } from 'react'
import {
  Box,
  Text,
  Stack,
  Image,
  Button,
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

export default function DetailsModal ({ products = [], setCart, itemsInCart, textMessage }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const totalCheckout = (number) => {
    return number.reduce((total, product) => total + product.price * product.qty, 0)
  }

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

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme='teal'
        onClick={onOpen}
        leftIcon={
          <Image src='https://icongr.am/fontawesome/shopping-cart.svg?size=32&color=ffffff' />
        }
      >
        <Text>{itemsInCart(products)}</Text>
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
                      <Text>${product.price * product.qty}</Text>
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

            <Text>Total ${totalCheckout(products)}</Text>
            <DrawerFooter>
              <Button
                variant='outline'
                mr={3}
                onClick={() => setCart([])}
              >
                Vaciar carrito
              </Button>
              <Button
                colorScheme='blue'
                as={Link}
                isExternal
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent(textMessage)}`}
              >Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
