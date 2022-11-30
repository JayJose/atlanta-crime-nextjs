import { supabase } from '../lib/supabase';

// UI
import { MyHeader } from '../components/chakra/header';

// DATA VIZ
import { MyResponsiveLine } from '../components/trends';

// HELPER FN
import { genTrendData } from '../lib/transformData';

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
    },
    revalidate: 300
  };
};

export function Chart() {
  return <div className="chart">CHART</div>;
}

export function BigChart() {
  return <div className="chart bigChart">BIGCHART</div>;
}

export function Table() {
  return <div className="table">TABLE</div>;
}

export default function Dash(props) {
  // big chart
  let data = props.trends.filter(
    (c) => c.offense_category === 'motor vehicle theft'
  );
  let chartData = genTrendData(
    data,
    'year',
    'week_of_year',
    'cum_value' //trendValue
  );

  return (
    <>
      <MyHeader></MyHeader>
      <div className="page">
        <div className="layout">
          <div className="bigChart">
            <MyResponsiveLine
              key={'motor vehicle theft'}
              data={chartData}
              y_label={'motor vehicle theft'}
            />
          </div>
          <Chart />
          <Chart />
          <Chart />
          <Table />
        </div>
      </div>
    </>
  );
}
