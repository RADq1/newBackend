const { sequelize } = require("../models");
const db = require("../models");

const Lesson = db.lesson;
const Grades = db.grade;
const User = db.user;
const FieldOfStudy = db.fieldOfStudy;

exports.addGrades = (req, res) => {
  const { grades } = req.body;
  // console.log(LessonId);
  console.log(grades);
    grades.map((grade) => {
      Grades.findOne({
        where: {
          LessonId: grade.LessonId,
          userId: grade.userId,
        },
      }).then((gradeDb) => {
        console.log(gradeDb.LessonId);
        gradeDb.update({
          grade: grade.grade,
        })
      });
    });
    // Grades.findOne({
    //   where: {
    //     grade: null,
    //     LessonId: LessonId,
    //   },
    // }).then((grades) => {
    //   grades.update({
    //     grade: 1,
    //   });
    // });
    res.status(200).send(`Zaaktualizowano ocene`);
  }
;

//wyslanie wszystkich ocen === null, dla wybranego lesson
exports.sendGrades = async (req, res) => {
  // console.log(req);
  const { id } = req.params;
  console.log(id);
  const data = await Grades.findAll({
    where: {
      grade: null,
    },
    include: [{
      required: true,
      model: Lesson,
      where: {
        id : id,
      },
      attributes: ["name", "semestr", "type"],
    },
    {
      required: true,
      model: User,
      attributes: ["name", "surname"],
    },
  ],
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  res.json({ success: true, data: data });
};

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
      attributes: ["name", "numberOfECTS", "semestr", "type"],
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

exports.sendStudentList = async (req, res) => {
  // console.log(req);
  const data = await User.findAll({
    where: {
      isStudent: true,
    },
    include: {
      model: FieldOfStudy,
      attributes: ["name"]
    },
  })
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });

  res.json({ success: true, data: data });
};