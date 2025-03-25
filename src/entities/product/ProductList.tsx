import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { ProductCard } from "../index";
import { useAppSelector } from "../../app/redux/hooks";
import { selectFilteredProducts } from "../../app/redux/slices/filterSlice";
import { useGetProductsQuery } from "../../app/redux/slices/apiSlice";

export const ProductList = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  const filteredProducts = useAppSelector((state) =>
    selectFilteredProducts(state, products)
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ py: 4 }}>
        Произошла ошибка при загрузке товаров
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6" gutterBottom>
        Найдено товаров: {filteredProducts.length}
      </Typography>

      {filteredProducts.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ py: 4 }}>
          Товары не найдены. Попробуйте изменить параметры поиска.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
