import { useState } from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

export default function MyRadio({ value, setValue }) {
  return (
    <RadioGroup size="sm" onChange={setValue} value={value} colorScheme="white">
      <Stack direction="row">
        <Radio value="cum_value">Cumulative</Radio>
        <Radio value="value">Non-cumulative</Radio>
      </Stack>
    </RadioGroup>
  );
}
