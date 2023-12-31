"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Image,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isEmpty(user)) {
      router.push("/books");
    }
  }, [user]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"4xl"}>Welcome</Heading>
          <Image
            alt="logo"
            fit={"contain"}
            alignSelf={"center"}
            bg={"white"}
            boxSize={40}
            src={"/images/logo.png"}
          />
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          {isLoading ? (
            <Spinner colorScheme="blue" />
          ) : (
            <Link
              style={{ color: "blue", textDecoration: "underline" }}
              href="/api/auth/login"
            >
              Login
            </Link>
          )}{" "}
          to manage your books
        </Box>
      </Stack>
    </Flex>
  );
}
