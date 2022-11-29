module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    isFinished: {
      type: Sequelize.BOOLEAN,
    },
    address: {
      type: Sequelize.STRING,
    },
    isStudent: {
      type: Sequelize.BOOLEAN,
    },
    indexNumber: {
      type: Sequelize.INTEGER,
      unique: true,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
    },
    title: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    semestr: {
      type: Sequelize.INTEGER,
    }
  });
  return User;
};
