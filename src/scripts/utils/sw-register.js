const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/service-worker.js');
    return;
  }

  console.warn('Service worker not supported in this browser');
};

export default swRegister;
