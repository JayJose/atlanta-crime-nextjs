import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { supabase } from '../lib/supabase';

import { MyCityMap } from '../components/map';

import _ from 'underscore';
import { toTitleCase, getYoyChange } from '../lib/transformStrings';

// NEW
import { MyHeader } from '../components/chakra/header';
import { MyVerticalTable } from '../components/chakra/verticalTable';
import {
  Container,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tooltip,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';

export const getStaticProps = async () => {
  const { data: crimes } = await supabase
    .from('app_main')
    .select('*')
    .eq('neighborhood', 'all');

  const { data: table } = await supabase
    .from('app_table')
    .select('*')
    .eq('neighborhood', 'all')
    .order('offense_category', { ascending: true });

  const { data: map } = await supabase
    .from('app_map')
    .select('*')
    .eq('year', 2022);

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
      table,
      map,
      neighborhoods,
      offenses
    }
  };
};

export default function Home(props) {
  const isMounted = useRef(false);

  const router = useRouter();

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

      let { data: tableData } = await supabase
        .from('app_table')
        .select('*')
        .eq('neighborhood', neighborhood.length === 0 ? ['all'] : neighborhood)
        .order('offense_category', { ascending: true });

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCrimes(data);
      }

      if (tableData) {
        setTableData(tableData);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const indexViewState = {
    latitude: 33.74,
    longitude: -84.42,
    zoom: 10.5,
    bearing: 0,
    pitch: 35
  };

  const [viewState, setViewState] = useState(indexViewState);

  //TODO update map to include neighborhood and offense values
  var mapData;
  if (offense.length === 0) {
    mapData = props.map;
  } else {
    mapData = _.filter(props.map, function (row) {
      return row.offense_category === offense[0];
    });
  }

  const [tableData, setTableData] = useState(props.table);

  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl" p={1} background={'#6FFFB0'}>
        <Flex
          h={{ base: 'auto', md: '100vh' }}
          py={[0, 0, 0]}
          px={[0, 0, 0]}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack
            w="100%"
            h="full"
            p={3}
            spacing={3}
            align="stretch"
            bg={'black'}
            borderRadius={'10px'}
          >
            <MyHeader></MyHeader>
            <Box>
              <Table variant="simple" colorScheme="black" size={'sm'}>
                <Thead position="sticky" top={0} bgColor="black">
                  <Tr>
                    <Th color={'white'}>Offense</Th>
                    <Th color={'white'}>Crimes in 2022</Th>
                    <Th color={'white'}>YoY Change</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableData.map((o) => (
                    <Tr key={o.offense_category}>
                      <Td
                        onClick={(e) => {
                          let v = e.target.innerText.toLowerCase();
                          setOffense(v === 'all' ? [] : [v]);
                        }}
                        style={{
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          maxWidth: '1px'
                        }}
                      >
                        {toTitleCase(o.offense_category)}
                      </Td>
                      <Td>{o._2022.toLocaleString()}</Td>
                      <Td>{getYoyChange(o._2021, o._2022)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <HStack spacing={2}>
              <Button
                bg={'#6FFFB0'}
                textColor={'black'}
                onClick={() => router.push(`/neighborhoods/${neighborhood[0]}`)}
              >
                Show me more.
              </Button>
              {(neighborhood.length !== 0) | (offense.length !== 0) ? (
                <Button
                  bg={'#6FFFB0'}
                  textColor={'black'}
                  onClick={() => {
                    setNeighborhood([]);
                    setOffense([]);
                    setViewState(indexViewState);
                  }}
                >
                  Reset the map.
                </Button>
              ) : null}
            </HStack>
            <Text size={'lg'}>
              Viewing {offense.length === 0 ? 'All' : toTitleCase(offense[0])}{' '}
              crimes in{' '}
              {neighborhood.length === 0
                ? 'Atlanta'
                : toTitleCase(neighborhood[0])}
            </Text>
            <Box w="100%" h="75vh">
              <MyCityMap
                data={mapData}
                setNeighborhood={setNeighborhood}
                viewState={viewState}
                setViewState={setViewState}
              ></MyCityMap>
            </Box>
          </VStack>
        </Flex>
      </Container>
    </>
  );
}
