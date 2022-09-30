import { ResponsiveTreeMap } from '@nivo/treemap';
import Link from 'next/link';
import _ from 'underscore';
import { useRouter } from 'next/router';

export function MyResponsiveTreeMap({ data }) {
  if (!data) return null;
  data['children'] = _.sortBy(data['children'], 'value').reverse();

  const router = useRouter();

  return (
    <ResponsiveTreeMap
      data={data}
      identity="name"
      value="value"
      valueFormat=".02s"
      colors={{ scheme: 'red_blue' }}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      labelSkipSize={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.2]]
      }}
      parentLabelPosition="left"
      parentLabelTextColor={{
        from: 'color',
        modifiers: [['darker', 2]]
      }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.1]]
      }}
      onClick={(e) => {
        let select = e['id'];
        router.push(`/neighborhoods/${e['id']}`);
      }}
    />
  );
}
