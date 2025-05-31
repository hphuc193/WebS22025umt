export const up = async (db, client) => {
  await db.collection("motorbikes").insertMany([
    { stt: 1, name: "Honda Blade số", pricePerDay: 100000, quantity: 3 },
    { stt: 2, name: "Honda Wave số", pricePerDay: 110000, quantity: 4 },
    { stt: 3, name: "Yamaha Exciter", pricePerDay: 120000, quantity: 7 },
    { stt: 4, name: "Honda SH", pricePerDay: 105000, quantity: 2 },
    { stt: 5, name: "Honda Future", pricePerDay: 200000, quantity: 3 },
    { stt: 6, name: "Yamaha Sirius", pricePerDay: 150000, quantity: 5 },
    { stt: 7, name: "Suzuki Viva", pricePerDay: 100000, quantity: 11 },
    { stt: 8, name: "Piagio Liberty", pricePerDay: 110000, quantity: 6 },
    { stt: 9, name: "Honda Click", pricePerDay: 120000, quantity: 12 },
    { stt: 10, name: "Yamaha FZ", pricePerDay: 125000, quantity: 8 }
  ]);
};

export const down = async (db, client) => {
  await db.collection("motorbikes").deleteMany({});
};
