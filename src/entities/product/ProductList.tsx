import { ProductCard } from "@/entities/Product/ui/ProductCard";
import { Grid2 } from "@mui/material";
export function ProductList() {
  const { data: products } = useGetProductsQuery();

  return (
    <Grid2 container spacing={3}>
      {products?.map((product) => (
        <Grid2 item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
}
