import { Select } from '@chakra-ui/react'

const NO_STOCK = 'Sin stock'

export default function SizeSelector ({ sizes, activeSize, onHandleSelector }) {
  return (
    <Select
      isRequired
      onChange={({ target }) => onHandleSelector(target.value)}
      borderRadius='lg'
      alignItems='flex-end'
      width='auto'
      variant='filled'
      size='sm'
      disabled={activeSize === NO_STOCK}
      placeholder='Tallas'
      value={activeSize}
      cursor='pointer'
    >
      {sizes.map(size => (
        <option key={size} value={size}>{size}</option>
      ))}
    </Select>
  )
}
