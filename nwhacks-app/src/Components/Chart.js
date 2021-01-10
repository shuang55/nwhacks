import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { getExpensesForThisMonth } from '../repository';
import '../chart.css';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}


const Chart = () => {
  const theme = useTheme();

  const [expenses, setExpenses] = useState([]);
  const [date, setDate] = useState([]);

    useEffect(() => {
        const d = new Date();
        const month = d.toLocaleString('default', { month: 'long' });
        setDate(month + " " + d.getFullYear());
        const userInfo = JSON.parse(localStorage.getItem('user'));
        
        getExpensesForThisMonth(userInfo['userID'])
            .then((res) => {
                const expenses = res.data.expenses.map((expenses) => {
                    return {
                        date: new Date(expenses['date']).toDateString(),
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
      <Title>{date}</Title>
      <ResponsiveContainer>
        <LineChart
          data={expenses}
          margin={{
            top: 20,
            right: 16,
            bottom: 16,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Spendings ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default Chart;