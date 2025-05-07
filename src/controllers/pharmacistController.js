const controller = {};

// List all pharmacists
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT p.*, a.name AS admin_name FROM pharmacist p LEFT JOIN admin a ON p.admin_id = a.admin_id', (err, pharmacists) => {
            if (err) {
                res.json(err);
            }

            res.render('pharmacists', {
                data: pharmacists
            });
        });
    });
};

// Get admins for the add pharmacist form
controller.getAddForm = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
            if (err) {
                res.json(err);
            }
            
            res.render('pharmacist_add', {
                admins: admins
            });
        });
    });
};

// Save a new pharmacist
controller.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO pharmacist SET ?', [data], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/pharmacists');
        });
    });
};

// Delete a pharmacist
controller.delete = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM pharmacist WHERE pharmacist_id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/pharmacists');
        });
    });
};

// Get pharmacist data for edit form
controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM pharmacist WHERE pharmacist_id = ?', [id], (err, pharmacist) => {
            if (err) {
                res.json(err);
            }
            
            conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
                if (err) {
                    res.json(err);
                }
                
                res.render('pharmacist_edit', {
                    data: pharmacist[0],
                    admins: admins
                });
            });
        });
    });
};

// Update pharmacist data
controller.update = (req, res) => {
    const { id } = req.params;
    const newPharmacist = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE pharmacist SET ? WHERE pharmacist_id = ?', [newPharmacist, id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/pharmacists');
        });
    });
};

module.exports = controller;
