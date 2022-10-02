import { ResponsiveTreeMap } from '@nivo/treemap';
import _ from 'underscore';

export function MyResponsiveTreeMap({ data }) {
  if (!data) return null;
  data['children'] = _.sortBy(data['children'], 'value').reverse();

  return (
    <ResponsiveTreeMap
      data={data}
      identity="name"
      value="value"
      label="id"
      valueFormat=".02s"
      margin={{ top: 10, right: 20, bottom: 20 }}
      labelSkipSize={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.2]]
      }}
      parentLabelPosition="top"
      parentLabelTextColor={{
        from: 'color',
        modifiers: [['darker', 2]]
      }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1]]
      }}
      // onClick={(e) => {
      //   router.push(`/neighborhoods/${e['id']}`);
      // }}
    />
  );
}
