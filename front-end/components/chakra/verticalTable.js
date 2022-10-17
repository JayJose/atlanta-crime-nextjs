import { HStack, Text, VStack } from '@chakra-ui/react';
import { getYoyChange, toTitleCase } from '../../lib/transformStrings';

export function MyVerticalTable({ data }) {
  return (
    <VStack alignItems={'left'}>
      {data.map((o) => (
        <VStack
          alignItems={'left'}
          key={o.offense_category}
          borderBottom={'1px solid #6FFFB0'}
        >
          <Text>{toTitleCase(o.offense_category)}</Text>
          <HStack>
            {getYoyChange(o._2021, o._2022)}{' '}
            <Text>{o._2022.toLocaleString()}</Text>
          </HStack>
        </VStack>
      ))}
    </VStack>
  );
}
