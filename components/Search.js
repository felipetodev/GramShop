import { Stack, InputGroup, Input, Select } from '@chakra-ui/react'

export default function Search ({ products }) {
  return (
    <Stack spacing={4}>
      <InputGroup backgroundColor='gray.100'>
        <Select placeholder='Categorías' width='200px' borderRadius='none'>
          {products.map(({ id, description }) => (
            <option key={id} value='1'>{description}</option>
          ))}
        </Select>
        <Input type='text' placeholder='Buscar...' borderRadius='none' />
      </InputGroup>
    </Stack>
  )
}
