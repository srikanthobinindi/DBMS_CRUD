const controller = {};

// List all accountants
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT a.*, ad.name AS admin_name FROM accountant a LEFT JOIN admin ad ON a.admin_id = ad.admin_id', (err, accountants) => {
            if (err) {
                res.json(err);
            }

            res.render('accountants', {
                data: accountants
            });
        });
    });
};

// Get admins for the add accountant form
controller.getAddForm = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
            if (err) {
                res.json(err);
            }
            
            res.render('accountant_add', {
                admins: admins
            });
        });
    });
};

// Save a new accountant
controller.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO accountant SET ?', [data], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/accountants');
        });
    });
};

// Delete an accountant
controller.delete = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM accountant WHERE accountant_id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/accountants');
        });
    });
};

// Get accountant data for edit form
controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM accountant WHERE accountant_id = ?', [id], (err, accountant) => {
            if (err) {
                res.json(err);
            }
            
            conn.query('SELECT admin_id, name FROM admin', (err, admins) => {
                if (err) {
                    res.json(err);
                }
                
                res.render('accountant_edit', {
                    data: accountant[0],
                    admins: admins
                });
            });
        });
    });
};

// Update accountant data
controller.update = (req, res) => {
    const { id } = req.params;
    const newAccountant = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE accountant SET ? WHERE accountant_id = ?', [newAccountant, id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/accountants');
        });
    });
};

module.exports = controller;
