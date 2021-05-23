import { Select } from '@chakra-ui/react'

export default function SizeSelector ({ selector, setSelector }) {
  return (
    <Select
      isRequired
      onChange={(e) => setSelector(e.target.value)}
      borderRadius='lg'
      alignItems='flex-end'
      width='auto' variant='filled'
      size='sm'
      placeholder='Tallas'
      value={selector}
      cursor='pointer'
    >
      <option value='S'>S</option>
      <option value='M'>M</option>
      <option value='L'>L</option>
      <option value='XL'>XL</option>
      <option value='XXL'>XXL</option>
    </Select>
  )
}
