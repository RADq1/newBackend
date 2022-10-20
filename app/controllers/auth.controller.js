const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const FieldOfStudy = db.fieldOfStudy;
const Faculties = db.faculty;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createEmployee = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    title: req.body.title,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Pracownik stworzony pomyślnie" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([2]).then(() => {
          res.send({ message: "Pracownik stworzony pomyślnie" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.createStudent = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    indexNumber: req.body.indexNumber,
    birthDate: req.body.birthDate,
    isStudent: true,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Student stworzony pomyślnie" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Student stworzony pomyślnie" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Nie znaleziono takiego użytkownika." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Niepoprawne hasło!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        // console.log(user.name)
        res.status(200).send({
          id: user.id,
          name: user.name,
          surname: user.surname,
          username: user.username,
          indexNumber: user.indexNumber,
          isStudent: user.isStudent,
          birthDate: user.birthDate,
          email: user.email,
          roles: authorities,
          accessToken: token,
          address: user.address,
          semestr: user.semestr,
          phone: user.phone,
          title: user.title,
        });
        // res.status(200).send(user)
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.editSurname = (req, res) => {
  const { id, surname } = req.body;
  if (surname === "") {
    return res.status(400).send("Błąd, przesłane puste nazwisko");
  } else {
    User.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      user.update({
        surname: surname,
      });
    });
    console.log(surname, id);
    res.status(200).send(`Zaaktualizowano profil o id: ${id}`);
  }
};

exports.editAddress = (req, res) => {
  const { id, address } = req.body;
  if (address === "") {
    return res.status(400).send("Błąd, przesłany pusty adres");
  } else {
    User.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      user.update({
        address: address,
      });
    });
    console.log(address, id);
    res.status(200).send(`Zaaktualizowano profil o id: ${id}`);
  }
};

exports.editPassword = (req, res) => {
  const { id, password } = req.body;
  if (password === "") {
    return res.status(400).send("Błąd, przesłany pusty adres");
  } else {
    User.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      user.update({
        password: bcrypt.hashSync(password, 8),
      });
    });
    console.log(password, id);
    res.status(200).send(`Zaaktualizowano profil o id: ${id}`);
  }
};

exports.showFieldOfStudiesList = async (req, res) => {
  const data = await Faculties.findAll({
    include: {
      model: FieldOfStudy,
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