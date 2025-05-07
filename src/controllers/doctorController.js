const controller = {};

// List all doctors
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT d.*, a.name AS admin_name FROM doctor d LEFT JOIN admin a ON d.admin_id = a.admin_id', (err, doctors) => {
            if (err) {
                res.json(err);
            }

            res.render('doctors', {
                data: doctors
            });
        });
    });
};

// Get admins for the add doctor form
controller.getAddForm = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
            if (err) {
                res.json(err);
            }
            
            res.render('doctor_add', {
                admins: admins
            });
        });
    });
};

// Save a new doctor
controller.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO doctor SET ?', [data], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/doctors');
        });
    });
};

// Delete a doctor
controller.delete = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM doctor WHERE doctor_id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/doctors');
        });
    });
};

// Get doctor data for edit form
controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM doctor WHERE doctor_id = ?', [id], (err, doctor) => {
            if (err) {
                res.json(err);
            }
            
            conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
                if (err) {
                    res.json(err);
                }
                
                res.render('doctor_edit', {
                    data: doctor[0],
                    admins: admins
                });
            });
        });
    });
};

// Update doctor data
controller.update = (req, res) => {
    const { id } = req.params;
    const newDoctor = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE doctor SET ? WHERE doctor_id = ?', [newDoctor, id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/doctors');
        });
    });
};

// View doctor's patients using the view_doctor_patients view
controller.viewPatients = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM view_doctor_patients WHERE doctor_id = ?', [id], (err, patients) => {
            if (err) {
                res.json(err);
            }
            
            conn.query('SELECT name FROM doctor WHERE doctor_id = ?', [id], (err, doctor) => {
                if (err) {
                    res.json(err);
                }
                
                res.render('doctor_patients', {
                    doctor_id: id,
                    doctor_name: doctor[0].name,
                    data: patients
                });
            });
        });
    });
};

module.exports = controller;
