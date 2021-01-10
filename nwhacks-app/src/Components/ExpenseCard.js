import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { TableChartOutlined } from '@material-ui/icons';
import blueGrey from '@material-ui/core/colors/blueGrey'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      backgroundColor: '#212936',
  },
}))(TableRow);

const StyledTablePagination = withStyles((theme) => ({
  root: {
      backgroundColor: '#212936',
  },
}))(TablePagination);


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'vendor', label: 'Vendor', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
  },
];

function createData(name, vendor, price, date) {
  return { name, vendor, price, date };
}

const rows = [
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),  
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),  
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),  
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),  
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),  
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),  
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),  
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),  
  createData('Ice Cream', 'Dairy Queen', 132, "Feb 15"),
];

const useStyles = makeStyles({
  root: {
    width:  '50%',
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell classNamekey={column.vendor} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}