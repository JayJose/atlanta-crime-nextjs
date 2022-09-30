import { getAllNeighborhoods } from '../../lib/neighborhoods';
import { Layout } from '../../components/layout';
import { MyResponsiveBar } from '../../components/barChart';

export async function getStaticPaths() {
  const paths = getAllNeighborhoods();
  return {
    paths,
    fallback: false
  };
}

import { countByCategory } from '../../lib/transformData';

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8000/crimes/${params.id}`);
  const crimes = await res.json();

  return {
    props: {
      crimes
    }
  };
}

export default function Neighborhood(props) {
  return (
    <>
      <Layout>hello</Layout>
      {JSON.stringify(countByCategory(props.crimes, 'neighborhood'))}
    </>
  );
}
