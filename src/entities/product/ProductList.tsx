import { useGetProductsQuery } from "../../app/store/slices/apiSlice";
import { ProductCard } from "../index";

export function ProductList() {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({
    limit: 10,
    sort: "desc",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;
  if (!products || products.length === 0) return <div>No products found</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
