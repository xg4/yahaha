import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ChatContainer = dynamic(() => import('../../components/Chat'), {
  ssr: false,
});

export default function ChatDetails() {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>{query.id} - Yahaha</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ChatContainer></ChatContainer>
    </>
  );
}
