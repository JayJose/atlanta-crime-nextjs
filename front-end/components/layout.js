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
import { FormClose, Code, Home } from 'grommet-icons';
import { AppBar } from './appBar';
import Link from 'next/link';

import theme from '../styles/theme';
import { useRouter } from 'next/router';

export function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const { asPath } = useRouter();
  console.log(asPath);

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
                  {asPath !== '/' ? (
                    <Link href="/">
                      <Button icon={<Home color="black" />} />
                    </Link>
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
                <Box flex align="start" justify="center" margin="small">
                  {children}
                </Box>
                {!showSidebar || size !== 'small' ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      flex
                      width="medium"
                      background="light-2"
                      elevation="small"
                      align="center"
                      justify="center"
                    >
                      sidebar
                    </Box>
                  </Collapsible>
                ) : (
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
                        onClick={() => setShowSidebar(false)}
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
                )}
              </Box>
            </Box>
          </>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}
