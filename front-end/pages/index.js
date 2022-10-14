import { useState, useEffect, useRef } from 'react';
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
import { Filter } from 'grommet-icons';

import _ from 'underscore';
import { toTitleCase } from '../lib/transformStrings';

export const getStaticProps = async () => {
  const { data: crimes } = await supabase
    .from('app_main')
    .select('*')
    .eq('neighborhood', 'all');

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

  var years = { current: 2022, prior: 2021 };
  var currentCount = crimes.find((e) => e.year === years.current).value ?? 0;
  var priorCount = crimes.find((e) => e.year === years.prior).value ?? 0;

  var yoy_change = (currentCount / priorCount - 1).toLocaleString('en-US', {
    style: 'percent'
  });

  useEffect(() => {
    if (isMounted.current) {
      getData();
      //filterOffenses();
    } else {
      isMounted.current = true;
    }
  }, [neighborhood]);

  const filterOffenses = () => {
    let filteredData = _.filter(crimes, function (row) {
      return row.offense === offense;
    });
    setCrimes(filteredData);
  };

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
        <Box flex align="start" justify="start" margin="xxsmall">
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

          <Box>
            <Text>
              The current value of neighborhood is{' '}
              {JSON.stringify(neighborhood)}
            </Text>
            <Text>
              The current value of offense is {JSON.stringify(offense)}
            </Text>
            <Text>current crimes is {JSON.stringify(currentCount)}</Text>
            <Text>prior crimes is {JSON.stringify(priorCount)}</Text>
            <Text>yoy crimes is {yoy_change}</Text>
            <Text>{JSON.stringify(crimes)}</Text>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
