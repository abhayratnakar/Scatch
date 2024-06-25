const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-connection");
const router = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");


require("dotenv").config();


const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const indexRouter = require("./routes/index");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());
app.use(express.static(path.join(__dirname , "public")));
app.set("view engine", "ejs");



app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


app.listen(3000);