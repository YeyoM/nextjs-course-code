import { Fragment } from 'react'
import fs from 'fs'
import path from 'path'

export default function productDetailPage(props) {

  const { loadedProduct } = props

  if(!loadedProduct) {
    return (
      <Fragment>
        <h4>Loading...</h4>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json') // cwd -> current working directory
  const jsonData = fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)
  return data
}

export async function getStaticProps(context) {
  const { params } = context
  const productId = params.pid

  const data = getData()

  const product = data.products.find(product => product.id === productId)
  
  if(!product) {
    return { notFound: true}
  }

  return {
    props: {
      loadedProduct: product
    }
  }
}

export async function getStaticPaths() {
  const data = getData()

  const ids = data.products.map(product => product.id)
  const params = ids.map(id => ({ params: { pid: id } }))

  return {
    paths: params,
    fallback: true
  }
}