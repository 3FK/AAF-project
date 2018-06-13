var express =require('express');
// var BookRoute = require('./src/Books/Books.Route');
var userRoutes = require('./routes/users');
var projectRoutes = require('./routes/Projects');
const Routes = express.Router();

Routes.use('/user',userRoutes);
Routes.use('/project',projectRoutes)

module.exports =Routes;