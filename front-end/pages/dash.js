import { supabase } from '../lib/supabase';

// UI
import { MyHeader } from '../components/chakra/header';

// DATA VIZ
import TrendChart from '../components/dataViz/TrendChart';
import Table from '../components/dataViz/Table';

// HELPER FN
import { genTrendData } from '../lib/transformData';

export const getStaticProps = async () => {
  const { data: table } = await supabase
    .from('app_table')
    .select('*')
    .eq('neighborhood', 'all')
    .order('offense_category', { ascending: true });

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

export default function Dash(props) {
  // big chart
  let data = props.trends.filter(
    (c) => c.offense_category === 'motor vehicle theft'
  );
  let chartData = genTrendData(data, 'year', 'week_of_year', 'cum_value');

  return (
    <>
      <MyHeader></MyHeader>
      <div className="page">
        <div className="layout">
          <div className="bigChart">
            <TrendChart
              key={'motor vehicle theft'}
              data={chartData}
              y_label={'motor vehicle theft'}
            />
          </div>
          <div className="chart">
            <TrendChart
              key={'motor vehicle theft'}
              data={chartData}
              y_label={'motor vehicle theft'}
            />
          </div>
          <div className="chart">
            <TrendChart
              key={'motor vehicle theft'}
              data={chartData}
              y_label={'motor vehicle theft'}
            />
          </div>
          <div className="map">MAP</div>
          <div className="table">
            <Table data={props.table} />
          </div>
        </div>
      </div>
    </>
  );
}
