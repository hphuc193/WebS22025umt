Thành Viên Nhóm:
Lê Công Hoàng Phúc - 2201700083
Cao Sỹ Siêu - 2201700170


TÍNH NĂNG: 
- Đăng nhập: Người dùng đăng nhập với vai trò admin, manager, hoặc customer.
- Chọn danh sách: Sau khi đăng nhập, người dùng có thể chọn xem danh sách Souvenirs hoặc Motorbikes.
- Quản lý Souvenirs/Motorbikes:
- Xem danh sách.
- Xem chi tiết từng mục.
- Thêm mới.
- Cập nhật thông tin và thêm ảnh.
- Xóa mục.
- Upload ảnh: Hỗ trợ upload nhiều ảnh cho mỗi Souvenir hoặc Motorbike.
- Tìm Kiếm, Lọc, Sắp Xếp.

CÔNG NGHỆ SỬ DỤNG:
- Frontend: React, Vite, Apollo Client, Tailwind CSS, Shadcn.
- Backend: Node.js, GraphQL Yoga, Express, MongoDB (thông qua Mongoose). 
- Database: MongoDB kết hợp docker.
- Authentication: JWT (JSON Web Token)
- File Upload: graphql-upload

CẤU TRÚC THƯ MỤC:
project-root/
├── server/                  # Backend
│   ├── data/                # Dữ liệu và kết nối database
│   │   ├── migrations/      # File migration cho MongoDB
│   │   ├── models/          # Định nghĩa schema MongoDB
│   │   │   ├── category.js
│   │   │   ├── user.js
│   │   │   ├── souvenir.js
│   │   │   ├── motorbikes.js
│   │   │   └── index.js
│   │   ├── init.js          # Khởi tạo database
│   │   └── mongoRepo.js     # Hàm CRUD cho database
│   ├── graphql/             # Định nghĩa GraphQL schema và resolvers
│   │   ├── authentication.js
│   │   ├── souvenirs.js
│   │   ├── motorbikes.js
│   │   ├── schema.js
│   │   └── authMiddleware.js
│   ├── img/                 # Thư mục lưu ảnh upload
│   ├── index.js             # File chính của server
│   ├── config.js            # Cấu hình database
│   ├── permissions.js       # Quyền truy cập
│   └── package.json
├── frontend/                # Frontend
│   ├── src/                 # Mã nguồn React
│   │   ├── components/      # Các thành phần giao diện
│   │   │   ├── Souvenirs.jsx
│   │   │   ├── Souvenir.jsx
│   │   │   ├── AddSouvenir.jsx
│   │   │   ├── ManageSouvenir.jsx
│   │   │   ├── Motorbikes.jsx
│   │   │   ├── Motorbike.jsx
│   │   │   ├── AddMotorbike.jsx
│   │   │   └── ManageMotorbike.jsx
│   │   ├── pages/           # Các trang chính
│   │   │   ├── Login.jsx
│   │   │   ├── Home.jsx
│   │   │   └── NoPage.jsx
│   │   ├── App.jsx          # Định nghĩa route
│   │   └── main.jsx         # Khởi tạo Apollo Client
│   ├── public/              # File tĩnh
│   ├── vite.config.js       # Cấu hình Vite
│   └── package.json
├── README.md                # File này
└── .env                     # Biến môi trường

YÊU CẦU:
- Node.js: v20.x hoặc cao hơn
- MongoDB: Đã cài đặt và chạy trên mongodb://127.0.0.1:27017/shop
- npm: Đi kèm với Node.js

CÀI ĐẶT:
1. Cài đặt server:
- cd server
- npm install
2. Cài đặt frontend:
- cd ../frontend
- npm install

CHẠY ỨNG DỤNG:
1. Chạy bd
- docker Start db
2. Chạy server:
- cd server
- npm start
3. Chạy frontend:
- cd frontend
- npm run dev

SỬ DỤNG
- Mở trình duyệt và vào http://localhost:5173.
- Đăng nhập với tài khoản mặc định: 
  + username: admin(Role: admin), john (role: manager), alice (role: customer) 
  + password: 1234
- Chọn Danh sách Dịch Vụ 

