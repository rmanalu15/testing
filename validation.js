const { body, check } = require('express-validator');

// Validasi tambah data tahun.
exports.tambahPLvalidation = [
    body('price', 'price tidak boleh kosong/tidak valid').not().isEmpty(),
    body('year_id', 'year_id tidak boleh kosong').not().isEmpty(),
    body('model_id', 'model_id tidak boleh kosong').not().isEmpty()
];

// Validasi tambah data tahun.
exports.tambahTahunvalidation = [
    body('year', 'year tidak boleh kosong').not().isEmpty(),
];

// Validasi view model by type_id.
exports.viewModelTypevalidation = [
    body('type_id', 'type_id tidak boleh kosong').not().isEmpty(),
];

// Validasi update model.
exports.updateModelvalidation = [
    body('id', 'id tidak boleh kosong').not().isEmpty(),
    body('name', 'name tidak boleh kosong').not().isEmpty()
];

// Validasi tambah model.
exports.tambahModelvalidation = [
    body('name', 'name tidak boleh kosong').not().isEmpty(),
    body('type_id', 'type_id tidak boleh kosong').not().isEmpty()
];

// Validasi delete type.
exports.deleteTypevalidation = [
    body('id', 'id tidak boleh kosong').not().isEmpty()
];

// Validasi view type by brand_id.
exports.updateTypevalidation = [
    body('id', 'id tidak boleh kosong').not().isEmpty(),
    body('name', 'name tidak boleh kosong').not().isEmpty()
];

// Validasi view type by brand_id.
exports.getBrandIdvalidation = [
    body('brand_id', 'brand_id tidak boleh kosong').not().isEmpty(),
];

// Validasi view type by id.
exports.getTypevalidation = [
    body('id', 'id tidak boleh kosong').not().isEmpty(),
];

// Validasi tambah type.
exports.tambahTypevalidation = [
    body('name', 'name tidak boleh kosong').not().isEmpty(),
    body('brand_id', 'brand_id tidak boleh kosong').not().isEmpty()
];

// Validasi view data brand by id.
exports.deleteBrandvalidation = [
    body('id', 'id brand tidak boleh kosong').not().isEmpty()
];

// Validasi view data brand by id.
exports.updateBrandvalidation = [
    body('id', 'id brand tidak boleh kosong').not().isEmpty(),
    body('name', 'name brand tidak boleh kosong').not().isEmpty(),
];

// Validasi view data brand by id.
exports.getDataBrandvalidation = [
    body('id', 'id brand tidak boleh kosong').not().isEmpty(),
];

// Validasi tambah brand.
exports.brandvalidation = [
    body('name', 'name brand tidak boleh kosong').not().isEmpty(),
];

// Validasi registrasi user. 
exports.signupValidation = [
    body('name', 'name tidak boleh kosong').not().isEmpty(),
    body('is_admin', 'is_admin tidak boleh kosong').not().isEmpty(),
    body('email', 'email tidak valid').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    body('password', 'password minimal 5 karakter').isLength({ min: 5 })
];

// Validasi login user.
exports.loginValidation = [
    body('email', 'email tidak valid').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    body('password', 'password minimal 5 karakter').isLength({ min: 6 })
];