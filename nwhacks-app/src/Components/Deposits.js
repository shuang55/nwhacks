import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { getExpensesForThisMonth } from '../repository';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = () => {
  const classes = useStyles();

  const [expenses, setExpenses] = useState([]);
  const [date, setDate] = useState([]);
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        const d = new Date();
        const month = d.toLocaleString('default', { month: 'long' })
        setDate(month + " " + d.getFullYear())
        getExpensesForThisMonth(userInfo['userID'])
            .then((res) => {
                const exp = res.data.expenses.map((expenses) => {
                    return {
                        price: expenses['price']
                    };
                });
                return exp;
            }).then((exp) => {
                console.log(exp)
                let sum = 0;
                exp.forEach(exp => {
                    sum += parseFloat(exp.price);
                });
                console.log(sum)
                setExpenses(sum);
                console.log(expenses)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  return (
    <React.Fragment>
      <Title>Total Spendings</Title>
      <Typography component="p" variant="h4">
        ${expenses}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {date}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View expenses
        </Link>
      </div>
    </React.Fragment> 
  );
}

export default Deposits;