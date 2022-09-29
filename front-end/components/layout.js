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
import { FormClose, Notification } from 'grommet-icons';
import { AppBar } from './appBar';
import theme from '../styles/theme';

// bar chart
import { MyResponsiveBar } from '../components/barChart';
import chartData from '../data/chartData.json';
import { countByCategory } from '../lib/transformData';

export const Layout = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);

  var crimeCounts = countByCategory(props.crimes, 'neighborhood');

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <>
            <Box fill>
              <AppBar background={'brand'}>
                <Heading level="3" margin="none">
                  Crime
                </Heading>
                <Button
                  icon={<Notification />}
                  onClick={() => setShowSidebar(!showSidebar)}
                />
              </AppBar>
              <Box
                background={'light-2'}
                direction="row"
                flex
                overflow={{ horizontal: 'hidden' }}
              >
                <Box flex align="center" justify="center">
                  <MyResponsiveBar
                    data={countByCategory(props.crimes, 'crime_against')}
                    layout={'horizontal'}
                  />
                  <MyResponsiveBar
                    data={countByCategory(props.crimes, 'offense_category')}
                    layout={'vertical'}
                  />
                  <MyResponsiveBar
                    data={countByCategory(props.crimes, 'offense')}
                    layout={'horizontal'}
                  />
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
};
