const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER_NAME}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
  )
  .then((success) => {
    console.log("successfully connected to mongodb");
  })
  .catch((err) => {
    console.log("MONGOOSE Error : ", err);
  });

const User = mongoose.model(
  "userdata",
  mongoose.Schema({
    name: {
      type: String,
      required: [true, "name field is required."],
      unique: [true, "user name should be unique."],
    },
    roles: {
      type: Array,
      default: ["user"],
    },
    refreshtoken: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "enter your password."],
      unique: [true, "password should be unique."],
      minlength: [5, "minimum length should be 5"],
    },
    phoneno: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      enum: ["CSE", "BED", "SE", "FED"],
      default: "SE",
    },
    salary: Number,
    city: String,
    country: {
      type: String,
      default: "IND",
    },
    address: String,
    pincode: Number,
    active: {
      type: Boolean,
      default: true,
    },
  })
);
console.log(User);
module.exports = User;
