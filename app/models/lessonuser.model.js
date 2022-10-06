module.exports = (sequelize, Sequelize) => {
    const LessonUser = sequelize.define("Lesson_User", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
    //RELACJA DO USER, KIERUNEK, WYDZIAŁ
    return LessonUser;
  };