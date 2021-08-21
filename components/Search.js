import { Stack, InputGroup, Input, Select } from '@chakra-ui/react'

export default function Search ({ products, setProductSearch }) {
  const singleOptions = [...new Set(products.map(el => el.description))]

  return (
    <Stack spacing={4}>
      <InputGroup backgroundColor='gray.100'>
        <Input
          borderRadius='0 0 0 10px'
          type='text'
          placeholder='Buscar...'
          onChange={(e) => setProductSearch(e.target.value)}
          fontSize={{ base: 13, sm: 16 }}
        />
        <Select
          onChange={(e) => setProductSearch(e.target.value)}
          textTransform='capitalize'
          placeholder='Categorías'
          borderRadius='0 0 10px 0'
          width='200px'
          cursor='pointer'
          fontSize={{ base: 13, sm: 16 }}
        >
          {singleOptions.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </Select>
      </InputGroup>
    </Stack>
  )
}
