module.exports = (sequelize, Sequelize) => {
  const Lesson = sequelize.define("Lesson", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    numberOfECTS: {
      type: Sequelize.INTEGER,
    },
  });
  //RELACJA DO USER, KIERUNEK, WYDZIAŁ
  return Lesson;
};
