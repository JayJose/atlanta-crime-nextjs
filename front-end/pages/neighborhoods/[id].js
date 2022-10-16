import Head from 'next/head';
import { supabase } from '../../lib/supabase';

import { MyHeader } from '../../components/chakra/header';
import {
  Container,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react';
import { MyResponsiveLine } from '../../components/trends';

import { genHeatmapData } from '../../lib/transformData';

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
      'brookhaven'
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

  const { data: offenses } = await supabase
    .from('dim_offenses')
    .select('*')
    .order('offense', { ascending: true });

  return {
    props: {
      id: params.id,
      crimes,
      offenses
    }
  };
};

export default function Neighborhood(props) {
  var myTrendsData = genHeatmapData(props.crimes, 'year', 'week_of_year');

  const offenseCategories = [
    ...new Set(props.crimes.map((e) => e.offense_category))
  ];

  return (
    <>
      <Head>
        <title>Crime!</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.lg" p={1} background={'#6FFFB0'}>
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
            {offenseCategories.map((o) => {
              let data = props.crimes.filter((c) => c.offense_category === o);
              let chartData = genHeatmapData(data, 'year', 'week_of_year');

              return <MyResponsiveLine key={o} data={chartData} y_label={o} />;
            })}
          </VStack>
        </Flex>
      </Container>
    </>
  );
}
