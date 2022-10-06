const db = require("../models");
const Lessons = db.lesson;
const fieldOfStudy = db.fieldOfStudy;

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