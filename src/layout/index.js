import { Box } from "../components/Box";
import Navbar from "./Navbar";

export const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    <Navbar />
    {children}
  </Box>
);
