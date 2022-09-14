const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
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
// const UserRole = require("./app/models/userRole.model");
// const UserRole = db.UserRole
var bcrypt = require("bcryptjs");
const { sequelize } = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
//   // addRole();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  let dateNow = Date.now();
  let addRoles = "INSERT INTO user_roles (roleId, userId) VALUES 3, 1";
  sequelize.query("SELECT * FROM users")
  // sequelize.query("INSERT INTO user_roles VALUES 1, 3")
  
  Role.create({
    id: 1,
    name: "student"
  });
  Role.create({
    id: 2,
    name: "employee"
  });
  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    id: 1,
    name: "Radosław",
    username: "radgac", //login
    surname: "Gackowski",
    birthDate: Date.parse("07.11.1998"),
    email: "1998radq@gmail.com",
    password: bcrypt.hashSync("123456", 8), //haslo
  })
  User.create({
    id: 2,
    name: "Ania",
    username: "vnulkv", //login
    surname: "Brzuskniewicz",
    birthDate: Date.parse("05.04.1998"),
    email: "annabrzuskniewicz@gmail.com",
    password: bcrypt.hashSync("123456", 8), //haslo
  })
  // sequelize.query("INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES ('2022-09-10 14:26:56.000000', '2022-09-10 14:26:56.000000', '3', '1')")

  // const user = User.findAll({
  //   where: {
  //     id: 1,
  //   }
  // })
  // const role = Role.findAll({
  //   where: {
  //     id: 3,
  //   }
  // })
  // console.log( user, role)
  // UserRole.create({
  //   roleId: role,
  //   userId: user
  // })
}
// function addRole() {
//   const user = User.findAll({
//     where: {
//       id: 1,
//     }
//   })
//   const role = Role.findAll({
//     where: {
//       id: 3,
//     }
//   })
//   console.log(`uzytkownik: ${user.imie}`)
// }