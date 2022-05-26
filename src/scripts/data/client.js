const idbStorage = {
  id: 'asjasldaughsdasdasdkuyqgwdjba',
  created_at: '2015-03-25T12:00:00-06:30',
  updated_at: '2015-03-25T12:00:00-06:35',
  email: 'milyasarmans13@gmail.com',
  password: 'asdfg245MKOdn6H',
  username: 'ilyasajach',
  name: 'M Ilyas Arman S',
  address: 'Pringsewu, Lampung',
  phone: '08128693543534',
  profile: 'ilyas.jpg',
  transaksi: {
    pemasukan: {
      created_at: '2022-05-12T12:00:00-06:30',
      updated_at: '2022-05-12T12:00:00-06:30',
      data: [
        {
          id: 'kuyfaksuyfghjvasd',
          created_at: '2022-05-12T12:00:00-06:30',
          updated_at: '2022-05-12T12:00:00-06:30',
          title: 'Gaji Pokok',
          data: [
            {
              id: 'jhgafsdhgvasdktygafsdghasd',
              count: 5000000,
              date: '12 Mei 2022',
              desc: '',
            },
          ],
        },
      ],
    },
    pengeluaran: {
      created_at: '2015-03-25T12:00:00-06:35',
      updated_at: '2015-03-25T12:00:00-06:35',
      data: [
        {
          id: 'kuyfaksuyfghjvasd',
          created_at: '2022-05-12T12:00:00-06:30',
          updated_at: '2022-05-12T12:00:00-06:30',
          title: 'Transportasi',
          limited: 1500000,
          data: [
            {
              id: 'jhgafsdhgvasdktygafsdghasd',
              count: 5000000,
              date: '12 Mei 2022',
              desc: '',
            },
          ],
        },
      ],
    },
  },
  saving_plan: {
    created_at: '2015-03-25T12:00:00-06:35',
    updated_at: '2015-03-25T12:00:00-06:35',
    data: [
      {
        id: 'kuahvbsdkjhgasdjhagsd',
        created_at: '2015-03-25T12:00:00-06:35',
        updated_at: '2015-03-25T12:00:00-06:35',
        name: 'Beli PC',
        nominal: 12000000,
        dateline: '20 Agustus 2022',
        history: [
          {
            id: 'kgfaskhgdasdads',
            date: '12 Mei 2022',
            save: 50000,
          },
        ],
      },
    ],
  },
  bills: {
    created_at: '2015-03-25T12:00:00-06:35',
    updated_at: '2015-03-25T12:00:00-06:35',
    data: [
      {
        id: 'khjagksjhegakhjsge',
        created_at: '2015-03-25T12:00:00-06:35',
        updated_at: '2015-03-25T12:00:00-06:35',
        name: 'Pembayaran Wifi',
        nominal: 150000,
        date: '12 Mei 2022',
        remember: true,
        remember_before: 7,
        remember_time: '00:00',
      },
    ],
  },
  notifications: {
    created_at: '2015-03-25T12:00:00-06:35',
    updated_at: '2015-03-25T12:00:00-06:35',
    data: [
      {
        id: 'aasdasdasjdand',
        tag: 'Waktunya bayar',
        name: 'Pembayaran Wifi',
        date: '12 Mei 2022',
        link: '/#/tagihan/12313231',
        desc: 'lorem ipsum sit amet dolor',
        is_reading: false,
      },
    ],
  },
};

export default idbStorage;
