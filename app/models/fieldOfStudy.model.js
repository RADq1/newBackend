module.exports = (sequelize, Sequelize) => {
  const FieldOfStudy = sequelize.define("fieldofstudy", {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  //RELACJA DO LESSON
  return FieldOfStudy;
};
