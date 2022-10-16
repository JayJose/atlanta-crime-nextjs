import Head from 'next/head';
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
  VStack,
  SimpleGrid,
  GridItem
} from '@chakra-ui/react';
import { MyResponsiveLine } from '../../components/trends';

import { genHeatmapData, genTrendData } from '../../lib/transformData';
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

  const { data: offenses } = await supabase
    .from('dim_offenses')
    .select('*')
    .order('offense', { ascending: true });

  return {
    props: {
      id: params.id,
      crimes,
      trends,
      offenses
    }
  };
};

export default function Neighborhood(props) {
  const offenseCategories = [
    ...new Set(props.crimes.map((e) => e.offense_category))
  ].sort();

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
            h="100vh" // watch this
            overflowY={'auto'}
            p={3}
            spacing={5}
            align="stretch"
            bg={'black'}
            borderRadius={'10px'}
          >
            <MyHeader title={props.id}></MyHeader>
            <Heading size={'sm'}>Cumulative counts by year</Heading>
            <SimpleGrid
              gap={1}
              columns={{ md: 3 }}
              width={'100%'}
              height={'100%'}
            >
              {offenseCategories.map((o) => {
                let data = props.trends.filter((c) => c.offense_category === o);
                let chartData = genTrendData(data, 'year', 'week_of_year');
                console.log(chartData);
                return (
                  <GridItem>
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
