import { AppBar, Toolbar, Typography, Button, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          PhotoPoint
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/cart"
          startIcon={
            <Badge color="secondary">
              <ShoppingCartIcon />
            </Badge>
          }
          sx={{
            ml: { xs: 0, md: 2 },
            "& .MuiBadge-badge": {
              right: -5,
              top: 5,
            },
          }}
        >
          <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
            Корзина
          </Box>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
