const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const app = express();
const bodyParser=require('body-parser')

const credentials = require("./middleware/credentails");
const corsOptions = require("./config/corsOptions");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.static('public'))
const fetchApi = require("./router/restApi");
const getroutes = require("./router/getRoutes");
const signupmodelroutes = require("./router/signupmodelroutes");
const signinroutes = require("./router/signinroute");
const refreshAuth = require("./router/refreshauth");
const updateuser = require("./router/api/updateuser");
const normalUser = require("./router/api/getData");
const rootUser = require("./router/api/getRootData");

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.use("/", fetchApi);
app.use("/", signinroutes);
app.use("/", signupmodelroutes);
app.use("/", updateuser);
app.use("/", refreshAuth);
app.use("/", normalUser);
app.use("/", rootUser);
app.use("/", getroutes);

app.listen(process.env.BACKEND_PORT||3001, () => console.log("server has started listening on ",process.env.BACKEND_PORT));
module.exports = app;
