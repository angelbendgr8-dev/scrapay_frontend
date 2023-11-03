import { useState } from "react";
import { Box } from "@chakra-ui/react";
import ProtectedRoute from "./ProtectedRoute";
import { useDispatch } from "react-redux";
import { HomeLayoutProps } from "app/interfaces/app.interface";

const HomeLayout = ({ children, upload, toggleView }: HomeLayoutProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  return (
    <Box
      maxH={toggleView ? "" : "100vh"}
      maxW={"100vw"}
      w="100vw"
      h={toggleView ? "" : "100vh"}
      onClick={() => setShowSuggestions(false)}
    >
      {children}
    </Box>
  );
};

export default ProtectedRoute(HomeLayout);
