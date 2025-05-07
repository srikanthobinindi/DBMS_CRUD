const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const path = require('path');
const app = express();
require('dotenv').config();

// To get the database password from the .env file
const PASS = process.env.DATABASE_PASSWORD;

// Importing routes
const customerRoutes = require('./routes/customer');
const adminRoutes = require('./routes/admin');
const doctorRoutes = require('./routes/doctor');
const nurseRoutes = require('./routes/nurse');
const patientRoutes = require('./routes/patient');
const laboratoryRoutes = require('./routes/laboratory');
const pharmacistRoutes = require('./routes/pharmacist');
const accountantRoutes = require('./routes/accountant');
const directoryRoutes = require('./routes/directory');

// settings
app.set('port', process.env.PORT || 3000); // Changed to port 3001 to avoid conflicts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'srikanthobinindi480.cikeys.com',
    user: 'srikanth_dbmsproject',
    password: 'Karthik15673@1685',
    port: '3306',
    database: 'srikanth_dbmsproject'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', customerRoutes); // Home page (dashboard)
app.use('/customers', require('./routes/customer_legacy')); // Legacy customer management
app.use('/admins', adminRoutes);
app.use('/doctors', doctorRoutes);
app.use('/nurses', nurseRoutes);
app.use('/patients', patientRoutes);
app.use('/laboratories', laboratoryRoutes);
app.use('/pharmacists', pharmacistRoutes);
app.use('/accountants', accountantRoutes);
app.use('/directory', directoryRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
