const fs = require("fs");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// load models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
// connect db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});
// read json
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
// import to db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const importCourses = async () => {
  const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
  );
  try {
    await Course.create(courses);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == "-i") {
  importData();
}
if (process.argv[2] == "-x") {
  importCourses();
}
