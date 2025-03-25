import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import { AddShoppingCart, FavoriteBorder, Favorite } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addToCart } from "@/app/store/slices/cartSlice";
import { toggleFavorite } from "@/app/store/slices/productsSlice";
import { Product } from "@/app/store/slices/apiSlice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  //   const dispatch = useAppDispatch();
  //   const favorites = useAppSelector((state) => state.products.favorites);
  //   const isFavorite = favorites.includes(product.id);

  //   const handleAddToCart = () => {
  //     dispatch(
  //       addToCart({
  //         id: product.id,
  //         title: product.title,
  //         price: product.price,
  //         image: product.image,
  //         quantity: 1,
  //       })
  //     );
  //   };

  //   const handleToggleFavorite = () => {
  //     dispatch(toggleFavorite(product.id));
  //   };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: "contain",
            p: 2,
            backgroundColor: "#f5f5f5",
          }}
        />
        <IconButton
          aria-label="add to favorites"
          //   onClick={handleToggleFavorite}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          {/* {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />} */}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component={Link}
          to={`/product/${product.id}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "64px",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {product.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={product.category}
            size="small"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
          />
          <Chip
            label={`${product.rating.rate} ★`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<AddShoppingCart />}
          //   onClick={handleAddToCart}
          sx={{ whiteSpace: "nowrap" }}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
}
