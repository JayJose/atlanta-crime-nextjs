import { supabase } from '../../lib/supabase';

import { Layout } from '../../components/layout';
import { NeighborhoodView } from '../../components/neighborhoodView';

export const getStaticPaths = async () => {
  const { data: neighborhoods } = await supabase
    .from('dim_neighborhoods')
    .select('id');

  const paths = neighborhoods.map(({ id }) => ({
    params: {
      id: id.toString()
    }
  }));

  return {
    paths,
    fallback: false
  };
};

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
