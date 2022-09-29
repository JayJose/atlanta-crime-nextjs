import Head from 'next/head';
import Image from 'next/image';

// layout
import { Layout } from '../components/layout';

// get data from api
export async function getStaticProps() {
  const [offenseRes, neighborhoodRes, crimesRes] = await Promise.all([
    fetch('http://localhost:8000/offenses'),
    fetch('http://localhost:8000/neighborhoods'),
    fetch('http://localhost:8000/crimes?limit=40000')
  ]);

  const [offenses, neighborhoods, crimes] = await Promise.all([
    offenseRes.json(),
    neighborhoodRes.json(),
    crimesRes.json()
  ]);

  return { props: { offenses, neighborhoods, crimes } };
}

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout {...props}></Layout>
    </>
  );
}
