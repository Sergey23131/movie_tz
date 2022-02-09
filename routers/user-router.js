const {userController} = require('../controllers');
const userRouter = require('express').Router();

const createMiddleware = require('../middlewares/createUser.middleware');


userRouter.get('/', userController.getUsers);

userRouter.post('/', createMiddleware.createUserMiddleware, userController.createUser);

module.exports = userRouter;