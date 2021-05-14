import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '@chatui/core/dist/index.css';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../style/tailwind.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Yahaha</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <Provider session={pageProps.session}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default MyApp;
