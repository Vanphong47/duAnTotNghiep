const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const systemConfig = require("./config/system");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path"); // tinymce
const moment = require("moment"); // định dạng thời gian
dotenv.config(); // khởi tạo dotenv

database.connect();

// câu lệnh kết nối database

const routerClient = require("./routes/client/index.router");
const routerAdmin = require("./routes/admin/index.router");

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method")); // de ghi de duoc phuong thuc trong the form

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// app.use(express.static("public"));
app.use(express.json());

app.use(express.static(`${__dirname}/public`)); // nhúng file tĩnh

/* New Route to the TinyMCE Node module */
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// flash
app.use(cookieParser("buiphong19"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash

//App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// routesClient
routerClient(app);
// routesAdmin
routerAdmin(app);

//404 Not Found
app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Đang chạy trên cổng ${port}`);
});
