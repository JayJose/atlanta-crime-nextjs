import Head from 'next/head';

// layout
import { Layout } from '../components/layout';
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
  // NEW
  // const { Client } = require('pg');
  // const client = new Client({
  //   user: 'admin',
  //   host: 'localhost',
  //   database: 'crime',
  //   password: 'admin',
  //   port: 5432
  // });

  // client.connect();

  // const query = `select * from dev.fct_crimes where neighborhood_id = 'midtown' limit 5;`;
  // client.query(query, (err, res) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   for (let row of res.rows) {
  //     console.log(row);
  //   }
  //   console.log(res.rows);
  //   client.end();
  // });
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
