import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { first, groupBy, isUndefined, keysIn, last, mapValues } from 'lodash';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'How many messages per day?',
    },
  },
};

export default function ChartsLine({info}:any) {
  const groupDate = mapValues(groupBy(info,"date"));
  const date = keysIn(groupDate);
  let firstDate = moment(first(date)).subtract(1,"days");
  const lastDate = moment(last(date));
  const AllDate = [];
  let stillMessage = 0;
  while (firstDate.isSameOrBefore(lastDate)) {
    AllDate.push(firstDate.format("MM/DD/YYYY"));
    firstDate.add(1,"days");
  }
  const messages = AllDate.map((date,key)=>{
    if(!isUndefined(groupDate[date])){
      stillMessage = stillMessage+groupDate[date].length;
      return stillMessage;
    }else{
      return stillMessage;
    }
  })
  const data = {
    labels:AllDate,
    datasets: [
      {
        label: 'messages',
        data: messages,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}
