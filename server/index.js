const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
const TaskRoutes = require("./routes/Task");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const Streak = require("./routes/Streak");
const Badges = require("./routes/Badges");
const cookiesParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

//databse connect
database.connect();
//middlewares

app.use(express.json());
app.use(cookiesParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connect
cloudinaryConnect();

//ruotes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/Task",TaskRoutes);
// app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def routes
app.use("/api/v1/Streak",Streak)
app.use("/api/v1/Badges",Badges)
app.use
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'your server is up and running ... . .. '
    });
})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})