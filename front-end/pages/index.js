import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

import { supabase } from '../lib/supabase';

import { Accordion, AccordionPanel, Box, SelectMultiple, Text } from 'grommet';
import { Layout } from '../components/layout';
import { MyCityMap } from '../components/map';
import { Filter, CaretUpFill, CaretDownFill } from 'grommet-icons';

import _ from 'underscore';
import { toTitleCase } from '../lib/transformStrings';

export const getStaticProps = async () => {
  const { data: crimes } = await supabase
    .from('app_main')
    .select('*')
    .eq('neighborhood', 'all');

  const { data: map } = await supabase
    .from('app_map')
    .select('*')
    .eq('year', 2022)
    .eq('neighborhood', 'midtown');

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
      map,
      neighborhoods,
      offenses
    }
  };
};

export default function Home(props) {
  const isMounted = useRef(false);

  // box config
  const elevation = 'xsmall';
  const margin = 'small';
  const pad = 'small';
  const round = 'small';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [neighborhood, setNeighborhood] = useState([]);
  const [offense, setOffense] = useState([]);
  const [crimes, setCrimes] = useState(props.crimes);

  // count crimes by year
  var years = { current: 2022, prior: 2021 };
  let currentCount = 0;
  let priorCount = 0;
  crimes.forEach((e) => {
    if (e.year === years.current) {
      currentCount += e.value;
    }
    if (e.year === years.prior) {
      priorCount += e.value;
    }
  });

  var yoy_change = currentCount / priorCount - 1;

  useEffect(() => {
    if (isMounted.current) {
      getData();
    } else {
      isMounted.current = true;
    }
  }, [neighborhood]);

  const getData = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('app_main')
        .select('*')
        .in('neighborhood', neighborhood.length === 0 ? ['all'] : neighborhood);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCrimes(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box flex margin="xsmall" wrap>
          <Accordion>
            <AccordionPanel label={<Filter color="black" />}>
              <Box pad="medium" background="light-2" gap="xsmall">
                <SelectMultiple
                  clear
                  placeholder="Select a neighborhood."
                  options={props.neighborhoods}
                  valueKey={{
                    key: 'neighborhood',
                    reduce: true
                  }}
                  dropHeight="medium"
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
                  dropHeight="medium"
                  onChange={({ value, option }) => setOffense(value)}
                />
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
        <Box fill align="start" justify="center" margin="small">
          <MyCityMap mapData={props.map}></MyCityMap>
        </Box>
      </Layout>
    </>
  );
}
