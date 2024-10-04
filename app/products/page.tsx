import { products } from '../lib/data'

export default function Page() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Product Page</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
          </div>
        )
      })}
    </main>
  )
}
