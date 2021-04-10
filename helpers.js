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
