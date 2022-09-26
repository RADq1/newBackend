const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
// const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// var corsOptions = {
//   origin: "http://localhost:8081",
// };
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
// const { user } = require("./app/models");
const Role = db.role;
const User = db.user;
const FieldOfStudy = db.fieldOfStudy;
const Faculty = db.faculty;
const Lesson = db.lesson;
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

app.get("/", (req, res) => {
  res.json({ message: "Witaj w aplikacji dziennika studenta." });
});

//send email
app.post("/send_mail", cors(), async (req, res) => {
  let { text, email, subject, number, data, currentUser } = req.body;
  console.log(data);
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    html: `<div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 12px;
    ">
    <h2>Moje oceny:</h2>
    <table className="tabled" style="
      text-align: center;
      padding: 20px;
      ">
        <tr>
          <th>Nazwa przedmiotu</th>
          <th>Ocena</th>
          <th>Liczba punktów ECTS</th>
        </tr>
      ${data?.map(({ Lesson, grade }) => {
        return `
        <tr>
          <td>${Lesson.name}</td>
          <td>${grade}</td>
          <td>${Lesson.numberOfECTS}</td>
        </tr>`
      })}
    </table>
    <h4>Mój numer telefonu: ${number}</h4>
    <p>Wiadomość od studenta: ${text}</p>
    <h3>Z wyrazami szacunku, ${currentUser.name}</h3>
    </div>
    `
  });
  res.send("mail zostal wyslany");
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
