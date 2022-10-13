import { useState } from 'react';
import Head from 'next/head';

import { supabase } from '../lib/supabase';

import {
  Accordion,
  AccordionPanel,
  Box,
  Select,
  SelectMultiple,
  Text
} from 'grommet';
import { Layout } from '../components/layout';
import { MyCityMap } from '../components/map';

import _ from 'underscore';
import { toTitleCase } from '../lib/transformStrings';

export const getStaticProps = async () => {
  const { data: crimes } = await supabase
    .from('app_map')
    .select('*')
    .eq('year', 2022)
    .single();

  const { data: neighborhoods } = await supabase
    .from('dim_neighborhoods')
    .select('*')
    .order('neighborhood', { ascending: true });

  const { data: offenses } = await supabase
    .from('dim_offenses')
    .select('*')
    .order('offense', { ascending: true });

  return {
    props: {
      crimes,
      neighborhoods,
      offenses
    }
  };
};

export default function Home(props) {
  // box config
  const elevation = 'xsmall';
  const margin = 'small';
  const pad = 'small';
  const round = 'small';

  const [neighborhood, setNeighborhood] = useState([]);
  const [offense, setOffense] = useState([]);

  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Accordion>
          <AccordionPanel label="Filter the data">
            <Box pad="medium" background="light-2" gap="xsmall">
              <SelectMultiple
                clear
                placeholder="Select a neighborhood."
                options={props.neighborhoods}
                valueKey={{
                  key: 'neighborhood',
                  reduce: true
                }}
                onChange={({ value, option }) => setNeighborhood(value)}
              />
              <SelectMultiple
                clear
                placeholder="Select an offense."
                options={props.offenses}
                valueKey={{
                  key: 'offense',
                  reduce: true
                }}
                onChange={({ value, option }) => setOffense(value)}
              />
            </Box>
          </AccordionPanel>
        </Accordion>
        <Box>
          <Text>
            The current value of neighborhood is {JSON.stringify(neighborhood)}
          </Text>
          <Text>The current value of offense is {JSON.stringify(offense)}</Text>
        </Box>
      </Layout>
    </>
  );
}
