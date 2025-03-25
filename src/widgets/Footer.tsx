import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 6 }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Помощь
              </Typography>
              <Stack spacing={1}>
                <MuiLink
                  component={Link}
                  to="/about"
                  color="inherit"
                  underline="hover"
                >
                  О нас
                </MuiLink>
                <MuiLink
                  component={Link}
                  to="/delivery"
                  color="inherit"
                  underline="hover"
                >
                  Доставка
                </MuiLink>
                <MuiLink
                  component={Link}
                  to="/contacts"
                  color="inherit"
                  underline="hover"
                >
                  Контакты
                </MuiLink>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Соцсети
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  color="inherit"
                  href="https://facebook.com"
                  target="_blank"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="https://instagram.com"
                  target="_blank"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="https://twitter.com"
                  target="_blank"
                >
                  <Twitter />
                </IconButton>
              </Stack>
            </Box>
          </Stack>

          <Divider />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} PhotoPoint. Все права защищены.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
