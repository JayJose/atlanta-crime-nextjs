import Head from 'next/head';

import { supabase } from '../lib/supabase';

import { Layout } from '../components/layout';
import { Box, Heading } from 'grommet';
import { MyCityMap } from '../components/map';

import _ from 'underscore';
import { toTitleCase } from '../lib/transformStrings';

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
  // box config
  const elevation = 'xsmall';
  const margin = 'small';
  const pad = 'small';
  const round = 'small';

  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <MyCityMap mapData={props.crimes}></MyCityMap>
      </Layout>
    </>
  );
}
