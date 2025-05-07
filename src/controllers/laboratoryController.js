const controller = {};

// List all laboratories
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT l.*, a.name AS admin_name FROM laboratory l LEFT JOIN admin a ON l.admin_id = a.admin_id', (err, labs) => {
            if (err) {
                res.json(err);
            }

            res.render('laboratories', {
                data: labs
            });
        });
    });
};

// Get admins for the add laboratory form
controller.getAddForm = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
            if (err) {
                res.json(err);
            }
            
            res.render('laboratory_add', {
                admins: admins
            });
        });
    });
};

// Save a new laboratory
controller.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO laboratory SET ?', [data], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/laboratories');
        });
    });
};

// Delete a laboratory
controller.delete = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM laboratory WHERE lab_id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/laboratories');
        });
    });
};

// Get laboratory data for edit form
controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM laboratory WHERE lab_id = ?', [id], (err, lab) => {
            if (err) {
                res.json(err);
            }
            
            conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
                if (err) {
                    res.json(err);
                }
                
                res.render('laboratory_edit', {
                    data: lab[0],
                    admins: admins
                });
            });
        });
    });
};

// Update laboratory data
controller.update = (req, res) => {
    const { id } = req.params;
    const newLab = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE laboratory SET ? WHERE lab_id = ?', [newLab, id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/laboratories');
        });
    });
};

// View patients assigned to this laboratory using the view_lab_technicians view
controller.viewPatients = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM view_lab_technicians WHERE lab_id = ?', [id], (err, patients) => {
            if (err) {
                res.json(err);
            }
            
            conn.query('SELECT lab_name, technician FROM laboratory WHERE lab_id = ?', [id], (err, lab) => {
                if (err) {
                    res.json(err);
                }
                
                res.render('laboratory_patients', {
                    lab_id: id,
                    lab_name: lab[0].lab_name,
                    technician: lab[0].technician,
                    data: patients
                });
            });
        });
    });
};

module.exports = controller;
