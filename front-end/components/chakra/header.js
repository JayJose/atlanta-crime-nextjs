import {
  Text,
  HStack,
  Heading,
  Spacer,
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Link
} from '@chakra-ui/react';

import { useRouter } from 'next/router';

import { HamburgerIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Home } from 'grommet-icons';
import { toTitleCase } from '../../lib/transformStrings';

export function MyHeader({ openDrawer, openModal }) {
  const router = useRouter();
  return (
    <>
      <Flex
        width={'100%'}
        top="0"
        position="sticky"
        zIndex={1}
        p={2}
        background={'black'}
        borderBottom={'2px solid #6FFFB0'}
      >
        <Box p="0" color="brand.0">
          <Heading size="lg" fontWeight={300}>
            Atlanta Crime
          </Heading>
        </Box>
        <Spacer />
        <HStack spacing={2}>
          {router.pathname === '/' ? null : (
            <IconButton
              onClick={() => router.push('/')}
              bg={'black'}
              icon={<Home color="#6fffb0"></Home>}
            ></IconButton>
          )}
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon w={6} h={6} color="brand.100" />}
                  background={'black'}
                  maxH={7}
                >
                  {isOpen ? 'Close' : 'Open'}
                </MenuButton>
                <MenuList
                  fontSize={'14px'}
                  fontWeight={200}
                  background="brand.200"
                  textColor={'black'}
                >
                  <MenuItem>
                    <Link href="https://arkspecialists.com">
                      ARK Specialists <ExternalLinkIcon />
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="https://github.com/JayJose/atlanta-crime-nextjs">
                      View the repo <ExternalLinkIcon />
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="https://www.atlantapd.org/i-want-to/crime-data-downloads">
                      Get the data <ExternalLinkIcon />
                    </Link>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </HStack>
      </Flex>
    </>
  );
}
