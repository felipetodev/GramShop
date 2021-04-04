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
  DrawerCloseButton
} from '@chakra-ui/react'

export default function DetailsModal ({ products = [], setCart }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

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
        <Text>{products.length}</Text>
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
                      <Text>{product.title}</Text>
                      <Text>{product.price}</Text>
                    </Stack>
                    <Button
                      onClick={() => console.log(product)}
                      leftIcon={
                        <Image src='https://icongr.am/fontawesome/trash-o.svg?size=26&color=333333' />
                      }
                    />
                  </Box>
                ))}
              </Stack>
            </DrawerBody>

            <Text>Total</Text>
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={() => setCart([])}>
                Vaciar carrito
              </Button>
              <Button colorScheme='blue'>Checkout</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
