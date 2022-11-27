import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext
} from 'grommet';
import { FormClose, Code, Home, Map } from 'grommet-icons';
import { AppBar } from './appBar';
import Link from 'next/link';

import theme from '../styles/theme';
import { useRouter } from 'next/router';

export function Layout({ children }) {
  const [showMap, setShowMap] = useState(false);

  const { asPath } = useRouter();
  const showHomeIcon = asPath.match(/^\/$/) ? false : true;
  const showMapIcon = asPath.match(/neighborhoods\/[a-z]+/) ? true : false;

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <>
            <Box fill>
              <AppBar background={'brand'}>
                <Heading level="3" margin="none">
                  Crime sucks!
                </Heading>
                <Box direction="row">
                  {showHomeIcon ? (
                    <Link href="/">
                      <Button icon={<Home color="black" />} />
                    </Link>
                  ) : null}
                  {showMapIcon ? (
                    <Button
                      icon={<Map color="black" />}
                      onClick={() => setShowMap(true)}
                    />
                  ) : null}
                  <Button
                    icon={<Code color="black" />}
                    href="https://github.com/JayJose/atlanta-crime-nextjs#readme"
                  />
                </Box>
              </AppBar>
              <Box
                background={'background'}
                direction="row"
                flex
                overflow={{ horizontal: 'hidden' }}
              >
                {children}

                {showMap ? (
                  <Layer>
                    <Box
                      background="light-2"
                      tag="header"
                      justify="end"
                      align="center"
                      direction="row"
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => setShowMap(false)}
                      />
                    </Box>
                    <Box
                      fill
                      background="light-2"
                      align="center"
                      justify="center"
                    >
                      sidebar
                    </Box>
                  </Layer>
                ) : null}
              </Box>
            </Box>
          </>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}
