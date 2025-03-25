import { ProductList } from "../entities";
import { ProductFilters } from "../features";

export function HomePage() {
  return (
    <>
      <ProductFilters />
      <ProductList />
    </>
  );
}
