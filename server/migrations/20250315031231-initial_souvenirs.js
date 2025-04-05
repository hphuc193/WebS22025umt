export const up = async (db, client) => {
  await db.collection("souvenirs").insertMany([
    { stt: 1, name: "Dầu gội Thiên Hương", price: 27000, description: "Giá cho 1 chai." },
    { stt: 2, name: "Sữa tắm Thiên Hương", price: 42000, description: "Giá cho 1 chai" },
    { stt: 3, name: "Đồ ngủ đôi Thiên Hương size S", price: 330000, description: "Hai bộ gồm quần và áo cho nam và nữ size S" },
    { stt: 4, name: "Đồ ngủ đôi Thiên Hương size M", price: 430000, description: "Hai bộ gồm quần và áo cho nam và nữ size M" },
    { stt: 5, name: "Đồ ngủ đôi Thiên Hương size L", price: 530000, description: "Hai bộ gồm quần và áo cho nam và nữ size L" },
    { stt: 6, name: "Túi du lịch Thiên Hương", price: 79000, description: "" },
    { stt: 7, name: "Nến thơm thiên nhiên Thiên Hương", price: 23000, description: "Giá cho một cây" },
    { stt: 8, name: "Lịch bàn Thiên Hương", price: 12000, description: "" },
    { stt: 9, name: "Bộ gốm sứ uống trà Thiên Hương", price: 500000, description: "Một ấm và 4 chén" },
    { stt: 10, name: "Bộ kit sơ cứu khi đi du lịch", price: 300000, description: "Bông, cồn, kim tiêm, gạc, thuốc đỏ, thuốc chống tiêu chảy" }
  ]);
};

export const down = async (db, client) => {
  await db.collection("souvenirs").deleteMany({});
};
