import { Select } from '@chakra-ui/react'
import { useState } from 'react'

export default function SizeSelector () {
  const [sizeSelector, setSizeSelector] = useState('S')

  return (
    <Select
      isRequired
      onChange={({ target }) => setSizeSelector(target.value)}
      borderRadius='lg'
      alignItems='flex-end'
      width='auto'
      variant='filled'
      size='sm'
      placeholder='Tallas'
      value={sizeSelector}
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
