import Devit from "components/Devit"
import { firestore } from "firebase/admin"
import { useRouter } from "next/router"

export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando</h1>

  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "EDLOOuBz3fDrnTXQNh1u" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = { id, ...data, createdAt: +createdAt.toDate() }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// export async function getServerSideProps(context) {
//   const { params, res } = context
//   const { id } = params

//   const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props }
//   }
//   if (res) {
//     res.writeHead(404).end()
//     // res.writeHead(301,{location:'/home'}).end()
//   }
// }

// DevitPage.getInitialProps = (context) => {
//   const { query, res } = context
//   const { id } = query

//   return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
//     if (apiResponse.ok) return apiResponse.json()
//     if (res) {
//       res.writeHead(404).end()
//       // res.writeHead(301,{location:'/home'}).end()
//     }
//   })
// }
