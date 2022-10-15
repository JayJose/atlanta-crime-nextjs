import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SmallAddIcon,
  TriangleDownIcon,
  TriangleUpIcon
} from '@chakra-ui/icons';
import { Box, HStack, Text } from '@chakra-ui/react';

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function formatNumbers(str) {
  let val = str;
  return Number(val).toLocaleString();
}

export function getYoyChange(a, b) {
  function getIcon(value, icon) {
    if ((icon === 'triangle') & (value > 0)) {
      return <TriangleUpIcon color="red" />;
    } else if ((icon === 'triangle') & (value <= 0)) {
      return <TriangleDownIcon color="green" />;
    } else if (icon === 'plus') {
      return <SmallAddIcon color="white" />;
    }
  }

  let yoy_change = b / a - 1;
  let icon = 'triangle';

  if (a + b === 0) {
    yoy_change = 0;
  } else if (a === 0) {
    yoy_change = b;
    icon = 'plus';
  }

  return (
    <>
      <HStack>
        {getIcon(yoy_change, icon)}
        <Text>
          {icon === 'triangle'
            ? yoy_change.toLocaleString('en-US', {
                style: 'percent'
              })
            : yoy_change.toLocaleString('en-US')}
        </Text>
      </HStack>
    </>
  );
}
