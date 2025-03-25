import { Box } from "@mui/material";
import { Header } from "../../../widgets/Header";
import { Footer } from "../../../widgets/Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
