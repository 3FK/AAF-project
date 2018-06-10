var express =require('express');
// var BookRoute = require('./src/Books/Books.Route');
var userRoutes = require('./routes/users');
const Routes = express.Router();

Routes.use('/user',userRoutes);

module.exports =Routes;