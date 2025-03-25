import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export function ErrorPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Упс! Что-то пошло не так
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
      >
        Вернуться на главную
      </Button>
    </Container>
  );
}
