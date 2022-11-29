const db = require("../models");
const Grades = db.grade;
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Wrzuć plik z rozszerzeniem `*.xlsx`!");
    }
    console.log(req.body.userId)
    console.log(req.body.importedFrom)
    console.log(req.file.filename);
    console.log(req.file)
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      rows.shift();
      let grades = [];
      rows.forEach((row) => {
        let grade = {
          grade: row[0],
          LessonId: row[1],
          userId: req.body.userId,
          importedFrom: req.body.importedFrom,
        };
        grades.push(grade);
      });
      Grades.bulkCreate(grades)
        .then(() => {
          res.status(200).send({
            message: "Plik został wrzucony pomyślnie!: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Błąd przy importowaniu danych do bazy danych!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Nie można wrzucić pliku: " + req.file.originalname,
    });
  }
};
const getGrades = (req, res) => {
  Grades.findAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving grades.",
    });
  });
};
module.exports = {
  upload,
  getGrades,
};
