module.exports = (sequelize, Sequelize) => {
  const Faculty = sequelize.define("faculty", {
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
  return Faculty;
};
