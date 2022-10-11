import Head from 'next/head';

import { supabase } from '../lib/supabase';

import { Layout } from '../components/layout';
import { MyCityMap } from '../components/map';

import _ from 'underscore';

export const getStaticProps = async () => {
  const { data: crimes } = await supabase
    .from('app_map')
    .select('*')
    .eq('year', 2022);

  return {
    props: {
      crimes
    }
  };
};

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
            <MyCityMap mapData={props.crimes}></MyCityMap>
          </>
        }
      ></Layout>
    </>
  );
}
