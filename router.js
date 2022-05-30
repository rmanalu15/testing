const express = require('express');
const router = express.Router();
const conn = require('./config/connection');
const { signupValidation, loginValidation, brandvalidation, getDataBrandvalidation, updateBrandvalidation, deleteBrandvalidation, 
    tambahTypevalidation, getTypevalidation, getBrandIdvalidation, updateTypevalidation, deleteTypevalidation, tambahModelvalidation, 
    updateModelvalidation, viewModelTypevalidation, tambahTahunvalidation, tambahPLvalidation, updatePLvalidation, deletePLvalidation } = require('./validation.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sprintf = require('sprintf-js').sprintf;


// Router delete price list by code.
router.delete('/delete-price-list', deletePLvalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi hapus price list.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Hapus data price list.
                conn.query(`delete from pricelist where code='${req.body.code}'`);
                return res.status(200).send({
                    metaData: {code: 200, message: 'Price list berhasil dihapus!'}
                });
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Router update price list.
router.patch('/update-price-list', updatePLvalidation, (req, res, next) => {
    // Cek token.   
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi update price list.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Update data price list.
                conn.query(`update pricelist set price='${req.body.price}' where code='${req.body.code}'`);
                return res.status(200).send({
                    metaData: {code: 200, message: 'Price list berhasil diupdate!'}
                });
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Router tambah data price list.
router.post('/tambah-price-list', tambahPLvalidation, (req, res, next) => {
    // Cek token.   
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi tambah price list.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Generate kode.
                conn.query(`select ifnull(max(right(code,5)),0) + 1 as codeMax from pricelist where date(created_at)=curdate()`,
                    (err, result) => {
                        if (err) throw err;
                        genCode = sprintf("PL%05s", result[0].codeMax);
                        // Simpan data price list.
                        conn.query(`insert into pricelist (code,price,year_id,model_id) values ('${genCode}','${req.body.price}','${req.body.year_id}','${req.body.model_id}')`);
                        return res.status(200).send({
                            metaData: {code: 200, message: 'Price list berhasil ditambahkan!'}
                        });
                    }
                );
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Router tambah tahun.
router.post('/tambah-tahun', tambahTahunvalidation, (req, res, next) => {
    // Cek token.   
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi tambah tahun.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Simpan data tahun.
                conn.query(`insert into vehicle_year (year) values ('${req.body.year}')`);
                return res.status(200).send({
                    metaData: {code: 200, message: 'Tahun berhasil ditambahkan!'}
                });
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Router view model by type_id.
router.get('/view-model-type', viewModelTypevalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        // Validasi view semua data model by type_id.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(201).send({
                metaData: {code: 201, message: errors.array()}
            });
        } else {
            // View semua data model by type_id.
            conn.query(`select a.name as brand, b.name as type, c.name as model, c.updated_at, c.created_at from vehicle_model as c left join 
            vehicle_type as b on c.type_id=b.id left join vehicle_brand as a on b.brand_id=a.id where c.type_id='${req.body.type_id}' order by c.id`,
            (err, result) => {
                if (err) throw err;
                if (result.length) {
                    return res.status(200).send({
                        metaData: {code: 200, message: 'Sukses'},
                        response: result,
                        user: results[0].name
                    });
                } else {
                    return res.status(201).send({
                        metaData: {code: 201, message: 'Data tidak ditemukan!'},
                        user: results[0].name
                    });
                }
            }
            );
        }
    });
});

// Router delete model.
router.delete('/delete-model', deleteTypevalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi hapus model.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Hapus data model.
                conn.query(`delete from vehicle_model where id='${req.body.id}'`);
                return res.status(200).send({
                    metaData: {code: 200, message: 'Model berhasil dihapus!'}
                });
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Router update model.
router.patch('/update-model', updateModelvalidation, (req, res, next) => {
    // Cek token.   
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi tambah model.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Simpan data model.
                conn.query(`update vehicle_model set name='${req.body.name}' where id='${req.body.id}'`);
                return res.status(200).send({
                    metaData: {code: 200, message: 'Model berhasil diupdate!'}
                });
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Router tambah model.
router.post('/tambah-model', tambahModelvalidation, (req, res, next) => {
    // Cek token.   
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi tambah model.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Simpan data model.
                conn.query(`insert into vehicle_model (name,type_id) values ('${req.body.name}','${req.body.type_id}')`);
                return res.status(200).send({
                    metaData: {code: 200, message: 'Model berhasil dibuat!'}
                });
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});


// Delete type brand by id.
router.delete('/delete-type', deleteTypevalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi hapus type brand.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Hapus data type brand.
                conn.query(`delete from vehicle_type where id='${req.body.id}'`);
                return res.status(200).send({
                    metaData: {code: 200, message: 'Type brand berhasil dihapus!'}
                });
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Update type brand by id.
router.patch('/update-type', updateTypevalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi update type brand.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Cek type brand.
                conn.query(`select * from vehicle_type where name='${req.body.name}'`,
                    (err, result) => {
                        if (result.length) {
                            return res.status(201).send({
                                metaData: {code: 201, message: 'name type pada brand ini tidak boleh sama!'}
                            });
                        } else {
                            // Update data type brand.
                            conn.query(`update vehicle_type set name='${req.body.name}' where id='${req.body.id}'`);
                            return res.status(200).send({
                                metaData: {code: 200, message: 'Type brand berhasil diupdate!'}
                            });
                        }
                    }
                );
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Router view semua data type by brand_id.
router.get('/view-type', getBrandIdvalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        // Validasi view semua data type by brand_id.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(201).send({
                metaData: {code: 201, message: errors.array()}
            });
        } else {
            // View semua data type by brand_id.
            conn.query(`select a.name as brand_name, b.name as type_name, b.updated_at, b.created_at from vehicle_type as b left join 
            vehicle_brand as a on b.brand_id=a.id where b.brand_id='${req.body.brand_id}'`,
            (err, result) => {
                if (err) throw err;
                if (result.length) {
                    return res.status(200).send({
                        metaData: {code: 200, message: 'Sukses'},
                        response: result,
                        user: results[0].name
                    });
                } else {
                    return res.status(201).send({
                        metaData: {code: 201, message: 'Data tidak ditemukan!'},
                        user: results[0].name
                    });
                }
            }
            );
        }
    });
});


// Router view data type by id.
router.get('/get-type', getTypevalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        // Validasi get type by id.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(201).send({
                metaData: {code: 201, message: errors.array()}
            });
        } else {
            // View data type by id.
            conn.query(`select a.name as brand, b.name as type, b.updated_at, b.created_at from vehicle_type as b left join 
            vehicle_brand as a on b.brand_id=a.id where b.id='${req.body.id}'`,
            (err, result) => {
                if (err) throw err;
                if (result.length) {
                    return res.status(200).send({
                        metaData: {code: 200, message: 'Sukses'},
                        response: result[0],
                        user: results[0].name
                    });
                } else {
                    return res.status(201).send({
                        metaData: {code: 201, message: 'Data tidak ditemukan!'},
                        user: results[0].name
                    });
                }
            }
            );
        }
    });
});

