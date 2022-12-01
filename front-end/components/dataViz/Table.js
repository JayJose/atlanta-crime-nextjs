import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';

import { toTitleCase, getYoyChange } from '../../lib/transformStrings';

export default function Table({ data }) {
  return (
    <ChakraTable
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
          <Th color={'white'}>Crime </Th>
          <Th color={'white'}>Crimes in 2022</Th>
          <Th color={'white'}>YoY Change</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((o) => (
          <Tr key={o.offense_category}>
            <Td
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: '1px'
              }}
            >
              {toTitleCase(o.offense_category)}
            </Td>
            <Td>{o._2022.toLocaleString()}</Td>
            <Td>{getYoyChange(o._2021, o._2022)}</Td>
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  );
}
