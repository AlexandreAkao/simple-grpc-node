const User = require('../models/User');

const UserController = {
  getAllUsers: async (ctx) => {
    const users = await User.find();

    ctx.res = { users }
  }
}

module.exports = UserController