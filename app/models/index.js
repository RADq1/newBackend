const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
// const userRoleModel = require("./userRole.model.js");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.grade = require("../models/grade.model.js")(sequelize, Sequelize);
db.lesson = require("../models/lesson.model.js")(sequelize, Sequelize);
db.faculty = require("../models/faculty.model.js")(sequelize, Sequelize);
db.fieldOfStudy = require("../models/fieldOfStudy.model.js")(
  sequelize,
  Sequelize
);
// db.userRoleModel = require("../models/userRole.model")(sequelize, Sequelize);

//relations
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// db.fieldOfStudy.belongsTo(db.lesson);

db.lesson.belongsTo(db.user);
db.lesson.belongsTo(db.fieldOfStudy);
// db.lesson.belongsTo(db.faculty);

//USERS
db.fieldOfStudy.hasOne(db.user, {
  foreignKey: "fieldOfStudyId",
});
// db.faculty.hasOne(db.user, {
//   foreignKey: "facultyId",
// });
db.lesson.hasMany(db.grade);
db.grade.belongsTo(db.lesson);

db.grade.belongsTo(db.user);

db.faculty.hasOne(db.fieldOfStudy);
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
