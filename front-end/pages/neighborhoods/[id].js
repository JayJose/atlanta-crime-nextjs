import { getAllNeighborhoods } from '../../lib/neighborhoods';
import { Layout } from '../../components/layout';
import { NeighborhoodView } from '../../components/neighborhoodView';

export async function getStaticPaths() {
  const paths = getAllNeighborhoods();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { Client } = require('pg');
  const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'crime',
    password: 'admin',
    port: 5432
  });

  client.connect();

  const query = `select * from dev.app_nhood_view where neighborhood = '${params.id}'`;
  const barQuery = `select * from dev.app_radar where neighborhood = '${params.id}' order by _2022 asc`;
  const mapQuery = `select * from dev.app_map where neighborhood = '${params.id}' order by offense`;

  const [crimesRes, mapRes, barRes] = await Promise.all([
    client.query(query),
    client.query(mapQuery),
    client.query(barQuery)
  ]);

  const [crimes, map, bar] = await Promise.all([
    crimesRes.rows,
    mapRes.rows,
    barRes.rows
  ]);

  client.end();

  return {
    props: {
      crimes,
      map,
      bar,
      id: params.id
    }
  };
}

export default function Neighborhood(props) {
  return (
    <>
      <Layout
        children={<NeighborhoodView {...props}></NeighborhoodView>}
      ></Layout>
    </>
  );
}
