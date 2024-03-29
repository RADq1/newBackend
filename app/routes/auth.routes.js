const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post(
    "/api/auth/createStudent",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.createStudent
  );

  app.post(
    "/api/auth/createEmployee",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.createEmployee
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/edit/surname", controller.editSurname);
  app.post("/edit/address", controller.editAddress);
  app.post("/edit/password", controller.editPassword);

  app.get("/information", controller.showFieldOfStudiesList);
};
