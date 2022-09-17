module.exports = (sequelize, Sequelize) => {
  const Faculty = sequelize.define("faculty", {
    id: {
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
