const controller = {};

// List all contacts using the view_contact_directory view
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM view_contact_directory', (err, contacts) => {
            if (err) {
                res.json(err);
            }

            res.render('directory', {
                data: contacts
            });
        });
    });
};

module.exports = controller;
