import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

import { MyHeader } from '../../components/chakra/header';
import {
  Box,
  Container,
  Divider,
  Flex,
  GridItem,
  HStack,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack,
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
      'kirkwood',
      'morningside/lenox park'
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

  const { data: neighborhoods } = await supabase
    .from('dim_neighborhoods')
    .select('*')
    .in('id', [
      'midtown',
      'downtown',
      'inman park',
      'poncey-highland',
      'grant park',
      'brookhaven',
      'kirkwood',
      'morningside/lenox park'
    ])
    .order('neighborhood', { ascending: true });

  return {
    props: {
      id: params.id,
      crimes,
      trends,
      table,
      offenses,
      neighborhoods
    }
  };
};

export default function Neighborhood(props) {
  const router = useRouter();

  const offenseCategories = [
    ...new Set(props.offenses.map((e) => e.offense_category))
  ].sort();

  props.crimes.forEach(
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
        color="brand.0"
      >
        <Flex
          h={{ base: 'auto', md: '90vh' }}
          py={[0, 0, 0]}
          px={[0, 0, 0]}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack
            w="100%"
            //h="full" // watch this
            overflowY={'auto'}
            p={1}
            spacing={2}
            align="stretch"
            bg={'black'}
            borderRadius={'10px'}
          >
            <SimpleGrid columns={6} width="100%">
              <GridItem colSpan={1}>
                <Text color="brand.0" mt={0.5} mb={2}>
                  Crime in{' '}
                </Text>
              </GridItem>
              <GridItem colSpan={5}>
                <Select
                  display={'inline'}
                  size={'sm'}
                  variant={'filled'}
                  color={'brand.200'}
                  bg={'black'}
                  fontSize={'16px'}
                  value={toTitleCase(props.id)}
                  placeholder={toTitleCase(props.id)}
                  onChange={(e) => {
                    let value = e.target.value.toLowerCase();
                    if (value !== props.id) {
                      router.push(
                        '/neighborhoods/' + encodeURIComponent(value)
                      );
                    }
                  }}
                >
                  {props.neighborhoods.map((n) => {
                    return (
                      <option key={n.id} value={n.id}>
                        {toTitleCase(n.neighborhood)}
                      </option>
                    );
                  })}
                </Select>
              </GridItem>
            </SimpleGrid>
            <Divider></Divider>
            <Box></Box>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              width="100%"
              height="70vh"
              mb={10}
            >
              <Table variant="simple" colorScheme="black" size={'sm'}>
                <colgroup>
                  <col span="1" style={{ width: '50%' }} />
                  <col span="1" style={{ width: '25%' }} />
                  <col span="1" style={{ width: '25%' }} />
                </colgroup>
                <Thead bgColor="black">
                  <Tr>
                    <Th color={'white'}>Crime</Th>
                    <Th color={'white'}>Crimes in 2022</Th>
                    <Th color={'white'}>YoY Change</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {props.table.map((o) => (
                    <Tr key={o.offense_category}>
                      <Td
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
                data={props.crimes}
              ></MyNeighborhoodMap>
            </Stack>
            <Box mt={4}></Box>
            <Divider></Divider>

            <Text fontSize={'14px'} fontStyle={'italic'}>
              Cumulative crime counts comparison
            </Text>
            <SimpleGrid
              gap={1}
              columns={{ base: 1, md: 3 }}
              width={'100%'}
              height={'100vh'}
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
