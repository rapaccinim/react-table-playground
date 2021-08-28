/**
 * Page with React Table basic examples implemented TypeScript.
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { SimpleTable } from '../components/basic-components/simple-table';
import { Sorting } from '../components/basic-components/sorting';
import { Pagination } from '../components/basic-components/pagination';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
}

export const Basic = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Basic Table"/>
        <Tab label="Basic Sorting" />
        <Tab label="Basic Pagination" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SimpleTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Sorting/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Pagination/>
      </TabPanel>
    </Paper>
  );
}
