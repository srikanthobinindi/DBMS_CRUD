CREATE TABLE admin (
    admin_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    password VARCHAR(100)
);

CREATE TABLE doctor (
    doctor_id INT PRIMARY KEY,
    name VARCHAR(100),
    specialization VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

CREATE TABLE nurse (
    nurse_id INT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

CREATE TABLE laboratory (
    lab_id INT PRIMARY KEY,
    lab_name VARCHAR(100),
    technician VARCHAR(100),
    email VARCHAR(100),
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

CREATE TABLE patient (
    patient_id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    doctor_id INT,
    nurse_id INT,
    lab_id INT,
    FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id),
    FOREIGN KEY (nurse_id) REFERENCES nurse(nurse_id),
    FOREIGN KEY (lab_id) REFERENCES laboratory(lab_id)
);

CREATE TABLE pharmacist (
    pharmacist_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

CREATE TABLE accountant (
    accountant_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);