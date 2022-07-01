import LandingPage from '../views/pages/landing-page';
import LoginPage from '../views/pages/login-page';
import Registration from '../views/pages/registration-page';
import Profile from '../views/pages/profile';
import editProfile from '../views/pages/edit-profile';
import BerandaPage from '../views/pages/beranda';
import LaporanPage from '../views/pages/laporan';
import TransaksiPage from '../views/pages/transaksi';
import RencanaPage from '../views/pages/rencana';
import TagihanPage from '../views/pages/tagihan';
import Budget from '../views/pages/halaman-budget';
import Notifications from '../views/pages/notifications';
import Category from '../views/pages/category';
import AddTagihanPage from '../views/pages/add-tagihan';
import logout from '../utils/logout';
import PageNotfound from '../views/pages/page-notfound';

const routes = {
  '/': LandingPage,
  '/login': LoginPage,
  '/registration': Registration,
  '/logout': logout(),
  '/profile': Profile,
  '/edit-profile': editProfile,
  '/beranda': BerandaPage,
  '/budget': Budget,
  '/laporan/:id/:verb': LaporanPage,
  '/transaksi/:id': TransaksiPage,
  '/rencana': RencanaPage,
  '/tagihan': TagihanPage,
  '/add-tagihan': AddTagihanPage,
  '/edit-tagihan/:id': AddTagihanPage,
  '/notifikasi': Notifications,
  '/category/:id': Category,
  '/404': PageNotfound,
};

export default routes;
