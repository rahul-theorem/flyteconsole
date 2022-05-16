import * as React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { contentMarginGridUnits } from 'common/layout';
import { Core } from 'flyteidl';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: theme.spacing(1),
  },
  headerText: {
    fontWeight: 700,
    color: '#B3B3B3',
  },
  table: {
    marginLeft: theme.spacing(contentMarginGridUnits),
  },
}));

interface MyProps {
  rows: Core.IKeyValuePair[];
}

export default function BasicTable({ rows }: MyProps) {
  const styles = useStyles();

  if (!rows || rows.length == 0) {
    return <Typography>Empty</Typography>;
  }
  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              {' '}
              <Typography className={styles.headerText}>Key </Typography>
            </TableCell>
            <TableCell>
              <Typography className={styles.headerText}>Value </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
