import Link from "next/link";

export function ProductContainer({
  products,
}: {
  products: {
    id: number;
    name: string;
  }[];
}) {
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="flex  gap-2">
            <p>{product.name}</p>
            <Link href={"/demo/products/" + product.id}>รายละเอียด</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
