const express = require("express");
const app = express();
//google calendar
// const {google} = require('googleapis');
// const {OAuth2} = google.auth;
// const oAuth2Client = new OAuth2('628486044277-0th0ju9d8n47l1qio41hldeekhd7u727.apps.googleusercontent.com', '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')

// oAuth2Client.setCredentials({refresh_token: '1//04W7-OIb-ih6CCgYIARAAGAQSNwF-L9Ir_UWWmfTaTClnpqUkBtlEWPC2-2pErxq92fG6MiY_As_F-tnMg5wTNIpIr33XCP2xd7o'})

// const calendar = google.calendar({version: 'v3', auth: oAuth2Client})

// const eventStartTime = new Date()
// eventStartTime.setDate(eventStartTime.getDay() + 23)

// const eventEndTime = new Date()
// eventEndTime.setDate(eventEndTime.getDay() + 33)
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// const event = {
//   summary: 'Termin obrony',
//   location: 'Profesora Sylwestra Kaliskiego 7, 85-796 Bydgoszcz',
//   description: 'temat pracy dyplomowej, uzytkownik',
//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'Poland'
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: 'Poland'
//   },
//   colorId: 1,
// }

// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: 'Poland',
//       items: [{ id: 'primary' }],
//     },
//   },
//   (err, res) => {
//     // Check for errors in our query and log them if they exist.
//     if (err) return console.error('Free Busy Query Error: ', err)

//     // Create an array of all events on our calendar during that time.
//     const eventArr = res.data.calendars.primary.busy

//     // Check if event array is empty which means we are not busy
//     if (eventArr.length === 0)
//       // If we are not busy create a new calendar event.
//       return calendar.events.insert(
//         { calendarId: 'primary', resource: event },
//         err => {
//           // Check for errors and log them if they exist.
//           if (err) return console.error('Error Creating Calender Event:', err)
//           // Else log that the event was created.
//           return console.log('Calendar event successfully created.')
//         }
//       )

//     // If event array is not empty log that we are busy.
//     return console.log(`Sorry I'm busy...`)
//   }
// )

const createError = require('http-errors');
const morgan = require('morgan');
require("dotenv").config();
app.use(morgan('dev'));
const cors = require("cors");
// const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
global.__basedir = __dirname + "/..";
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
app.use('/api', require('./app/routes/google.routes'));
//send email
app.post("/send_mail", cors(), async (req, res) => {
  let { text, email, subject, number, data, currentUser } = req.body;
  // console.log(data);
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
    <table style="
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
      }).join("")}
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
require("./app/routes/employee.routes")(app);
require("./app/routes/excel.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  // let dateNow = Date.now();
  // let addRoles = "INSERT INTO user_roles (roleId, userId) VALUES 3, 1";

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
    description: "Nauka ścisłego programowania i obsługi komputera",
    facultyId: 1,
  });
  FieldOfStudy.create({
    id: 2,
    name: "Informatyka w biznesie",
    description: "Nauka ścisłego programowania pod kątem tworzenia aplikacji biznesowych",
    facultyId: 1,
  });
  FieldOfStudy.create({
    id: 3,
    name: "Zarządzanie firmą",
    description: "Rozległa nauka zarządzania firmą, a w szczególności produkcją",
    facultyId: 2,
  });
  FieldOfStudy.create({
    id: 4,
    name: "Budownictwo",
    description: "Nauka tworzenia budownictwa, poznanie materiałów budowlanych oraz architektura",
    facultyId: 3,
  });
  FieldOfStudy.create({
    id: 5,
    name: "Inżynieria środowiska",
    description: "Kierunek stworzony dla osób z pasją w kierunku ochrony środowiska",
    facultyId: 3,
  });
  Lesson.create({
    id: 1,
    name: "Matematyka",
    numberOfECTS: 3,
    semestr: 1,
    type: "laboratorium",
    employeeUserId: 2,
    fieldofstudyId: 2,
  });
  Lesson.create({
    id: 2,
    name: "Programowanie obiektowe",
    numberOfECTS: 5,
    semestr: 1,
    type: "laboratorium",
    employeeUserId: 2,
    fieldofstudyId: 2,
  });
  Lesson.create({
    id: 3,
    name: "Mikroprocesory",
    numberOfECTS: 5,
    semestr: 2,
    type: "laboratorium",
    employeeUserId: 2,
    fieldofstudyId: 2,
  });
  Lesson.create({
    id: 4,
    name: "Matematyka",
    numberOfECTS: 3,
    semestr: 2,
    type: "wykład",
    employeeUserId: 2,
    fieldofstudyId: 2,
  });
  // sequelize.query("INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES ('2022-10-06 14:51:03.000000', '2022-10-06 14:51:03.000000', '3', '1');")
}
