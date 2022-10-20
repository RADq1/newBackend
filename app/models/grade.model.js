module.exports = (sequelize, Sequelize) => {
  const Grade = sequelize.define("Grade", {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    importedFrom: {
      type: Sequelize.STRING,
    },
    grade: {
      type: Sequelize.FLOAT,
    },
  });
  return Grade;
};
