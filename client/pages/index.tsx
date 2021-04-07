import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
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
    </>
  );
}
