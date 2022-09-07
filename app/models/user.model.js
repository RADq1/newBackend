module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    indexNumber: {
      type: Sequelize.INTEGER,
      unique: true
    },
    birthDate: {
      type: Sequelize.DATEONLY
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isFinished: {
      type: Sequelize.BOOLEAN
    },
    isStudent: {
      type: Sequelize.BOOLEAN
    }
  });
  return User;
};
