import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()

  return (
    <div>
      Produto {query.id}
    </div>
  )
}