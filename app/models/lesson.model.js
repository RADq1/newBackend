module.exports = (sequelize, Sequelize) => {
  const Lesson = sequelize.define("Lesson", {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    numberOfECTS: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    semestr: {
      type: Sequelize.INTEGER,
    },
  });
  return Lesson;
};
