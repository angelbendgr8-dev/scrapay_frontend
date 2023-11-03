import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useAuth } from "app/state/hooks/auth.hooks";

const ProtectedRoute = (WrappedComponent: any) => {
  return function Auth(props: any) {
    const Router = useRouter();
    const toast = useToast();
    // const { token } = useAuth();
    const [token, setToken] = useState(true);
    const dispatch = useDispatch();

    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      if (!token) {
        Router.push(`/`);
      } else if (token) {
        // check if the token is expired
        // const decodedToken: any = jwtDecode(accessToken);
        // const currentTime = Date.now() / 1000;
        // if (decodedToken.exp < currentTime) {
        //   toast({
        //     title: "Session expired ",
        //     position: "top-right",
        //     status: "error",
        //     duration: 5000,
        //     isClosable: true,
        //   });
        // //   dispatch(logout());
        //   window.location.href = "/login";
        // }
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default ProtectedRoute;
