import Head from 'next/head';

// layout
import { Layout } from '../components/layout';
import { MyResponsiveTreeMap } from '../components/treemap';
import _ from 'underscore';
import { MyMap } from '../components/map';

// get data from api
export async function getStaticProps() {
  const [offenseRes, neighborhoodRes, crimesRes] = await Promise.all([
    fetch('http://localhost:8000/offenses'),
    fetch('http://localhost:8000/neighborhoods'),
    fetch(
      `http://localhost:8000/crimes/aggregated/year_and_neighborhood?limit=${process.env.LIMIT}`
    )
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
      <Layout
        children={
          <>
            <MyMap></MyMap>
          </>
        }
      ></Layout>
    </>
  );
}
