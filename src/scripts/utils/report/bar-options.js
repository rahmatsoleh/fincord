import { commaSeparateNumber } from '../number';

const barOptions = (dataIn, dataOut, monthName = '', year = new Date().getFullYear()) => {
  const options = {
    chart: {
      type: 'bar',
      // stacked: true,
      height: 250,
      stackedType: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    series: [
      {
        name: 'masuk',
        color: '#0077b6',
        data: dataIn,
      },
      {
        name: 'keluar',
        color: '#C73E1D',
        data: dataOut,
      },
    ],
    xaxis: {
      type: 'category',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val) => `Rp ${commaSeparateNumber(val)}`,
      },
    },
    title: {
      text: `${monthName} ${year}`,
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: true,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'roboto',
        color: '#03045e',
      },
    },
  };

  return options;
};

export default barOptions;
