import {
  Text,
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

import { HamburgerIcon, ExternalLinkIcon } from '@chakra-ui/icons';

export function MyHeader({ openDrawer, openModal }) {
  return (
    <>
      <Flex width={'100%'}>
        <Box p="0">
          <Heading fontWeight={300}>Crime!</Heading>
          <Text fontWeight={200}>Crime in Atlanta, Georgia, USA</Text>
        </Box>
        <Spacer />
        <Box>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon w={6} h={6} color="#6FFFB0" />}
                  mr={4}
                  mt={4}
                  background={'black'}
                  maxH={7}
                >
                  {isOpen ? 'Close' : 'Open'}
                </MenuButton>
                <MenuList
                  fontSize={'14px'}
                  fontWeight={200}
                  background="#6FFFB0"
                  textColor={'black'}
                >
                  <MenuItem onClick={openModal}>View data</MenuItem>
                  <MenuItem onClick={openDrawer}>
                    View student & teacher demographics
                  </MenuItem>
                  <MenuItem>
                    <Link href="https://arkspecialists.com">
                      ARK Specialists <ExternalLinkIcon />
                    </Link>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </Flex>
    </>
  );
}
