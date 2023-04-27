// const { postDAO } = require("../data-access");
const { User } = require("../data-access/models");

const userService = {
  async createUser(userDto) {
    const user = await User.create(userDto);
    return user;
  },
};

module.exports = userService;
