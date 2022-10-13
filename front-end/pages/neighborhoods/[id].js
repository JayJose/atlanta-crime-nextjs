import { supabase } from '../../lib/supabase';

import { Layout } from '../../components/layout';
import { NeighborhoodView } from '../../components/neighborhoodView';

export const getStaticPaths = async () => {
  const { data: neighborhoods } = await supabase
    .from('dim_neighborhoods')
    .select('id')
    .in('id', [
      'midtown',
      'downtown',
      'inman park',
      'poncey-highland',
      'grant park',
      'brookhaven'
    ]);

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
      id: params.id,
      crimes
    }
  };
};

export default function Neighborhood(props) {
  return (
    <>
      <Layout>
        <NeighborhoodView {...props}></NeighborhoodView>
      </Layout>
    </>
  );
}
