import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Product } from "../../app/store/slices/apiSlice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
        >
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
}
