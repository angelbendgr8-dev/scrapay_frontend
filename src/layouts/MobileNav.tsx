import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";

interface MobileProps extends FlexProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}
export const MobileNav = ({
  onOpen,
  onClose,
  isOpen,
  ...rest
}: MobileProps) => {
  const dispatch = useDispatch();

  const { user } = useUser();
  const router = useRouter();
  console.log(user);

  const handleSignOut = async () => {
    router.push("/");
  };
  return (
    <Flex
      ml={{
        base: "1%",
        lg: isOpen ? 250 : 0,
        xl: isOpen ? 235 : 0,
      }}
      //   px={8}
      transition="all 0.3s"
      mr={{ base: 4, md: 4 }}
      height="20"
      position={"fixed"}
      zIndex={100}
      width={{
        base: "98%",
        lg: isOpen ? "82%" : "100%",
      }}
      alignItems="center"
      bg={"secondary.100"}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.200")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <Flex dir={"row"} align={"center"}>
        <IconButton
          onClick={isOpen ? onClose : onOpen}
          variant="outline"
          color={"gray.400"}
          borderWidth={1}
          borderColor="gray.400"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Box
          ml={2}
          display={{
            base: "none",
            lg: "flex",
          }}
          flexDir="row"
        >
          <Text color={"muted.300"}>Welcome </Text>{" "}
          <Text
            ml={1}
            color={"black.900"}
            fontWeight="medium"
            textTransform={"capitalize"}
          >
            {user?.nickname}
          </Text>
        </Box>
      </Flex>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user?.picture!} />

                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              width={12}
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuDivider />
              <MenuItem display="flex" flexDir={"row"} onClick={handleSignOut}>
                <Icon mr={2} as={BiLogOut} />
                <Link href="/api/auth/logout">Logout</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
