const controller = {};

// List all patients using the view_patient_details view
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM view_patient_details', (err, patients) => {
            if (err) {
                res.json(err);
            }

            res.render('patients', {
                data: patients
            });
        });
    });
};

// Get doctors, nurses, and labs for the add patient form
controller.getAddForm = (req, res) => {
    req.getConnection((err, conn) => {
        // Get doctors
        conn.query('SELECT doctor_id, name FROM doctor', (err, doctors) => {
            if (err) {
                res.json(err);
            }
            
            // Get nurses
            conn.query('SELECT nurse_id, name FROM nurse', (err, nurses) => {
                if (err) {
                    res.json(err);
                }
                
                // Get labs
                conn.query('SELECT lab_id, lab_name FROM laboratory', (err, labs) => {
                    if (err) {
                        res.json(err);
                    }
                    
                    res.render('patient_add', {
                        doctors: doctors,
                        nurses: nurses,
                        labs: labs
                    });
                });
            });
        });
    });
};

// Save a new patient using the AddNewPatient stored procedure
controller.save = (req, res) => {
    const data = req.body;
    
    req.getConnection((err, conn) => {
        // Use the stored procedure to add a new patient
        const query = 'CALL AddNewPatient(?, ?, ?, ?, ?, ?)';
        const params = [
            data.name,
            data.age,
            data.gender,
            data.doctor_id,
            data.nurse_id,
            data.lab_id
        ];
        
        conn.query(query, params, (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/patients');
        });
    });
};

// Delete a patient
controller.delete = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM patient WHERE patient_id = ?', [id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/patients');
        });
    });
};

// Get patient data for edit form
controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        // Get patient data
        conn.query('SELECT * FROM patient WHERE patient_id = ?', [id], (err, patient) => {
            if (err) {
                res.json(err);
            }
            
            // Get doctors
            conn.query('SELECT doctor_id, name FROM doctor', (err, doctors) => {
                if (err) {
                    res.json(err);
                }
                
                // Get nurses
                conn.query('SELECT nurse_id, name FROM nurse', (err, nurses) => {
                    if (err) {
                        res.json(err);
                    }
                    
                    // Get labs
                    conn.query('SELECT lab_id, lab_name FROM laboratory', (err, labs) => {
                        if (err) {
                            res.json(err);
                        }
                        
                        res.render('patient_edit', {
                            data: patient[0],
                            doctors: doctors,
                            nurses: nurses,
                            labs: labs
                        });
                    });
                });
            });
        });
    });
};

// Update patient data
controller.update = (req, res) => {
    const { id } = req.params;
    const newPatient = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE patient SET ? WHERE patient_id = ?', [newPatient, id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/patients');
        });
    });
};

// Get patients for a specific doctor using the GetDoctorPatientList stored procedure
controller.getDoctorPatients = (req, res) => {
    const { doctor_id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('CALL GetDoctorPatientList(?)', [doctor_id], (err, result) => {
            if (err) {
                res.json(err);
            }
            
            // The stored procedure result is in the first element of the result array
            const patients = result[0];
            
            res.render('doctor_patients', {
                doctor_id: doctor_id,
                data: patients
            });
        });
    });
};

module.exports = controller;
