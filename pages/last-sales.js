import useSWR from 'swr'
import { Fragment, useEffect, useState } from 'react'

export default function LastSalesPage() {

  const [sales, setSales] = useState([])
  
  const { data, error } = useSWR('https://nextjs-course-yeyo-default-rtdb.firebaseio.com/sales.json')

  if (error) {
    return <p>Failed to load</p>
  }

  if (!data || !sales) {
    return <p>Loading...</p>
  }

  useEffect(() => {
    if (data) {
      const transformedSales = []
      for(const key in data) {
        transformedSales.push({
          id: Key,
          username: data[key].username,
          volume: data[key].volume
        })
      }
      setSales(transformedSales)
    }
  }, [])

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