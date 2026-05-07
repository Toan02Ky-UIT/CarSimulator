# CarSimulator
1. File trong hệ thống
Hệ thống được chia thành các module chính chạy độc lập trong các file .js riêng biệt:
- Core & UI (main.js): Quản lý Scene, Camera, Vòng lặp Render và UI điều khiển.
- Geometry (geometry.js): Quản lý việc sinh ra các khối cơ bản và phép biến đổi Affine.
- Environment (environment.js): Quản lý ánh sáng (Lighting) và vật liệu bề mặt (Texture).
- Model & Logic (carModel.js): Quản lý load file GLTF (xe hơi) và bắt sự kiện di chuyển (Input/Animation).

2. Nhiệm vụ
- Thành viên 1: Lead Dev - Core, Camera & UI Control
o	Nhiệm vụ: Viết file index.html, cấu hình Import Map để load Three.js từ CDN. Khởi tạo main.js chứa Scene, Camera, OrbitControls. Tích hợp thư viện UI (lil-gui qua CDN) để điều chỉnh near, far, chế độ hiển thị (Point/Line/Solid).
o	Dependency: Làm khung sườn sớm để các thành viên khác có file index.html chạy Live Server thử nghiệm.
- Thành viên 2: Geometry & Affine Transforms
o	Nhiệm vụ: Code toàn bộ trong file geometry.js. Viết các hàm trả về Group chứa các khối (Hộp, Cầu, Nón, Trụ, Bánh xe, Ấm trà). Viết logic bắt sự kiện phím/chuột để tịnh tiến, xoay, scale các khối này.
o	Dependency: Độc lập. Cuối tuần 1 chỉ cần export hàm ra để TV1 import vào Scene là xong.
- Thành viên 3: Lighting & Texture
o	Nhiệm vụ: Code trong file environment.js. Chuẩn bị ảnh mặt đường. Viết hàm tạo mặt phẳng (Plane) và ốp Texture. Cài đặt hệ thống đèn chiếu sáng và kích hoạt bóng đổ.
o	Dependency: Cần hình khối của TV2 và model của TV4 xuất hiện trên Scene để test bóng đổ có chính xác không.
- Thành viên 4: 3D Model & Animation
o	Nhiệm vụ: Code trong file carModel.js. Dùng GLTFLoader kết hợp với bộ giải nén DRACOLoader để load và tối ưu hóa model xe phức tạp (.glb) từ internet vào không gian. Bắt sự kiện phím WASD để tính toán tọa độ, làm hiệu ứng xe chạy và xoay bánh.
o	Dependency: Cần mặt phẳng đường của TV3 để xe không bị "lơ lửng".
________________________________________
4. Timeline chi tiết 2 tuần
Tuần 1: Xây nền tảng & Các chức năng Core
•	Ngày 1-2: TV1 đẩy khung HTML và main.js cơ bản lên Github. Cả team clone về, cài Live Server trên VS Code để chạy.
•	Ngày 3-4: TV2 code xong các hàm tạo 6 khối cơ bản. TV4 load thành công chiếc xe.
•	Ngày 5-7: TV1 hoàn thiện UI Control. TV2 hoàn thành các phép biến đổi Affine. TV3 hoàn thành Texture mặt đường và thêm nguồn sáng.
Tuần 2: Hoàn thiện, Nâng cấp & Animation (Integration Week)
•	Ngày 8-9 (Ghép code): Tích hợp toàn bộ module. Import hàm của TV2, TV3, TV4 vào main.js của TV1.
•	Ngày 11-12: Xử lý bug (bóng đổ bị cắt, xe đi xuyên vật thể). Thêm Animation cho các khối của TV2 (tự bay/xoay).
•	Ngày 13-14: Code Freeze (đóng băng, không thêm tính năng). Quay video demo, làm báo cáo.
________________________________________
5. Định hướng kỹ thuật (Tech Guidelines)
•	Cấu trúc Project:
/
├── index.html       # File HTML duy nhất, chứa Import Map
└── /js
    ├── main.js        # Vòng lặp animate() nằm ở đây
    ├── geometry.js    # Khu vực của TV2
    ├── environment.js # Khu vực của TV3
    └── carModel.js    # Khu vực của TV4
•	Cách Import Native (Rất quan trọng): Trong HTML phải có type="module". Các file JS kết nối với nhau bằng cú pháp ES Module gốc (ví dụ trong geometry.js ghi export function createShapes()... và trong main.js ghi import { createShapes } from './js/geometry.js').
