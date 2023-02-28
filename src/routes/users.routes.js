const Router = require('express');
const protectRouters = require('../middlewares/protect.middleware')
const { user } = require("../schemas/users.schema");
const { login } = require("../schemas/login.schema");
const { updateUserSchema } = require("../schemas/update.user.schema");
const { updatePasswordSchema } = require("../schemas/update.password.schema");
const { addressSchema } = require("../schemas/address.schema");
const { checkSchema } = require("express-validator");
const { handleValidator } = require('../helpers/validatorHandler');

const userRouter = Router();

const {
  getUser,
  createUser,
  loginUser,
  updateUser,
  updateUserPassword
} = require("../controllers/users.controller");

const { addUserAddress, updateUserAddress } = require("../controllers/address.controller");

userRouter.post(
  "/",
  checkSchema(user),
  handleValidator,
  createUser
);

userRouter.post(
  '/login',
  checkSchema(login),
  handleValidator,
  loginUser
)

userRouter.use(protectRouters)

userRouter.get('/', getUser)

userRouter.post(
  "/:id/address",
  checkSchema(addressSchema),
  handleValidator,
  addUserAddress
);

userRouter.put(
  '/:id/password',
  checkSchema(updatePasswordSchema),
  handleValidator,
  updateUserPassword
);

userRouter.put(
  "/:id/address/:addId",
  checkSchema(addressSchema),
  handleValidator,
  updateUserAddress
);

userRouter.put(
  '/:id',
  checkSchema(updateUserSchema),
  handleValidator,
  updateUser
)

module.exports = userRouter;
