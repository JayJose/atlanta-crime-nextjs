import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// layout
import { Layout } from '../components/layout';

// get data from api
export async function getStaticProps() {
  const [offenseRes, neighborhoodRes, crimesRes] = await Promise.all([
    fetch('http://localhost:8000/offenses'),
    fetch('http://localhost:8000/neighborhoods'),
    fetch('http://localhost:8000/crimes')
  ]);

  const [offenses, neighborhoods, crimes] = await Promise.all([
    offenseRes.json(),
    neighborhoodRes.json(),
    crimesRes.json()
  ]);

  return { props: { offenses, neighborhoods, crimes } };
}

export default function Home(props) {
  //props.neighborhoods
  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout></Layout>
      <p>Charts are above</p>
    </>
  );
}
