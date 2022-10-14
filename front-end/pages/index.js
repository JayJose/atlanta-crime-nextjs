import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

import { supabase } from '../lib/supabase';

import { MyCityMap } from '../components/map';

import _ from 'underscore';
import { toTitleCase } from '../lib/transformStrings';

// NEW
import { MyHeader } from '../components/chakra/header';
import { MyLayout } from '../components/chakra/layout';
import { Container, Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

export const getStaticProps = async () => {
  const { data: crimes } = await supabase
    .from('app_main')
    .select('*')
    .eq('neighborhood', 'all');

  const { data: map } = await supabase
    .from('app_map')
    .select('*')
    .eq('year', 2022);
  //.eq('neighborhood', 'midtown');

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
      <Container maxW="container.xl" p={4} background={'#6FFFB0'}>
        <Flex
          h={{ base: 'auto', md: '100vh' }}
          py={[0, 0, 0]}
          px={[0, 0, 0]}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack
            w="100%"
            h="full"
            p={1}
            spacing={5}
            align="stretch"
            bg={'black'}
            borderRadius={'10px'}
          >
            <MyHeader></MyHeader>
            <HStack spacing={5}>
              <Text>
                {currentCount.toLocaleString()} crimes in {years.current}
              </Text>
              <Text>
                {yoy_change > 0 ? (
                  <TriangleUpIcon color="red" mb={1} mr={1} />
                ) : (
                  <TriangleDownIcon color="green" />
                )}
                {yoy_change.toLocaleString('en-US', {
                  style: 'percent'
                })}{' '}
                compared to {years.prior}
              </Text>
            </HStack>
            <Box w="100%" h="75vh">
              <MyCityMap
                mapData={props.map}
                setNeighborhood={setNeighborhood}
              ></MyCityMap>
            </Box>
          </VStack>
        </Flex>
      </Container>
    </>
  );
}
