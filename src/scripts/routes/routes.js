import LandingPage from '../views/pages/landing-page';
import LoginPage from '../views/pages/login-page';
import BerandaPage from '../views/pages/beranda';
import LaporanPage from '../views/pages/laporan';
import TransaksiPage from '../views/pages/transaksi';
import RencanaPage from '../views/pages/rencana';
import TagihanPage from '../views/pages/tagihan';
import Notifications from '../views/pages/notifications';
import Category from '../views/pages/category';

const routes = {
  '/': LandingPage,
  '/login': LoginPage,
  '/beranda': BerandaPage,
  '/laporan': LaporanPage,
  '/transaksi/:id': TransaksiPage,
  '/rencana': RencanaPage,
  '/tagihan': TagihanPage,
  '/notifikasi': Notifications,
  '/category/:id': Category,
};

export default routes;
