import { ReactNode, useEffect, useRef, useState } from "react";
import { Box, useDimensions, useDisclosure, useTheme } from "@chakra-ui/react";

import { IconType } from "react-icons";
import { SidebarContent } from "./Sidebar";
import { MobileNav } from "./MobileNav";

import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useUser } from "@auth0/nextjs-auth0/client";


const AppLayouts = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useUser();
  const elementRef = useRef();
  //@ts-ignore
  const dimensions = useDimensions(elementRef);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const btnRef = useRef();
  const { breakpoints } = theme;
  useEffect(() => {}, [dimensions]);

  useEffect(() => {
    if (isEmpty(user)) {
      router.push("/");
    }
  }, [dispatch]);

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen:
      dimensions && dimensions.borderBox.width < 768 ? false : true,
  });
  return (
    <Box>
      <Box
        //@ts-ignore
        ref={elementRef}
        zIndex={200}
        position={"fixed"}
        bg={"secondary.100"}
      >
        <MobileNav isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        {isOpen && <SidebarContent onClose={onClose} />}
      </Box>

      <Box
        ml={{
          base: 0,
          md: isOpen ? 0 : 0,
          lg: isOpen ? 240 : 0,
          xl: isOpen ? 230 : 0,
        }}
        p="4"
        bg="secondary.100"
      >
        {children}
      </Box>
    </Box>
  );
};
export default AppLayouts;
