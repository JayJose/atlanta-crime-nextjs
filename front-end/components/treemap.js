import { ResponsiveTreeMap } from '@nivo/treemap';
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
      label="id"
      orientLabel="false"
      valueFormat=".02s"
      colors={{ scheme: 'pink_yellowGreen' }}
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
        router.push(`/neighborhoods/${e['id']}`);
      }}
    />
  );
}
