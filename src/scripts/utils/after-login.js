import FincordApi from '../data/api/fincord-api';
import UrlParser from '../routes/url-parser';

const AfterLogin = async () => {
  const dataFromLocal = localStorage.getItem('appFin');

  if (dataFromLocal) {
    const dataId = JSON.parse(dataFromLocal).id;
    await FincordApi.getAllData(dataId);
    localStorage.setItem('loginfin', JSON.stringify(dataId));
    window.location.href = '/#/beranda';
    return dataFromLocal;
  }

  const url = UrlParser.parseActiveUrlWithCombiner();

  if (url !== '/') window.location.href = '/';
};

export default AfterLogin;
