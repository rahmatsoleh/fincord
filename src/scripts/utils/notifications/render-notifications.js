import { nanoid } from 'nanoid';
import moment from 'moment';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import NotificationsIdb from '../../data/idb/notifications-idb';
import NotificationHelper from './notification-helper';

const notions = [
  {
    _id: `notif-${nanoid(16)}`,
    idFK: 'bills-GXC1nU8kcTAR8pU9',
    title: 'Sewa Kamera',
    tag: 7,
    date: moment().format('YYYY-MM-DD'),
    dateline: '2022-06-28',
    desc: 'Kurang 7 hari lagi',
    read: false,
  },
  {
    _id: `notif-${nanoid(16)}`,
    idFK: 'bills-IBA-D_P7NuZz7yT6',
    title: 'Cicilan Motor',
    tag: 7,
    date: moment().format('YYYY-MM-DD'),
    dateline: '2022-07-03',
    desc: 'Kurang 7 hari lagi',
    read: false,
  },
  {
    _id: `notif-${nanoid(16)}`,
    idFK: 'bills-YO9bwY4sBD3fwnAL',
    title: 'Bayar Hutang',
    tag: 7,
    date: moment().format('YYYY-MM-DD'),
    dateline: '2022-06-29',
    desc: 'Kurang 7 hari lagi',
    read: true,
  },
];

const RenderNotifications = async () => {
  const dataTagihan = await TagihanItemIdb.getAllData();
  const dataNotifications = await NotificationsIdb.getAllData();
  const tempNotifications = [];

  dataTagihan.forEach((bill) => {
    const dateNow = moment().startOf('day');
    const datePay = moment(bill.date, 'YYYY-MM-DD');
    const differentOfDay = moment.duration(datePay.diff(dateNow)).asDays();
    const filterNotif = dataNotifications.filter((data) => data.idFK === bill._id).filter((data) => data.dateline === bill.date).filter((data) => data.tag < differentOfDay);

    if (!bill.paid && !filterNotif.length && differentOfDay <= 7) {
      tempNotifications.push({
        _id: `notif-${nanoid(16)}`,
        idFK: bill._id,
        title: bill.name,
        tag: differentOfDay,
        date: moment().format('YYYY-MM-DD'),
        dateline: bill.date,
        desc: `Kurang ${differentOfDay} hari lagi.`,
        read: false,
      });
    }
  });

  tempNotifications.forEach(async (item) => {
    await NotificationHelper.sendNotification({
      title: item.title,
      options: {
        body: `Pembayaran anda ${item.desc}, yukk sisihkan uangmu.`,
        image: 'http://localhost:8080/app.png',
      },
    });
    console.log(item);
  });
};

export default RenderNotifications;