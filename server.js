const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// database
const db = require("./app/models");
// const { user } = require("./app/models");
const Role = db.role;
const User = db.user;
const FieldOfStudy = db.fieldOfStudy;
const Faculty = db.faculty;
const Lesson = db.lesson;
// const UserRole = require("./app/models/userRole.model");
// const UserRole = db.UserRole
var bcrypt = require("bcryptjs");
const { sequelize, fieldOfStudy, grade } = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   initial();
//   // initialFunction.initial;
//   // addRole();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Witaj w aplikacji dziennika studenta." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/grade.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  // let dateNow = Date.now();
  // let addRoles = "INSERT INTO user_roles (roleId, userId) VALUES 3, 1";
  // sequelize.query("INSERT INTO user_roles VALUES 1, 3")

  Role.create({
    id: 1,
    name: "student",
  });
  Role.create({
    id: 2,
    name: "employee",
  });
  Role.create({
    id: 3,
    name: "admin",
  });

  User.create({
    id: 1,
    name: "Radosław",
    username: "radgac", //login
    surname: "Gackowski",
    birthDate: Date.parse("07.11.1998"),
    email: "1998radq@gmail.com",
    password: bcrypt.hashSync("123456", 8), //haslo
  });
  User.create({
    id: 2,
    name: "Ania",
    username: "vnulkv", //login
    surname: "Brzuskniewicz",
    birthDate: Date.parse("05.04.1998"),
    email: "annabrzuskniewicz@gmail.com",
    password: bcrypt.hashSync("123456", 8), //haslo
  });
  User.create({
    id: 3,
    name: "Kamil",
    username: "kamkra",
    surname: "Krajewski",
    birthDate: Date.parse("07.04.1998"),
    email: "kamkra@gmail.com",
    password: bcrypt.hashSync("123456", 8),
    isStudent: true,
    address: "Szkolna x/y",
  });
  Faculty.create({
    id: 1,
    name: "Wydział Telekomunikacji, Informatyki i Elektrotechniki",
  });
  Faculty.create({
    id: 2,
    name: "Zarządzania",
  });
  Faculty.create({
    id: 3,
    name: "Budownictwa, Architektury i Inżynierii Środowiska.",
  });
  FieldOfStudy.create({
    id: 1,
    name: "Informatyka Stosowana",
    facultyId: 1,
  });
  FieldOfStudy.create({
    id: 2,
    name: "Informatyka w biznesie",
    facultyId: 1,
  });
  FieldOfStudy.create({
    id: 3,
    name: "Zarządzanie firmą",
    facultyId: 2,
  });
  FieldOfStudy.create({
    id: 4,
    name: "Budownictwo",
    facultyId: 3,
  });
  FieldOfStudy.create({
    id: 5,
    name: "Inżynieria środowiska",
    facultyId: 3,
  });
  Lesson.create({
    id: 1,
    name: "Matematyka",
    numberOfECTS: 3,
    userId: 3,
    fieldofstudyId: 2,
  });
  Lesson.create({
    id: 2,
    name: "Programowanie obiektowe",
    numberOfECTS: 5,
    userId: 3,
    fieldofstudyId: 2,
  });
  Lesson.create({
    id: 3,
    name: "Mikroprocesory",
    numberOfECTS: 5,
    userId: 3,
    fieldofstudyId: 2,
  });
}
