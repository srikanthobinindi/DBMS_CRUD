const controller = {};

// List all admins with the view_admin_overview view
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM view_admin_overview', (err, admins) => {
            if (err) {
                res.json(err);
            }

            res.render('admins', {
                data: admins
            });
        });
    });
};

// Save a new admin
controller.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO admin SET ?', [data], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/admins');
        });
    });
};

// Delete an admin
controller.delete = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM admin WHERE admin_id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/admins');
        });
    });
};

// Get admin data for edit form
controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM admin WHERE admin_id = ?', [id], (err, admin) => {
            if (err) {
                res.json(err);
            }
            
            res.render('admin_edit', {
                data: admin[0]
            });
        });
    });
};

// Update admin data
controller.update = (req, res) => {
    const { id } = req.params;
    const newAdmin = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE admin SET ? WHERE admin_id = ?', [newAdmin, id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/admins');
        });
    });
};

// View staff managed by this admin
controller.viewStaff = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        // Get admin name
        conn.query('SELECT name FROM admin WHERE admin_id = ?', [id], (err, admin) => {
            if (err) {
                res.json(err);
            }
            
            // Get doctors managed by this admin
            conn.query('SELECT * FROM doctor WHERE admin_id = ?', [id], (err, doctors) => {
                if (err) {
                    res.json(err);
                }
                
                // Get nurses managed by this admin
                conn.query('SELECT * FROM nurse WHERE admin_id = ?', [id], (err, nurses) => {
                    if (err) {
                        res.json(err);
                    }
                    
                    // Get labs managed by this admin
                    conn.query('SELECT * FROM laboratory WHERE admin_id = ?', [id], (err, labs) => {
                        if (err) {
                            res.json(err);
                        }
                        
                        // Get pharmacists managed by this admin
                        conn.query('SELECT * FROM pharmacist WHERE admin_id = ?', [id], (err, pharmacists) => {
                            if (err) {
                                res.json(err);
                            }
                            
                            // Get accountants managed by this admin
                            conn.query('SELECT * FROM accountant WHERE admin_id = ?', [id], (err, accountants) => {
                                if (err) {
                                    res.json(err);
                                }
                                
                                res.render('admin_staff', {
                                    admin_id: id,
                                    admin_name: admin[0].name,
                                    doctors: doctors,
                                    nurses: nurses,
                                    labs: labs,
                                    pharmacists: pharmacists,
                                    accountants: accountants
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

module.exports = controller;
