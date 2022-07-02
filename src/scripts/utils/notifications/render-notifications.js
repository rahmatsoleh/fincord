import { nanoid } from 'nanoid';
import moment from 'moment';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import NotificationsIdb from '../../data/idb/notifications-idb';
import NotificationHelper from './notification-helper';
import FincordApi from '../../data/api/fincord-api';

const RenderNotifications = async () => {
  const dataLocal = localStorage.getItem('appFin');
  const userId = JSON.parse(dataLocal).id;
  const dataTagihan = await TagihanItemIdb.getAllData();
  const dataNotifications = await NotificationsIdb.getAllData();
  const tempNotifications = [];

  dataTagihan.forEach((bill) => {
    const dateNow = moment().startOf('day');
    const datePay = moment(bill.date, 'YYYY-MM-DD');
    const differentOfDay = moment.duration(datePay.diff(dateNow)).asDays();
    const filterNotif = dataNotifications.filter((data) => data.idFK === bill._id).filter((data) => data.dateline === bill.date);

    if (!bill.paid && !filterNotif.length && differentOfDay <= 7) {
      tempNotifications.push({
        _id: `notif-${nanoid(16)}`,
        idFK: bill._id,
        title: bill.name,
        tag: differentOfDay,
        date: moment().format('YYYY-MM-DD'),
        dateline: bill.date,
        desc: differentOfDay < 0 ? `Terlambat ${Math.abs(differentOfDay)} hari.` : `Kurang ${differentOfDay} hari.`,
        read: false,
      });
    }
  });

  tempNotifications.forEach(async (item) => {
    await NotificationHelper.sendNotification({
      title: item.title,
      options: {
        body: `Pembayaran anda ${item.desc}, yukk sisihkan uangmu.`,
      },
    });

    await NotificationsIdb.putData(item);
  });
};

export default RenderNotifications;
