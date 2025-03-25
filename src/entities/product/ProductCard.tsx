import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Product } from "./Product.types";
import { useAppDispatch } from "../../app/redux/hooks";
import { addItemToCart } from "../../app/redux/slices/cartSlice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", p: 2, backgroundColor: "#f5f5f5" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component={Link}
          to={`/product/${product.id}`}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">${product.price.toFixed(2)}</Typography>
        <Button
          size="small"
          startIcon={<AddShoppingCart />}
          sx={{ whiteSpace: "nowrap" }}
          onClick={handleAddToCart}
        >
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
}
