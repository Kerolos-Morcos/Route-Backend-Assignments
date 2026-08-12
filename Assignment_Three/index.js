const express = require('express');
const app = express();
const port = 5005;
const fs = require('fs').promises;
const path = require('path');
const { randomUUID } = require('crypto');
app.use(express.json());

const usersFilePath = path.resolve('users.json');

// Helper Functions
async function getUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf-8');
        const users = JSON.parse(data);
        return users;
    } catch (err) {
        return [];
    }
}

async function saveUsers(users) {
    return await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

// Routes
// POST user 
app.post('/user', async (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email) {
        return res.status(400).json('Name and email are required');
    }
    const users = await getUsers();
    const isEmailExists = users.some(user => user.email === email);
    if (isEmailExists) {
        return res.status(409).json('Email already exists');
    }
    const newUser = {
        id: randomUUID(),
        name,
        email,
        age
    };
    users.push(newUser);
    await saveUsers(users);
    res.status(201).json('User created successfully');
});


// PATCH user
app.patch('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const users = await getUsers();
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    if (email) {
        const emailExists = users.some(user => user.email === email && user.id !== id);
        if (emailExists) {
            return res.status(409).json('Email already in use');
        }
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;
    await saveUsers(users);
    return res.json('User updated successfully');
});


// DELETE /user{/:id}
app.delete('/user{/:id}', async (req, res) => {
    const { id } = req.params || req.body.id;
    const users = await getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json('User not found');
    }
    users.splice(userIndex, 1);
    await saveUsers(users);
    return res.json('User deleted successfully');
});


// GET /user/getByName
app.get('/user/getByName', async (req, res) => {
    const { name } = req.query;
    const users = await getUsers();
    const user = users.find(user => user.name === name);
    if (!user) {
        return res.status(404).json('User not found');
    }
    return res.json({ 'Found User Successfully': user });
});


// GET /user
app.get('/user', async (req, res) => {
    const users = await getUsers();
    return res.json({ 'Users Fetched Successfully': users });
});


// GET /user/filter
app.get("/user/filter", async (req, res) => {
    const { minAge } = req.query;
    const users = await getUsers();
    const filteredUsers = users.filter(
        user => user.age >= minAge
    );
    if (filteredUsers.length === 0) {
        return res.status(404).json("No users found");
    }
    return res.json({
        "Filtered Users Successfully": filteredUsers
    });
});


// GET /user/:id
app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const users = await getUsers();
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json('User not found');
    }
    return res.json({ 'Found User Successfully': user });
});



app.listen(port, () => {
    console.log(`Application is running on port: ${port}`)
})