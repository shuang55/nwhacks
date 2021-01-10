import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getExpensesForThisMonth } from '../repository';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#212936',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        color: theme.palette.common.white,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: '#212936',
    },
}))(TableRow);

const StyledPaper = styled(Paper)`
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    margin-top: 5vh;
    border: 2px;
`;

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
        label: 'Price ($)',
        minWidth: 170,
        align: 'right',
    },
];

const useStyles = makeStyles({
    root: {
        width: '70%',
        color: '#212936',
    },
});

const Expenses = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        getExpensesForThisMonth(userInfo['userID'])
            .then((res) => {
                const expenses = res.data.expenses.map((expenses) => {
                    return {
                        name: expenses['item_name'],
                        vendor: expenses['vendor_name'],
                        price: Number.parseFloat(expenses['price']).toFixed(2),
                        date: new Date(expenses['date']).toDateString(),
                    };
                });
                setExpenses(expenses);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <StyledPaper variant="outlined" elevation={3} className={classes.root}>
            <Title>
                <b>Expenses</b>
            </Title>
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
                        {expenses
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <StyledTableRow
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.name}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell
                                                    classNamekey={column.vendor}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
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
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={expenses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </StyledPaper>
    );
};

export default Expenses;
