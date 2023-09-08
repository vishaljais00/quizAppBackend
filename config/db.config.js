module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "fastfingerquiz",
    dialect: "mysql", 
    dialectOptions: {
        // useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: "+05:30"
      },
      timezone: "+05:30", //for writing to database
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
    };