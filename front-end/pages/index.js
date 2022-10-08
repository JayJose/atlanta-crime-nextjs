import Head from 'next/head';

// layout
import { Layout } from '../components/layout';
import _ from 'underscore';
import { MyMegaMap } from '../components/map';

// get data from api
export async function getStaticProps() {
  const { Client } = require('pg');
  const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'crime',
    password: 'admin',
    port: 5432
  });

  client.connect();

  const query = `select * from dev.app_map where date_part('year',cast(date as date)) = 2022 order by neighborhood`;

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
            <MyMegaMap mapData={props.crimes}></MyMegaMap>
          </>
        }
      ></Layout>
    </>
  );
}
