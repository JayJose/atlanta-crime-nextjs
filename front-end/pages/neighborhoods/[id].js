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
  const res = await fetch(
    `http://localhost:8000/crimes/${params.id}?limit=5000`
  );
  const crimes = await res.json();

  return {
    props: {
      crimes,
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
