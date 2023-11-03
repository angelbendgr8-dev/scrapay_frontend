import { ChakraProvider } from "@chakra-ui/react";
import { store } from "app/state";
import { theme } from "app/utils/theme";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  const { user } = pageProps;
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <UserProvider user={user}>
            <Component {...pageProps} />
          </UserProvider>
        </ApolloProvider>
      </Provider>
    </ChakraProvider>
  );
}