// Router tambah type.
router.post('/tambah-type', tambahTypevalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi tambah type.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Cek brand.
                // conn.query(`select * from vehicle_type as b left join vehicle_brand as a on b.brand_id=a.id where b.name='${req.body.name}'`,
                conn.query(`select * from vehicle_type where brand_id='${req.body.brand_id}' and name='${req.body.name}'`,
                    (err, result) => {
                        if (result.length) {
                            return res.status(201).send({
                                metaData: {code: 201, message: 'name type dalam brand ini tidak boleh sama!'}
                            });
                        } else {
                            // Simpan data type.
                            conn.query(`insert into vehicle_type (name,brand_id) values ('${req.body.name}','${req.body.brand_id}')`);
                            return res.status(200).send({
                                metaData: {code: 200, message: 'Type berhasil dibuat!'}
                            });
                        }
                    }
                );
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Delete brand by id.
router.delete('/delete-brand', deleteBrandvalidation,(req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi hapus brand.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Hapus data brand.
                conn.query(`delete from vehicle_brand where id='${req.body.id}'`);
                return res.status(200).send({
                    metaData: {code: 200, message: 'Brand berhasil dihapus!'}
                });
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Update brand by id.
router.patch('/update-brand', updateBrandvalidation,(req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi update brand.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Cek brand.
                conn.query(`select * from vehicle_brand where name='${req.body.name}'`,
                    (err, result) => {
                        if (result.length) {
                            return res.status(201).send({
                                metaData: {code: 201, message: 'name brand tidak boleh sama!'}
                            });
                        } else {
                            // Update data brand.
                            conn.query(`update vehicle_brand set name='${req.body.name}' where id='${req.body.id}'`);
                            return res.status(200).send({
                                metaData: {code: 200, message: 'Brand berhasil diupdate!'}
                            });
                        }
                    }
                );
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Router view data brand by id.
router.get('/get-brand', getDataBrandvalidation,(req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        // Validasi get brand by id.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(201).send({
                metaData: {code: 201, message: errors.array()}
            });
        } else {
            // View data brand.
            conn.query(`select * from vehicle_brand where id='${req.body.id}'`,
            (err, result) => {
                if (err) throw err;
                if (result.length) {
                    return res.status(200).send({
                        metaData: {code: 200, message: 'Sukses'},
                        response: result[0],
                        user: results[0].name
                    });
                } else {
                    return res.status(201).send({
                        metaData: {code: 201, message: 'Data tidak ditemukan!'},
                        user: results[0].name
                    });
                }
            }
            );
        }
    });
});

