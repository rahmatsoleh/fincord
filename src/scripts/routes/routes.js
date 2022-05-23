import LandingPage from '../views/pages/landing-page';
import LoginPage from '../views/pages/login-page';
import Registration from '../views/pages/registration-page';
import BerandaPage from '../views/pages/beranda';
import LaporanPage from '../views/pages/laporan';
import TransaksiPage from '../views/pages/transaksi';
import RencanaPage from '../views/pages/rencana';
import TagihanPage from '../views/pages/tagihan';
import Notifications from '../views/pages/notifications';

const routes = {
  '/': LandingPage,
  '/login': LoginPage,
  '/registration': Registration,
  '/beranda': BerandaPage,
  '/laporan': LaporanPage,
  '/transaksi': TransaksiPage,
  '/rencana': RencanaPage,
  '/tagihan': TagihanPage,
  '/notifikasi': Notifications,
};

export default routes;
