const controller = require("../controllers/employee.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/showAssignedLessons/:id", controller.sendAssignedLessons);
  app.post("/updateStudentFieldOfStudy", controller.sendUpdateFieldOfStudent);
  app.post("/deleteStudent", controller.deleteStudentFromDatabase);
  app.get("/showAllFieldOfStudies", controller.showAllFieldOfStudies);
};
