const axios = require('axios')
const Papa = require('papaparse')

const api = async () => {
  const { data } = await axios.get(process.env.DB_HOST, {
    responseType: 'blob'
  })

  const dataParsed = Papa.parse(data, {
    header: true,
    complete: data,
    error: error => console.error(error.message)
  })

  return (
    dataParsed.data.map(products => ({
      ...products,
      price: Number(products.price),
      stock_quantity: Number(products.stock_quantity)
    }))
  )
}

// mock for ssr testing
/*
const mock = async (mock) => import(`./mocks/${mock}.json`)
  .then(res => res.default)
*/

module.exports = { api }
