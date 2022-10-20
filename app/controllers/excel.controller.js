const db = require("../models");
const Grades = db.grade;
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
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
      // rows.forEach((row) => {
      //   let tutorial = {
      //     id: row[0],
      //     title: row[1],
      //     description: row[2],
      //     published: row[3],
      //   };

      //   tutorials.push(tutorial);
      // });

  //     Tutorial.bulkCreate(tutorials)
  //       .then(() => {
  //         res.status(200).send({
  //           message: "Uploaded the file successfully: " + req.file.originalname,
  //         });
  //       })
  //       .catch((error) => {
  //         res.status(500).send({
  //           message: "Fail to import data into database!",
  //           error: error.message,
  //         });
  //       });
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     message: "Could not upload the file: " + req.file.originalname,
  //   });
      Grades.bulkCreate(grades)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

// const getTutorials = (req, res) => {
//   Tutorial.findAll()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };
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
// const download = (req, res) => {
//   Tutorial.findAll().then((objs) => {
//     let tutorials = [];

//     objs.forEach((obj) => {
//       tutorials.push({
//         id: obj.id,
//         title: obj.title,
//         description: obj.description,
//         published: obj.published,
//       });
//     });

//     let workbook = new excel.Workbook();
//     let worksheet = workbook.addWorksheet("Tutorials");

//     worksheet.columns = [
//       { header: "Id", key: "id", width: 5 },
//       { header: "Title", key: "title", width: 25 },
//       { header: "Description", key: "description", width: 25 },
//       { header: "Published", key: "published", width: 10 },
//     ];

//     // Add Array Rows
//     worksheet.addRows(tutorials);

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=" + "tutorials.xlsx"
//     );

//     return workbook.xlsx.write(res).then(function () {
//       res.status(200).end();
//     });
//   });
// };

module.exports = {
  upload,
  getGrades,
  // download,
};
