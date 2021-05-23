import StoreScreen from 'products/screens/Store'

export default function IndexRoute ({ products }) {
  return <StoreScreen products={products} />
}

export async function getStaticProps ({ params }) {
  const { mock } = require('../products/api')
  const products = await mock(params.mock)

  return {
    revalidate: 5,
    props: {
      products
    }
  }
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: process.env.NODE_ENV === 'production'
      ? false
      : 'blocking'
  }
}
