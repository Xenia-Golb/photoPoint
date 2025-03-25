import { Box, Typography, Container } from "@mui/material";
import { selectCartItems } from "../app/redux/slices/cartSlice";
import { useAppSelector } from "../app/redux/hooks";
import { CartItem } from "../entities";
import { CartManagement } from "../features/index";

export const CartPage = () => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Корзина
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Ваша корзина пуста</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>

          <Box sx={{ width: { xs: "100%", md: 350 } }}>
            <CartManagement />
          </Box>
        </Box>
      )}
    </Container>
  );
};
