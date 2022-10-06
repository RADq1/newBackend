module.exports = (sequelize, Sequelize) => {
  const Grade = sequelize.define("Grade", {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    grade: {
      type: Sequelize.INTEGER,
    },
  });
  //RELACJA DO LESSON
  return Grade;
};
