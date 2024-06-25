const express = require("express");
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const PORT = 12345;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB
const dataSchema = new mongoose.Schema({
    title: String,
    description: String
})

const loginSchema = mongoose.Schema(
    {
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        content: [dataSchema]
    }
)
const User = mongoose.model('User', loginSchema);
const Data = mongoose.model('Data', dataSchema);
mongoose.connect("mongodb+srv://vercel-admin-user:12345@cluster0.dbxwqii.mongodb.net/newUsers?retryWrites=true&w=majority").then(() => console.log("Database Connected")).catch((e) => console.log(`${e}/n Error in DB Connectivity!`))

app.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {

            const defaultData = new Data({
                title: "Template Title",
                description: "Template Description"
            })
            await defaultData.save();

            console.log("User added", req.body)

            const newUser = new User({
                email,
                password,
                firstName,
                lastName,
                content: defaultData
            });
            await newUser.save();


        } else {
            console.log("User already exists")
            res.json({ message: "User Exists" })
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for user login
app.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            console.log("User do not exist!")
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        else {
            console.log("Email Found")
        }

        const passwordMatch = existingUser.password === password

        if (!passwordMatch) {
            console.log("Invalid Password")
            return res.status(401).json({ error: 'Invalid credentials' });
        } else {
            console.log("Password Matched")
            return res.json(existingUser._id);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/user/:email", (req, res) => {
    User.findOne({ email: req.params.email }).then((data) => res.json(data)).catch(e => console.log(`${e}/n Error in reading user data`))
})

// Route to add data to user schema
app.post('/add-data', async (req, res) => {
    try {
        const { title, description, emailID } = req.body;
        console.log(req.body)

        // Assuming you have the user's ID from the JWT token
        const userId = emailID;

        const newData = new Data({
            title,
            description,
        });

        const user = await User.findOne({email: userId});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the new data to the user's content array
        user.content.push(newData);

        await user.save();

        res.json({ success: true });
        console.log("New Entry Added")
    } catch (error) {
        console.log("Failed, No Entry added")
        res.status(500).json({ error: error.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.content.remove(req.params.id);
        await user.save();
    }
    catch{

    }
})
app.put("/edit-entry/:id", async (req, res) => {
    try {
        const { emailID, title, description } = req.body; // Assuming you have the updated data in the request body

        const user = await User.findOne({ email: emailID });
        console.log(req.body)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const entryIndex = user.content.findIndex(entry => entry._id == req.params.id);

        if (entryIndex === -1) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        // Update the entry with the new data
        user.content[entryIndex].title = title; // Replace 'yourFieldToUpdate' with the actual field you want to update
        user.content[entryIndex].description = description; // Replace 'yourFieldToUpdate' with the actual field you want to update

        await user.save();
        console.log("Entry Updated")

        res.status(200).json({ message: 'Entry updated successfully', updatedEntry: user.content[entryIndex] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})