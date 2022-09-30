import Link from 'next/link';
import { getAllNeighborhoods } from '../../lib/neighborhoods';
import { Heading, Text } from 'grommet';
import { Layout } from '../../components/layout';

export async function getStaticPaths() {
  const paths = getAllNeighborhoods();
  return {
    paths,
    fallback: false
  };
}

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
      <Link href="/">Take me home</Link>
      <Heading>What up?</Heading>
      {JSON.stringify(props.crimes)}
      <Layout>hello</Layout>;
    </>
  );
}
