const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "skubotic_atm_ibm",
  "skubotic_atm_ibm",
  "wXqsM;u=9vST",
  {
    host: "skubotics.in",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
