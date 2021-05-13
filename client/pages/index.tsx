import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [session, loading] = useSession();
  return (
    <>
      <Head>
        <title>Yahaha</title>
        <meta charSet="utf-8" />
      </Head>
      welcome to{' '}
      <Link href="/im/yahaha">
        <a>yahaha</a>
      </Link>
      <>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </>
    </>
  );
}
