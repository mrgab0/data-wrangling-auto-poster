import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import GridDolar from './GridDolar';
import { makeStyles } from '@material-ui/core/styles';


const chartStyles = makeStyles({
  table: {
    minWidth: 70,
	
  },
});


// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}


const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart() {
  const tema = chartStyles();

  return (
    <React.Fragment classes>
      <Title className={tema.table}>Precio Del Dolar Hoy </Title>
      
	  <GridDolar />
	  
    </React.Fragment>
  );
}
