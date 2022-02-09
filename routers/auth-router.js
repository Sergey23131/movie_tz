const {authController} = require('../controllers');
const authRouter = require('express').Router();

const loginMiddleware = require('../middlewares/login.middleware');

authRouter.post('/', loginMiddleware.isloginBodyValid, loginMiddleware.loginMiddleware, authController.authUsers);

authRouter.post('/movieUpdate');

authRouter.post('/movieDelete');

module.exports = authRouter;