const db = require("../models");
const Lessons = db.lesson;
const fieldOfStudy = db.fieldOfStudy;
const User = db.user;

exports.sendAssignedLessons = async (req, res) => {
    const { id } = req.params;
    // console.log(req);
    console.log(id);
    const data = await Lessons.findAll({
      where: {
        employeeUserId : id,
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

exports.sendUpdateFieldOfStudent = async (req, res) => {
    console.log(req.body.id);
    console.log(req.body.fieldOfStudy);
    const { id, fieldOfStudy } = req.body;
    if (fieldOfStudy === "") {
      return res.status(400).send("Błąd, przesłany pusty kierunek");
    } else {
      User.findOne({
        where: {
          id: id,
        },
      }).then((user) => {
        user.update({
          fieldofstudyId: fieldOfStudy,
        });
      });
      res.status(200).send(`Zaaktualizowano kierunek dla użytkownika o id: ${id}, kierunek o id ${fieldOfStudy}`);
    }
};
exports.deleteStudentFromDatabase = async (req, res) => {
  console.log(req.body.id);
  const { id } = req.body;
    User.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      user.destroy();
    });
    res.status(200).send(`Usunięto studenta o id: ${id}`);
};

exports.showAllFieldOfStudies = async (req, res) => {
  const data = await fieldOfStudy.findAll({})
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};