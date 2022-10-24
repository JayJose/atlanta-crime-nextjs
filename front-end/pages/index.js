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
  IconButton,
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

import { InfoOutlineIcon } from '@chakra-ui/icons';

export const getStaticProps = async () => {
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

  const { data: cutoff } = await supabase
    .from('app_cutoff')
    .select('cutoff_date');

  return {
    props: {
      table,
      map,
      neighborhoods,
      offenses,
      cutoff
    }
  };
};

export default function Home(props) {
  const isMounted = useRef(false);

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [neighborhood, setNeighborhood] = useState([]);
  const [offense, setOffense] = useState([]);

  const years = { current: 2022, prior: 2021 };

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
        .from('app_table')
        .select('*')
        .eq('neighborhood', neighborhood.length === 0 ? ['all'] : neighborhood)
        .order('offense_category', { ascending: true });

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setTableData(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const indexViewState = {
    latitude: 33.73,
    longitude: -84.42,
    zoom: 10,
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

  // date period
  const asOf = new Date(props.cutoff[0].cutoff_date);

  // tooltips
  const [isDateTipOpen, setisDateTipOpen] = useState(false);
  const [isFilterTipOpen, setisFilterTipOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyHeader></MyHeader>
      <Container
        maxW="container.xl"
        p={{ base: 0, md: 3 }}
        background={'black'}
        color="brand.0"
      >
        <Flex
          h={{ base: 'auto', md: '100vh' }}
          py={[0, 0, 0]}
          px={[0, 0, 0]}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack
            w="100%"
            h="full"
            p={0}
            spacing={2}
            align="stretch"
            bg={'black'}
            borderRadius={'10px'}
          >
            <Stack
              direction={{ base: 'column', md: 'row' }}
              width="100%"
              height="40vh"
            >
              <Table
                variant="simple"
                colorScheme="black"
                size={'sm'}
                className={'crime-table-highlight'}
              >
                <colgroup>
                  <col span="1" style={{ width: '50%' }} />
                  <col span="1" style={{ width: '25%' }} />
                  <col span="1" style={{ width: '25%' }} />
                </colgroup>
                <Thead bgColor="black">
                  <Tr>
                    <Th color={'white'}>
                      Crime{' '}
                      <Tooltip
                        label={'Hover over a CRIME to filter the map.'}
                        aria-label="A tooltip"
                        isOpen={isFilterTipOpen}
                      >
                        <IconButton
                          icon={<InfoOutlineIcon />}
                          color="brand.100"
                          bg={'black'}
                          onMouseEnter={() => setisFilterTipOpen(true)}
                          onMouseLeave={() => setisFilterTipOpen(false)}
                        ></IconButton>
                      </Tooltip>
                    </Th>
                    <Th color={'white'}>Crimes in 2022</Th>
                    <Th color={'white'}>YoY Change</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {props.table.map((o) => (
                    <Tr key={o.offense_category}>
                      <Td
                        onMouseOver={(e) => {
                          let v = e.target.innerText.toLowerCase();
                          setOffense(v === 'all' ? [] : [v]);
                        }}
                        onMouseLeave={(e) => {
                          setOffense([]);
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
                      <Td textAlign={'right'}>{o._2022.toLocaleString()}</Td>
                      <Td>{getYoyChange(o._2021, o._2022)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <MyCityMap
                data={mapData}
                setNeighborhood={setNeighborhood}
                viewState={viewState}
                setViewState={setViewState}
              ></MyCityMap>
            </Stack>
            <HStack spacing={2}>
              <Button
                bg={'#6FFFB0'}
                textColor={'black'}
                onClick={() => router.push(`/hoods/${neighborhood[0]}`)}
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
          </VStack>
        </Flex>
      </Container>
    </>
  );
}