// Router view semua data brand.
router.get('/view-brand', (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        // View data brand.
        conn.query(`select * from vehicle_brand limit 1000`,
        (err, result) => {
            if (err) throw err;
            return res.status(200).send({
                metaData: {code: 200, message: 'Sukses'},
                response: result,
                user: results[0].name
            });
        }
        );

    });
});

// Router tambah brand.
router.post('/tambah-brand', brandvalidation, (req, res, next) => {
    // Cek token.
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
        return res.status(201).send({
            metaData: {code: 201, message: 'Token invalid/kosong!'}
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'rupinda@manalu');
    conn.query('select * from users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        if (results[0].is_admin == "true") {
            // Validasi tambah brand.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(201).send({
                    metaData: {code: 201, message: errors.array()}
                });
            } else {
                // Cek brand.
                conn.query(`select * from vehicle_brand where name='${req.body.name}'`,
                    (err, result) => {
                        if (result.length) {
                            return res.status(201).send({
                                metaData: {code: 201, message: 'name brand tidak boleh sama!'}
                            });
                        } else {
                            // Simpan data brand.
                            conn.query(`insert into vehicle_brand (name) values ('${req.body.name}')`);
                            return res.status(200).send({
                                metaData: {code: 200, message: 'Brand berhasil dibuat!'}
                            });
                        }
                    }
                );
            }
        } else if (results[0].is_admin == "false") {
            return res.status(201).send({
                metaData: {code: 201, message: 'Akses ditolak'}
            });
        }
    });
});

// Routes registrasi user.
router.post('/registrasi', signupValidation, (req, res, next) => {
    conn.query(`select * from users where lower(email)=lower(${conn.escape(req.body.email)})`,
        (err, result) => {
            // Cek data user.
            if (result.length) {
                return res.status(201).send({
                    metaData: {code: 201, message: 'User telah terdaftar!'}
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(201).send({
                            metaData: {code: 201, message: err}
                        });
                    } else {
                        // validasi data user.
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            return res.status(201).send({
                                metaData: {code: 201, message: errors.array()}
                            });
                        } else {
                            // Simpan data user.
                            conn.query(`insert into users (name, is_admin, email, password, created_at) 
                            values ('${req.body.name}', '${req.body.is_admin}', ${conn.escape(req.body.email)}, ${conn.escape(hash)}, now())`);

                            return res.status(200).send({
                                metaData: {code: 200, message: 'User berhasil didaftarkan!'}
                            });
                        }
                    }
                });
            }
        }
    );
});

// Routes login user.
router.post('/login', loginValidation, (req, res, next) => {
    // Cek data user.
    conn.query(`select * from users where email=${conn.escape(req.body.email)}`,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(201).send({
                    metaData: {code: 201, message: err}
                });
            }
            if (!result.length) {
                return res.status(201).send({
                    metaData: {code: 201, message: 'Email atau password tidak ditemukan/salah!'}
                });
            }
            // Cek password.
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    if (bErr) {
                        throw bErr;
                        return res.status(201).send({
                            metaData: {code: 201, message: 'Password tidak ditemukan/salah!'}
                        });
                    }
                    if (bResult) {
                        // Set token, secret key dan masa berlaku token.
                        const token = jwt.sign({id:result[0].id},'rupinda@manalu', { expiresIn: '1h' });
                        // Update waktu login user.
                        conn.query(`update users set last_login=now() where id='${result[0].id}'`);

                        return res.status(200).send({
                            metaData: {code: 200, message: 'Berhasil login!'},
                            response: {token: token, user: result[0].name}
                        });
                    }
                    return res.status(201).send({
                        metaData: {code: 201, message: 'Email atau password tidak ditemukan/salah!'}
                    });
                }
            );
        }
    );
});

module.exports = router;