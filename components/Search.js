import { Stack, InputGroup, Input, Select } from '@chakra-ui/react'

export default function Search ({ products, setProductSearch }) {
  const singleOptions = [...new Set(products.map(el => el.description))]

  return (
    <Stack spacing={4}>
      <InputGroup backgroundColor='gray.100'>
        <Input
          type='text'
          placeholder='Buscar...'
          borderRadius='none'
          onChange={(e) => setProductSearch(e.target.value)}
        />
        <Select
          onChange={(e) => setProductSearch(e.target.value)}
          textTransform='capitalize'
          placeholder='Categorías'
          width='200px'
          borderRadius='none'
        >
          {singleOptions.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </Select>
      </InputGroup>
    </Stack>
  )
}
