module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    //wspolne kolumny
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
    //Dla studenta
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
    //Dla pracownika
    title: {
      type: Sequelize.STRING,
    },
    //TODO RELACJA DO KIERUNKU ORAZ WYDZIAŁU
  });
  return User;
};
