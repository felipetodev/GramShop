export const itemsInCart = (items) => {
  return items.map(item => item.qty).reduce((prev, next) => prev + next, 0)
}

export const parseCurrency = (value) => {
  const numberFormat = new Intl.NumberFormat('en-US')

  return numberFormat.format(value).replace(',', '.')
}

export const totalCheckout = (number) => {
  return number.reduce((total, product) => total + product.price * product.qty, 0)
}

export const getCartResume = (cart) => {
  return cart
    .reduce((message, product) => message.concat(`* ${product.title} X ${product.qty} - $${parseCurrency(product.price * product.qty)}\n`), '')
    .concat(`\nTotal: $${parseCurrency(cart.reduce((total, product) => total + product.price * product.qty, 0))}`)
}

export const addToCart = (product, cart) => {
  const exist = cart.find(x => x.id === product.id)

  if (exist) {
    return cart.map(item => item.id === product.id
      ? { ...exist, qty: item.qty + 1, size: item?.size?.concat(product.size) }
      : item
    )
  } else {
    return cart => cart.concat(product)
  }
}

export const handleQuantity = (product, action, cart) => {
  const exist = cart.find(x => x.id === product.id)
  const actionQuantity = (action, item) => {
    if (action === 'decrement') return item.qty - 1
    if (action === 'increment') return item.qty + 1
  }

  if (action === 'decrement') {
    if (exist.qty === 1) {
      return cart.filter(item => !Array(exist).includes(item))
    }
  }
  if (action === 'increment') {
    if (exist.qty === 1) {
      return cart
        .map(item => item.id === product.id
          ? { ...exist, qty: actionQuantity(action, item) }
          : item
        )
    }
  }
  if (exist.qty > 1) {
    return cart
      .map(item => item.id === product.id
        ? { ...exist, qty: actionQuantity(action, item) }
        : item
      )
  }
}

/* TOAST NOTIFICATION DICTIONARY */
export const TOAST_SELECTOR = {
  addToCart: (product) => ({
    title: 'Producto agregado.',
    description: product ? `Has agregado ${product.title} a tu carro` : '',
    position: 'top-right',
    status: 'success',
    duration: 1500,
    isClosable: true
  }),
  addProductWithoutSize: () => ({
    title: 'Selecciona una talla',
    description: 'Elige una talla antes de añadir al carrito',
    status: 'error',
    duration: 1500,
    isClosable: true
  }),
  openDrawerWithoutProducts: () => ({
    title: 'No tienes productos',
    description: 'Agrega productos a tu carrito.',
    position: 'top-right',
    duration: 1500,
    isClosable: true
  })
}
