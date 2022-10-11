import { supabase } from '../../lib/supabase';

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

export const getStaticProps = async ({ params }) => {
  const { data: crimes } = await supabase
    .from('app_map')
    .select('*')
    .eq('neighborhood', params.id);

  return {
    props: {
      crimes,
      id: params.id
    }
  };
};

export default function Neighborhood(props) {
  return (
    <>
      <Layout
        children={<NeighborhoodView {...props}></NeighborhoodView>}
      ></Layout>
    </>
  );
}
