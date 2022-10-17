import Head from 'next/head';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

import { MyHeader } from '../../components/chakra/header';
import {
  Container,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Stack,
  VStack,
  SimpleGrid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th
} from '@chakra-ui/react';
import { MyResponsiveLine } from '../../components/trends';
import { MyNeighborhoodMap } from '../../components/map';

import { genHeatmapData, genTrendData } from '../../lib/transformData';
import { getYoyChange, toTitleCase } from '../../lib/transformStrings';
import _ from 'underscore';

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
      'brookhaven',
      'kirkwood'
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

  const { data: trends } = await supabase
    .from('app_trends')
    .select('*')
    .eq('neighborhood', params.id)
    .order('offense_category', { ascending: true });

  const { data: table } = await supabase
    .from('app_table')
    .select('*')
    .eq('neighborhood', params.id)
    .order('offense_category', { ascending: true });

  const { data: offenses } = await supabase
    .from('dim_offenses')
    .select('*')
    .order('offense', { ascending: true });

  return {
    props: {
      id: params.id,
      crimes,
      trends,
      table,
      offenses
    }
  };
};

export default function Neighborhood(props) {
  const offenseCategories = [
    ...new Set(props.offenses.map((e) => e.offense_category))
  ].sort();

  const [tableData, setTableData] = useState(props.table);
  const [mapData, setMapData] = useState(props.crimes);

  mapData.forEach(
    (row) =>
      (row.coordinates = [parseFloat(row.longitude), parseFloat(row.latitude)])
  );

  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyHeader title={props.id}></MyHeader>
      <Container
        maxW="container.xl"
        p={{ base: 0, md: 3 }}
        background={'black'}
      >
        <Flex
          h={{ base: 'auto', md: '90vh' }}
          py={[0, 0, 0]}
          px={[0, 0, 0]}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack
            w="100%"
            h="full" // watch this
            overflowY={'auto'}
            p={3}
            spacing={5}
            align="stretch"
            bg={'black'}
            borderRadius={'10px'}
          >
            <Stack direction={{ base: 'column', md: 'row' }} w="100%" h="50vh">
              <Table variant="simple" colorScheme="black" size={'sm'}>
                <colgroup>
                  <col span="1" style={{ width: '50%' }} />
                  <col span="1" style={{ width: '25%' }} />
                  <col span="1" style={{ width: '25%' }} />
                </colgroup>
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
                        // onClick={(e) => {
                        //   let v = e.target.innerText.toLowerCase();
                        //   setOffense(v === 'all' ? [] : [v]);
                        // }}
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
              <MyNeighborhoodMap
                neighborhood={props.id}
                data={mapData}
              ></MyNeighborhoodMap>
            </Stack>
            <SimpleGrid
              gap={1}
              columns={{ base: 1, md: 3 }}
              width={'100%'}
              height={'75vh'}
            >
              {offenseCategories.map((o) => {
                let data = props.trends.filter((c) => c.offense_category === o);
                let chartData = genTrendData(data, 'year', 'week_of_year');
                return (
                  <GridItem key={o}>
                    <MyResponsiveLine key={o} data={chartData} y_label={o} />
                  </GridItem>
                );
              })}
            </SimpleGrid>
          </VStack>
        </Flex>
      </Container>
    </>
  );
}
