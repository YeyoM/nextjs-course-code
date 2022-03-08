import useSWR from 'swr'
import { Fragment, useEffect, useState } from 'react'

export default function LastSalesPage() {

  const [sales, setSales] = useState([])
  
  const fetcher = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR('https://nextjs-course-yeyo-default-rtdb.firebaseio.com/sales.json', fetcher);


  useEffect(() => {
    if (data) {
      const transformedSales = []
      for(const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        })
      }
      setSales(transformedSales)
    }
  }, [data])

  if (error) {
    return <p>Failed to load</p>
  }

  if (!data || !sales) {
    return <p>Loading...</p>
  }

  console.log(data)

  return (
    <Fragment>
      <ul>
        {
          sales.map(sale => (
            <li key={sale.id}>
              {sale.username} - ${sale.volume}
            </li>
          ))
        }
      </ul>
    </Fragment>
  )
}