import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import { useState } from 'react';

import { MyHeader } from '../../components/chakra/header';
import MyRadio from '../../components/radio';
import {
  Box,
  Container,
  Divider,
  Flex,
  GridItem,
  IconButton,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Thead,
  Tbody,
  Td,
  Th,
  Tooltip,
  Tr,
  VStack
} from '@chakra-ui/react';

import { InfoOutlineIcon } from '@chakra-ui/icons';

import { MyResponsiveLine } from '../../components/trends';
import { MyNeighborhoodMap } from '../../components/map';

import { genTrendData } from '../../lib/transformData';
import { getYoyChange, toTitleCase } from '../../lib/transformStrings';
import _ from 'underscore';

export const getStaticPaths = async () => {
  const { data: neighborhoods } = await supabase
    .from('dim_neighborhoods')
    .select('id')
    .neq('id', 'none');

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
    .eq('neighborhood', params.id)
    .eq('year', 2022);

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
    .neq('id', 'none')
    .order('neighborhood', { ascending: true });

  const { data: cutoff } = await supabase
    .from('app_cutoff')
    .select('cutoff_date');

  return {
    props: {
      id: params.id,
      crimes,
      trends,
      table,
      offenses,
      neighborhoods,
      cutoff
    },
    revalidate: 300
  };
};

export default function Neighborhood(props) {
  const router = useRouter();

  const offenseCategories = [
    ...new Set(props.offenses.map((e) => e.offense_category))
  ].sort();

  // map
  const [offense, setOffense] = useState([]);
  var mapData = props.crimes;
  if (offense.length !== 0) {
    mapData = _.filter(props.crimes, function (row) {
      return row.offense_category === offense[0];
    });
  }

  // add coordinates
  mapData.forEach((row) => {
    row.coordinates = [parseFloat(row.longitude), parseFloat(row.latitude)];
    row.color = [111, 255, 176];
  });

  // select placeholder
  const myPlaceholder = props.neighborhoods.find(
    (e) => e.id === props.id
  ).display_name;

  // date period
  const asOf = new Date(props.cutoff[0].cutoff_date);
  const asOfLabel = `As of ${asOf.toLocaleDateString()}`;

  // tooltips
  const [isFilterTipOpen, setisFilterTipOpen] = useState(false);

  // title
  const titleHood = toTitleCase(props.id);
  const titleMessage = `${titleHood} crime`;

  // trends
  const [trendValue, setTrendValue] = useState('cum_value');

  return (
    <>
      <Head>
        <title>{titleMessage}</title>
        <meta name="description" content="A crime app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyHeader></MyHeader>
      <Container
        maxW="container.xl"
        p={{ base: 0, md: 2 }}
        background={'black'}
        color="brand.0"
      >
        <Flex
          h={{ base: 'auto', md: '95vh' }}
          py={[0, 0, 0]}
          px={[0, 0, 0]}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack
            w="100%"
            // h="full"
            overflowY={'auto'}
            p={1}
            spacing={2}
            align="stretch"
            bg={'black'}
            borderRadius={'10px'}
          >
            <Flex justifyContent={'flex-start'} alignItems={'center'} mb={-2}>
              <Text color="brand.0" w={'80px'}>
                Crime in
              </Text>
              <Select
                display={'inline'}
                size={'sm'}
                variant={'filled'}
                color={'brand.200'}
                bg={'black'}
                fontSize={'16px'}
                value={toTitleCase(props.id)}
                placeholder={myPlaceholder}
                onChange={(e) => {
                  let value = e.target.value.toLowerCase();
                  if (value !== props.id) {
                    router.push('/hoods/' + encodeURIComponent(value));
                  }
                }}
              >
                {props.neighborhoods.map((n) => {
                  return (
                    <option key={n.id} value={n.id}>
                      {n.display_name}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            <Text
              className="text-date"
              fontSize={'0.85rem'}
              color={'brand.100'}
            >
              {asOfLabel}
            </Text>
            <Divider></Divider>

            <Stack
              direction={{ base: 'column', md: 'row' }}
              width="100%"
              height="70vh"
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
              <MyNeighborhoodMap
                key={props.id}
                neighborhood={props.id}
                data={mapData}
              ></MyNeighborhoodMap>
            </Stack>
            <Box mt={4}></Box>
            <Box></Box>
            <Box></Box>
            <Divider></Divider>
            <Text fontSize={'1.05rem'}>
              Crime trend comparisons (2022 vs. 2021)
            </Text>
            <MyRadio value={trendValue} setValue={setTrendValue} />
            <SimpleGrid
              gap={1}
              columns={{ base: 1, md: 3 }}
              width={'100%'}
              height={'100vh'}
            >
              {offenseCategories.map((o) => {
                let data = props.trends.filter((c) => c.offense_category === o);
                let chartData = genTrendData(
                  data,
                  'year',
                  'week_of_year',
                  trendValue
                );
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
