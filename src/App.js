import { Outlet } from "react-router-dom";

// Components
import { Box } from "@chakra-ui/react";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";

// styles
import "./App.css";

/**
 * 1. 3 pages vix, Listing, Reading, Add/Edit
 * 2. Each article on Listing page -> Title, some content, Cover image, Date and Created by
 * 3. Allow adding, editing an article
 * 4. Header with search bar and logo
 * 5. Login, Logout, Signup
 * 6. Footer
 */
function App() {
  return (
    <>
      <Header />
      {/* slot for child start */}
      <Box p={"10"}>
        <Outlet />
      </Box>
      {/* slot for child end */}
      <Footer />
    </>
  );
}

export default App;
