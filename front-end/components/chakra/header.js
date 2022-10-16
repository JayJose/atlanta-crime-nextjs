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
import { toTitleCase } from '../../lib/transformStrings';

export function MyHeader({ openDrawer, openModal, title = 'Atlanta' }) {
  return (
    <>
      <Flex width={'100%'} borderBottom={'2px solid #6FFFB0'}>
        <Box p="0">
          <Heading size="lg" fontWeight={300}>
            Crime sucks!
          </Heading>
          <Text fontWeight={300}>Crime in {toTitleCase(title)}</Text>
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
        </Box>
      </Flex>
    </>
  );
}
