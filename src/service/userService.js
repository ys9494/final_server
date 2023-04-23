// const { postDAO } = require("../data-access");
const { User } = require("../models");

const userService = {
  async createUser(userDto) {
    const user = await User.create(userDto);
    return user;
  },
};

module.exports = userService;
