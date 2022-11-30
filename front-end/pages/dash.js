import { useState } from 'react';

import { supabase } from '../lib/supabase';

// UI
import { MyHeader } from '../components/chakra/header';

// DATA VIZ
import FilledMap from '../components/dataViz/FilledMap';
import Table from '../components/dataViz/Table';
import TrendChart from '../components/dataViz/TrendChart';

// HELPER FN
import { genTrendData } from '../lib/transformData';
import { toTitleCase } from '../lib/transformStrings';

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

  const { data: map } = await supabase
    .from('app_filled_map')
    .select('*')
    .eq('year', 2022)
    .order('neighborhood', { ascending: true });

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
      map,
      neighborhoods,
      offenses,
      cutoff
    },
    revalidate: 300
  };
};

export default function Dash(props) {
  const offenseCategories = [
    ...new Set(props.offenses.map((e) => e.offense_category))
  ].sort();

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
          {offenseCategories.map((o) => {
            let data = props.trends.filter((c) => c.offense_category === o);
            let chartData = genTrendData(
              data,
              'year',
              'week_of_year',
              'cum_value'
            );
            return (
              <div className="chart" key={o}>
                <p>{toTitleCase(o)}</p>
                <TrendChart key={o} data={chartData} y_label={o} />
              </div>
            );
          })}
          <div className="table">
            <Table data={props.table} />
          </div>
        </div>
      </div>
    </>
  );
}
