import ApexCharts from 'apexcharts';
import pageRender from '../../utils/page-render';
import '../container/report-container';

const LaporanPage = {
  async render() {
    pageRender('laporan', 'app');
    return '<report-container>Halaman Laporan</report-container>';
  },

  async afterRender() {
    const divChart = document.querySelector('#chart');
    const navBarMenu = document.querySelectorAll('nav ul li a');

    const windowWidth = () => {
      if (window.innerWidth >= 1024) return 300;
      return 'auto';
    };

    const options = {
      chart: {
        type: 'line',
        stacked: true,
        height: windowWidth(),
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'masuk',
          color: '#FF0000',
          data: [
            {
              x: '1',
              y: 5000000,
            },
            {
              x: '2',
              y: 0,
            },
            {
              x: '3',
              y: 0,
            },
            {
              x: '4',
              y: 600000,
            },
            {
              x: '5',
              y: 0,
            },
            {
              x: '6',
              y: 0,
            },
            {
              x: '7',
              y: 1000000,
            },
            {
              x: '8',
              y: 50000,
            },
            {
              x: '9',
              y: 0,
            },
            {
              x: '10',
              y: 110000,
            },
            {
              x: '11',
              y: 700000,
            },
            {
              x: '12',
              y: 0,
            },
            {
              x: '13',
              y: 0,
            },
            {
              x: '14',
              y: 0,
            },
            {
              x: '15',
              y: 900000,
            },
            {
              x: '16',
              y: 0,
            },
            {
              x: '17',
              y: 0,
            },
            {
              x: '18',
              y: 0,
            },
            {
              x: '19',
              y: 0,
            },
            {
              x: '20',
              y: 0,
            },
            {
              x: '21',
              y: 0,
            },
            {
              x: '22',
              y: 0,
            },
            {
              x: '23',
              y: 0,
            },
            {
              x: '24',
              y: 0,
            },
            {
              x: '25',
              y: 300000,
            },
            {
              x: '26',
              y: 0,
            },
            {
              x: '27',
              y: 0,
            },
            {
              x: '28',
              y: 0,
            },
            {
              x: '29',
              y: 0,
            },
            {
              x: '30',
              y: 0,
            },
            {
              x: '31',
              y: 1000000,
            },
          ],
        },
        {
          name: 'keluar',
          color: '#00FF00',
          data: [
            {
              x: '1',
              y: 0,
            },
            {
              x: '2',
              y: 2000000,
            },
            {
              x: '3',
              y: 50000,
            },
            {
              x: '4',
              y: 100000,
            },
            {
              x: '5',
              y: 20000,
            },
            {
              x: '6',
              y: 0,
            },
            {
              x: '7',
              y: 100000,
            },
            {
              x: '8',
              y: 120000,
            },
            {
              x: '9',
              y: 10000,
            },
            {
              x: '10',
              y: 110000,
            },
            {
              x: '11',
              y: 70000,
            },
            {
              x: '12',
              y: 30000,
            },
            {
              x: '13',
              y: 200000,
            },
            {
              x: '14',
              y: 50000,
            },
            {
              x: '15',
              y: 90000,
            },
            {
              x: '16',
              y: 10000,
            },
            {
              x: '17',
              y: 120000,
            },
            {
              x: '18',
              y: 20000,
            },
            {
              x: '19',
              y: 0,
            },
            {
              x: '20',
              y: 0,
            },
            {
              x: '21',
              y: 720000,
            },
            {
              x: '22',
              y: 0,
            },
            {
              x: '23',
              y: 20000,
            },
            {
              x: '24',
              y: 30000,
            },
            {
              x: '25',
              y: 30000,
            },
            {
              x: '26',
              y: 0,
            },
            {
              x: '27',
              y: 0,
            },
            {
              x: '28',
              y: 0,
            },
            {
              x: '29',
              y: 1000000,
            },
            {
              x: '30',
              y: 100000,
            },
            {
              x: '31',
              y: 500000,
            },
          ],
        },
      ],
      xaxis: {
        type: 'category',
      },
    };

    const chart = new ApexCharts(divChart, options);

    chart.render();

    navBarMenu.forEach((element) => {
      element.addEventListener('click', () => {
        chart.destroy();
      });
    });
  },
};

export default LaporanPage;
