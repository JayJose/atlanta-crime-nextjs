import Head from 'next/head';

import { createClient } from '../lib/client';

import { Layout } from '../components/layout';
import { MyCityMap } from '../components/map';

import _ from 'underscore';

// get data from api
export async function getStaticProps() {
  const client = createClient();
  client.connect();

  const query = `select * from dev.app_map where year = 2022`;

  const [offenseRes, neighborhoodRes, crimesRes] = await Promise.all([
    fetch('http://localhost:8000/offenses'),
    fetch('http://localhost:8000/neighborhoods'),
    client.query(query)
  ]);

  const [offenses, neighborhoods, crimes] = await Promise.all([
    offenseRes.json(),
    neighborhoodRes.json(),
    crimesRes.rows
  ]);

  client.end();

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
            <MyCityMap mapData={props.crimes}></MyCityMap>
          </>
        }
      ></Layout>
    </>
  );
}
