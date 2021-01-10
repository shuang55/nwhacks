import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getExpensesForThisMonth } from '../repository';

// Generate Order Data
function createData(date, name, quantity, amount) {
  return { date, name, quantity, amount };
}


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = () => {
    const classes = useStyles();

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        getExpensesForThisMonth(userInfo['userID'])
            .then((res) => {
                const expenses = res.data.expenses.map((expenses) => {
                    return {
                        date: new Date(expenses['date']).toDateString(),
                        name: expenses['item_name'],
                        amount: expenses['price'],
                        quantity: expenses['quantity']
                    };
                });
                setExpenses(expenses);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  
    return (
        <React.Fragment>
        <Title>Recent Purchases</Title>
        <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {expenses.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <div className={classes.seeMore}>
            <Link color="primary" href="/expenses">
            See more
            </Link>
        </div>
        </React.Fragment>
    );
}

export default Orders;