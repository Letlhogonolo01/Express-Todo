const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Data objects for registration and login
let regobj = {};
let loginobj = {};

app.get('/api/user', (req, res) => {
  res.json(regobj);
});

app.get('/api/user/:id', (req, res) => {
  const id = req.params.id;
  const user = regobj[id];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/api/user', (req, res) => {
  const { id, name, email, password, gender } = req.body;
  regobj[id] = { id, name, email, password, gender };
  console.log(req.body);
  res.json({ status: 'ok' });
});

app.put('/api/user/:id', (req, res) => {
  const id = req.params.id;
  if (regobj[id]) {
    const { name, email, password, gender } = req.body;
    regobj[id] = { id, name, email, password, gender };
    res.json({ status: 'ok' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.patch('/api/user/:id', (req, res) => {
  const id = req.params.id;
  if (regobj[id]) {
    const { name, email, password, gender } = req.body;
    if (name) {
      regobj[id].name = name;
    }
    if (email) {
      regobj[id].email = email;
    }
    if (password) {
      regobj[id].password = password;
    }
    if (gender) {
      regobj[id].gender = gender;
    }
    res.json({ status: 'ok' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = Object.values(regobj).find(u => u.email === email && u.password === password);
  if (user) {
    const sessionId = generateSessionId(); // Replace with your own session ID generation logic
    loginobj[sessionId] = user;
    res.json({ sessionId });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected route - example
app.get('/api/protected', (req, res) => {
  const sessionId = req.headers.authorization; // Assumes the session ID is sent in the 'Authorization' header
  const user = loginobj[sessionId];
  if (user) {
    res.json({ message: 'Access granted' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Helper function to generate a session ID
function generateSessionId() {
  return Math.random().toString(36).substr(2, 9);
}
