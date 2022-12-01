import { HStack, Heading, Flex, IconButton, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Help, Home, Map } from 'grommet-icons';

import Menu from './Menu';

export function MyHeader() {
  const router = useRouter();
  return (
    <>
      <Flex
        width={'100%'}
        top="0"
        justifyContent={'space-between'}
        position="sticky"
        zIndex={1}
        p={2}
        background={'black'}
        borderBottom={'2px solid #6FFFB0'}
      >
        <Menu />
        <Heading size="lg" fontWeight={300} color="white">
          Atlanta Crime
        </Heading>
        <HStack spacing={0}>
          <IconButton
            onClick={() => router.push('/')}
            bg={'black'}
            icon={<Help color="#6fffb0" />}
          />
          <IconButton
            onClick={() => router.push('/')}
            bg={'black'}
            icon={<Map color="#6fffb0" />}
          />
          {router.pathname === '/' ? null : (
            <IconButton
              onClick={() => router.push('/')}
              bg={'black'}
              icon={<Home color="#6fffb0"></Home>}
            ></IconButton>
          )}
        </HStack>
      </Flex>
    </>
  );
}
