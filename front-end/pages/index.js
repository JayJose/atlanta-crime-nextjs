import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { supabase } from '../lib/supabase';

import { MyCityMap } from '../components/map';
import { MyResponsiveLine } from '../components/trends';

import _ from 'underscore';
import { genTrendData } from '../lib/transformData';
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
  Td,
  Divider,
  SimpleGrid,
  GridItem
} from '@chakra-ui/react';

import { InfoOutlineIcon } from '@chakra-ui/icons';
import { ST } from 'next/dist/shared/lib/utils';

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

  const { data: trends } = await supabase
    .from('app_trends')
    .select('*')
    .eq('neighborhood', 'all')
    .eq('neighborhood', 'all')
    .order('offense_category', { ascending: true });

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
      trends,
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
  const offenseCategories = [
    ...new Set(props.offenses.map((e) => e.offense_category))
  ].sort();

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

  // grid formatting
  const grid = { rows: 6, cols: 2 };

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
        <VStack
          h="90vh"
          w="100%"
          p={0}
          spacing={2}
          align="stretch"
          bg={'darkgray'}
          borderRadius={'10px'}
          overflowY={'auto'}
        >
          <VStack margin={2} mb={0} spacing={0} align={'left'} p={0}>
            <Text fontSize={'0.85em'}>
              Select a neighborhood from the map to see more crime data.
            </Text>{' '}
            <Text fontSize={'0.85em'}>
              Data current as of {asOf.toLocaleDateString()}.
            </Text>{' '}
          </VStack>
          <SimpleGrid
            gap={5}
            columns={{ base: grid.cols }}
            rows={{ base: 4 }}
            width={'100%'}
            minHeight={'90%'}
            maxHeight={'90%'}
          >
            <GridItem colSpan={grid.cols} rowSpan={grid.rows - 1}>
              <MyCityMap
                data={mapData}
                setNeighborhood={setNeighborhood}
                viewState={viewState}
                setViewState={setViewState}
              ></MyCityMap>
            </GridItem>
            <GridItem
              colSpan={{ base: grid.cols, md: grid.cols - 1 }}
              rowSpan={1}
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
                          console.log(e);
                          let v = e.target.textContent.toLowerCase();
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
            </GridItem>
            <GridItem
              colSpan={{ base: grid.cols, md: grid.cols - 1 }}
              rowSpan={1}
              h={'200px'}
            >
              <SimpleGrid gap={1} columns={{ base: 1, md: 3 }} width={'100%'}>
                {offenseCategories.map((o) => {
                  let data = props.trends.filter(
                    (c) => c.offense_category === o
                  );
                  let chartData = genTrendData(data, 'year', 'week_of_year');
                  return (
                    <GridItem key={o} h={'200px'}>
                      <MyResponsiveLine key={o} data={chartData} y_label={o} />
                    </GridItem>
                  );
                })}
              </SimpleGrid>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
}
