import { Fragment } from 'react'

export default function UserProfilePage(props) {
  return (
    <Fragment>
      <h1>{props.username}</h1>
    </Fragment>
  )
}

export async function getServerSideProps(context) {

  const {req, res} = context

  return {
    props: {
      username: 'Yeyo'
    }
  }
}