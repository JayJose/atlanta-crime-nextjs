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
import { FormClose, Sidebar, Home, LineChart } from 'grommet-icons';
import { AppBar } from './appBar';
import Link from 'next/link';

import theme from '../styles/theme';

// bar chart
import { countByCategory } from '../lib/transformData';
import { MyResponsiveTreeMap } from './treemap';

export function Layout(props) {
  const [showSidebar, setShowSidebar] = useState(false);

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
                  <Link href="/">
                    <Button icon={<Home />} />
                  </Link>
                  <Button
                    icon={<Sidebar />}
                    onClick={() => setShowSidebar(!showSidebar)}
                  />
                </Box>
              </AppBar>
              <Box
                background={'light-2'}
                direction="row"
                flex
                overflow={{ horizontal: 'hidden' }}
              >
                <Box flex align="center" justify="center">
                  <MyResponsiveTreeMap
                    data={{
                      name: 'crimes',
                      children: countByCategory(props.crimes, 'neighborhood')
                    }}
                  ></MyResponsiveTreeMap>
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
