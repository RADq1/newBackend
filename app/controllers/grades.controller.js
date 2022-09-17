const { sequelize } = require("../models");
const db = require("../models");

const Lesson = db.lesson;
const Grades = db.grade;

exports.sendAllGrades = async (req, res) => {
  const { id } = req.params;
  // console.log(req);
  console.log(id);
  const data = await Grades.findAll({
    where: {
      userId: id,
    },
    include: {
      model: Lesson,
      attributes: ["name", "numberOfECTS"],
      as: "Lesson",
    },
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });

  res.json({ success: true, data: data });
};
