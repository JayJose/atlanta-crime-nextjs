import {
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Link
} from '@chakra-ui/react';

import { HamburgerIcon, ExternalLinkIcon } from '@chakra-ui/icons';

export default function Menu() {
  return (
    <ChakraMenu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon w={6} h={6} color="brand.100" />}
            background={'black'}
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
    </ChakraMenu>
  );
}
