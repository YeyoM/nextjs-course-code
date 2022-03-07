import fs from 'fs'
import path from 'path'

import Link from 'next/link'

export default function HomePage(props) {
  
  const { products } = props

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}><Link href={`/single-products/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  )
}

export async function getStaticProps(context) {

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json') // cwd -> current working directory
  const jsonData = fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)

  return {
    props: {
      products: data.products,
    },
    // ISR
    revalidate: 60  // to re generate the content
                    // this will only take effect on prod
  }
}