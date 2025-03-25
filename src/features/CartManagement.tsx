import { Box, Typography, Button } from "@mui/material";
import {
  selectCartTotalQuantity,
  selectCartTotalAmount,
  clearCart,
} from "../app/redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/redux/hooks";

export const CartManagement = () => {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalAmount = useAppSelector(selectCartTotalAmount);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Итоговая сумма
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>Товаров:</Typography>
        <Typography>{totalQuantity}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="subtitle1">Всего:</Typography>
        <Typography variant="subtitle1">${totalAmount.toFixed(2)}</Typography>
      </Box>

      <Button variant="contained" fullWidth sx={{ mb: 2 }}>
        Оформить заказ
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => dispatch(clearCart())}
      >
        Очистить корзину
      </Button>
    </Box>
  );
};
