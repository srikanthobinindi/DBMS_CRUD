const controller = {};

// List all nurses
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT n.*, a.name AS admin_name FROM nurse n LEFT JOIN admin a ON n.admin_id = a.admin_id', (err, nurses) => {
            if (err) {
                res.json(err);
            }

            res.render('nurses', {
                data: nurses
            });
        });
    });
};

// Get admins for the add nurse form
controller.getAddForm = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
            if (err) {
                res.json(err);
            }
            
            res.render('nurse_add', {
                admins: admins
            });
        });
    });
};

// Save a new nurse
controller.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO nurse SET ?', [data], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/nurses');
        });
    });
};

// Delete a nurse
controller.delete = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM nurse WHERE nurse_id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/nurses');
        });
    });
};

// Get nurse data for edit form
controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM nurse WHERE nurse_id = ?', [id], (err, nurse) => {
            if (err) {
                res.json(err);
            }
            
            conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
                if (err) {
                    res.json(err);
                }
                
                res.render('nurse_edit', {
                    data: nurse[0],
                    admins: admins
                });
            });
        });
    });
};

// Update nurse data
controller.update = (req, res) => {
    const { id } = req.params;
    const newNurse = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE nurse SET ? WHERE nurse_id = ?', [newNurse, id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/nurses');
        });
    });
};

// View patients assigned to this nurse
controller.viewPatients = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT p.*, d.name AS doctor_name FROM patient p JOIN doctor d ON p.doctor_id = d.doctor_id WHERE p.nurse_id = ?', [id], (err, patients) => {
            if (err) {
                res.json(err);
            }
            
            conn.query('SELECT name FROM nurse WHERE nurse_id = ?', [id], (err, nurse) => {
                if (err) {
                    res.json(err);
                }
                
                res.render('nurse_patients', {
                    nurse_id: id,
                    nurse_name: nurse[0].name,
                    data: patients
                });
            });
        });
    });
};

module.exports = controller;
