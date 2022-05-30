# TestingSERU

Tutrial:
1. Inisialisasi project, dengan perintah > npm init -y
2. Install package express dan validator, mysql, body-parser, jsonwebtoken, bcryptjs, dan cors dengan perintah > npm install express express-validator mysql body-parser jsonwebtoken bcryptjs cors --save
3. Import database dari folder > database
4. Masuk ke dalam root aplikasi, lalu jalankan perintah > node server.js

Postman Collection:
1. Registrasi user: <br>
  URL: http://localhost:8000/seru/registrasi <br>
  Type: POST <br>
  Structured: Form URL Encoded <br>
  Parameter: name, is_admin, email, password <br>
  Notes: value "true" untuk role admin, "false" untuk role user biasa.
2. Login user: <br>
  URL: http://localhost:8000/seru/login <br>
  Type: POST <br>
  Structured: Form URL Encoded <br>
  Parameter: email, password <br>
  Notes: Response token digunakan untuk mengakses setiap menu.
3. Kelola Menu Brand:
  - Tambah Brand: <br>
  URL: http://localhost:8000/seru/tambah-brand <br>
  Type: POST <br>
  Structured: Form URL Encoded <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Notes: Field created_at dan updated_at sudah auto insert dan auto updated. <br>
  Parameter: name <br>
  - View All Data Brand: <br>
  URL: http://localhost:8000/seru/view-brand <br>
  Type: GET <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  - Get Data Brand By ID: <br>
  URL: http://localhost:8000/seru/get-brand <br>
  Type: GET <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: id <br>
  - Update Brand By ID: <br>
  URL: http://localhost:8000/seru/update-brand <br>
  Type: PATCH <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: id, name <br>
   - Delete Brand By ID: <br>
  URL: http://localhost:8000/seru/delete-brand <br>
  Type: DELETE <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: id <br>
4. Kelola Menu Type Brand:
  - Tambah Type Brand: <br>
  URL: http://localhost:8000/seru/tambah-type <br>
  Type: POST <br>
  Structured: Form URL Encoded <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Notes: Field created_at dan updated_at sudah auto insert dan auto updated. <br>
  Parameter: name, brand_id <br>
  - Get Data Type Brand By ID: <br>
  URL: http://localhost:8000/seru/get-type <br>
  Type: GET <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: id <br>
  - View Data Type By Brand Id: <br>
  URL: http://localhost:8000/seru/view-type <br>
  Type: GET <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: brand_id <br>
  - Update Type Brand By ID: <br>
  URL: http://localhost:8000/seru/update-type <br>
  Type: PATCH <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: id, name <br>
  - Delete Type Brand By ID: <br>
  URL: http://localhost:8000/seru/delete-type <br>
  Type: DELETE <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: id <br>
5. Kelola Menu Model Type:
  - Tambah Model Type: <br>
  URL: http://localhost:8000/seru/tambah-model <br>
  Type: POST <br>
  Structured: Form URL Encoded <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Notes: Field created_at dan updated_at sudah auto insert dan auto updated. <br>
  Parameter: name, type_id <br>
  - Update Model Type By ID: <br>
  URL: http://localhost:8000/seru/update-model <br>
  Type: PATCH <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: id, name <br>
  - Delete Model Type By ID: <br>
  URL: http://localhost:8000/seru/delete-model <br>
  Type: DELETE <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: id <br>
  - View Data Model By Type Id:
  URL: http://localhost:8000/seru/view-model-type <br>
  Type: GET <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Structured: Form URL Encoded <br>
  Parameter: type_id <br>
6. Kelola Menu Data Tahun:
  - Tambah Data Tahun: <br>
  URL: http://localhost:8000/seru/tambah-tahun <br>
  Type: POST <br>
  Structured: Form URL Encoded <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Notes: Field created_at dan updated_at sudah auto insert dan auto updated. <br>
  Parameter: year <br>
7. Kelola Menu Price List:
  - Tambah Data Price List: <br>
  URL: http://localhost:8000/seru/tambah-price-list <br>
  Type: POST <br>
  Structured: Form URL Encoded <br>
  Authentication: Bearer Token (Token dari hasil login user) <br>
  Notes: Field created_at dan updated_at sudah auto insert dan auto updated. <br>
  Parameter: price, year_id, model_id <br>
