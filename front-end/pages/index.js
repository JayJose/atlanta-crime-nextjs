import Head from 'next/head';

// layout
import { Layout } from '../components/layout';
import _ from 'underscore';
import { MyMap } from '../components/map';
import { useState } from 'react';

// get data from api
export async function getStaticProps() {
  // new ish
  // NEW
  const { Client } = require('pg');
  const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'crime',
    password: 'admin',
    port: 5432
  });

  client.connect();

  const query = `select * from dev.fct_crimes where neighborhood_id = 'midtown' limit 1;`;
  const [offenseRes, neighborhoodRes, crimesRes, dataRes] = await Promise.all([
    fetch('http://localhost:8000/offenses'),
    fetch('http://localhost:8000/neighborhoods'),
    fetch(
      `http://localhost:8000/crimes/aggregated/year_and_neighborhood?limit=${process.env.LIMIT}`
    ),
    client.query(query)
  ]);

  const [offenses, neighborhoods, crimes, data] = await Promise.all([
    offenseRes.json(),
    neighborhoodRes.json(),
    crimesRes.json(),
    dataRes.rows
  ]);

  console.log(data);
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
            <MyMap></MyMap>
          </>
        }
      ></Layout>
    </>
  );
}
