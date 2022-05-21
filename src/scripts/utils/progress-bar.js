import ProgressBar from 'progressbar.js';

const progressIndicator = (dataTrans) => {
  dataTrans.forEach((item) => {
    const bar = new ProgressBar.Line(`#card${item.id}`, {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      color: '#03045e',
      trailColor: '#eee',
      trailWidth: 10,
      svgStyle: { width: '100%', height: '10px' },
      from: { color: '#82954B' },
      to: { color: '#ED6A5A' },
      text: {
        style: {
          // Text color.
          // Default: same as stroke color (options.color)
          color: '#caf0f8',
          position: 'absolute',
          right: '0',
          top: '-15px',
          padding: 0,
          margin: 0,
          transform: null,
        },
        autoStyleContainer: false,
      },
      step: (state, bar) => {
        bar.setText(`${Math.round(bar.value() * 100)} %`);
        bar.path.setAttribute('stroke', state.color);
      },
    });

    bar.animate(item.use / item.max); // Number from 0.0 to 1.0
  });
};

export default progressIndicator;
