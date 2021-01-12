//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/guest-hotels'));

app.get('/*', (req, res) =>
    res.sendFile('home.component.html', {root: 'dist/guest-hotels'}),
);

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || '8080'
app = express();

//set the port
app.set("port", PORT)