const { userService } = require("../service");
const util = require("../misc/util");

const userController = {
  async signup(req, res, next) {
    try {
      const { nickname, email, password, blogName, bio, admin } = req.body;
      const userDto = { nickname, email, password, blogName, bio, admin };
      const createdUser = await userService.createUser(userDto);
      res.status(201).json(util.buildResponse(createdUser));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
