import { Link } from "@chakra-ui/react";
import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";
import { RiLogoutCircleRFill } from "react-icons/ri";
import {
  FaBox,
  FaRegComments,
  FaRegUserCircle,
  FaDigitalTachograph,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  route: string;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: "BookList", icon: FaBox, route: "/books" },
];
export const NavItem = ({ route, icon, children, ...rest }: NavItemProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    router.push("/login");
  };
  const handleRedirect = async () => {
    if (route.includes("/logout")) {
      handleSignOut();
    } else {
      console.log(route);
      router.push(route);
    }
  };

  return (
    <Link
      onClick={handleRedirect}
      position={"relative"}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      _before={
        router.pathname === route
          ? {
              content: "''",
              width: 5,
              rounded: "lg",
              height: 10,
              // zIndex:-5,
              backgroundColor: "white",
              position: "absolute",
              right: 1,
              top: 0,
              bottom: 0,
              margin: "auto",
            }
          : {}
      }
    >
      <Flex
        align="center"
        p="4"
        my={{
          base: 2,
        }}
        mx="auto"
        borderRadius="lg"
        role="group"
        color={router.pathname.includes(route) ? "white" : "black"}
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="24"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
