const express = require('express');
//const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'))

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile('public/html/home.html', { root: __dirname })
});

// Route for about
app.get('/about', (req, res) => {
    res.sendFile('public/html/about.html', { root: __dirname })
});

// Route for help
app.get('/help', (req, res) => {
    res.sendFile('public/html/help.html', { root: __dirname })
});

// Route for join
app.get('/join', (req, res) => {
    res.sendFile('public/html/join.html', { root: __dirname })
});

// Route for login
app.get('/login', (req, res) => {
    res.sendFile('public/html/login.html', { root: __dirname })
});

// Return 404 error code if page not found
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Server listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
