const express = require('express');
const path = require('path');

const environmentsHandler = require('./api/environments/index.js');
const environmentIdHandler = require('./api/environments/[id].js');
const seedHandler = require('./api/seed.js');
const registerHandler = require('./api/auth/register.js');
const loginHandler = require('./api/auth/login.js');
const meHandler = require('./api/auth/me.js');
const pinsHandler = require('./api/auth/pins.js');
const usersHandler = require('./api/auth/users.js');
const changePasswordHandler = require('./api/auth/change-password.js');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

function attachRouteParamToQuery(req, routeParamName) {
  req.query = {
    ...req.query,
    [routeParamName]: req.params[routeParamName],
  };
}

function handleEnvironmentById(req, res) {
  req.query = {
    ...(req.query || {}),
    id: req.params.id,
  };
  return environmentIdHandler(req, res);
}

app.route('/api/environments')
  .get((req, res) => environmentsHandler(req, res))
  .post((req, res) => environmentsHandler(req, res));

app.route('/api/environments/:id')
  .get(handleEnvironmentById)
  .put(handleEnvironmentById)
  .delete(handleEnvironmentById);

app.post('/api/auth/register', (req, res) => registerHandler(req, res));
app.post('/api/auth/login', (req, res) => loginHandler(req, res));
app.post('/api/auth/change-password', (req, res) => changePasswordHandler(req, res));
app.get('/api/auth/me', (req, res) => meHandler(req, res));
app.route('/api/auth/pins')
  .get((req, res) => pinsHandler(req, res))
  .put((req, res) => pinsHandler(req, res));
app.route('/api/auth/users')
  .get((req, res) => usersHandler(req, res))
  .put((req, res) => usersHandler(req, res));

app.post('/api/seed', (req, res) => seedHandler(req, res));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ENV Navigator running on http://localhost:${PORT}`);
});
