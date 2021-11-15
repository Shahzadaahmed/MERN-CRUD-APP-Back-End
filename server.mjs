// Note: This is my server file using Node JS and Express JS...!

/***** Server of MERN CRUD App *****/

// NoteL Importing required API's...!
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose"; // Note: For Mongo DB Database...!

// Note: Connecting to Mongo DB Database...!
let requiredURL = 'mongodb+srv://dbahmed:ahmed1995@cluster0.owlt1.mongodb.net/MERN_CRUD_DB?retryWrites=true&w=majority';
mongoose.connect(requiredURL, () => {
    console.log("Database Connected!"); // Note: If this console is running, It's mean your database is connected successfully...!
});

// Note: User schema ready for users collection...!
const MyUser = mongoose.model("User", {
    name: String,
    email: String,
    password: String
});

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use(morgan("short"));

// Note: This function is accepting a request...!
app.use((req, res, next) => {
    console.log(`A request came: ${req.body}`);
    next();
});

// Note: This is the root path of the CRUD App...!
app.get("/", (req, res) => {
    res.send('MERN CRUD App Back-End!');
});

// Note: API function to save all users...!
app.get("/users", (req, res) => {
    MyUser.find({}, (error, users) => {
        if (!error) {
            res.send(users);
        }

        else {
            res.status(500).send("Error Happened!");
        }
    });
});

// Note: API Function to save user in DB...!
app.post("/user", (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send("Invalid Data!");
    }

    else {
        const newUser = new MyUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        newUser
            .save()
            .then(() => {
                console.log('User Created Successfully!');
                res.send('User Created!');
            })
            .catch((error) => {
                console.log(error.response);
            })
    }
});

// Note: If no path found then this path will run...!
app.get("*", (req, res) => {
    res.send('Sorry! Page Not Found!');
});

// Note: Running the back-end server...
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});