const controller = require("../controllers/grades.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/showGrades/:id", controller.sendAllGrades);
  app.get("/showStudentList", controller.sendStudentList);
  app.get("/showGrade/:id", controller.sendGrades);
  app.post("/addGrades", controller.addGrades);
};
