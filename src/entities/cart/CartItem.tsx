import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem as CartItemType } from "./CartItem.types";
import { useAppDispatch } from "../../app/redux/hooks";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "../../app/redux/slices/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(
        updateItemQuantity({
          id: item.id,
          quantity: newQuantity,
        })
      );
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          sx={{
            width: 80,
            height: 80,
            objectFit: "contain",
            bgcolor: "background.paper",
            p: 1,
            borderRadius: 1,
          }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">{item.title}</Typography>
          <Typography variant="body1" color="text.secondary">
            ${item.price.toFixed(2)}
          </Typography>
        </Box>

        <TextField
          size="small"
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          inputProps={{ min: 1 }}
          sx={{ width: 80 }}
        />

        <Typography
          variant="subtitle1"
          sx={{ minWidth: 80, textAlign: "right" }}
        >
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>

        <IconButton
          onClick={() => dispatch(removeItemFromCart(item.id))}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};
