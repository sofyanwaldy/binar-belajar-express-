"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const encryptedPassword = bcrypt.hashSync("12345", 10);

    return await queryInterface.bulkInsert("users", [
      {
        firstName: "john",
        lastName: "doe",
        username: "superadmin",
        password: encryptedPassword,
        isSuperuser: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", null);
  },
};
