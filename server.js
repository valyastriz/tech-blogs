const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
require('dotenv').config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User } = require('./models');

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ 
  helpers,
  defaultLayout: 'main', // Set 'main' as the default layout
});

const app = express();
const PORT = process.env.PORT || 3001;

console.log(routes);

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(async () => {
  // Ensure the "Unknown" user exists
  await User.findOrCreate({
      where: { name: 'Unknown' },
      defaults: { email: 'unknown@example.com', password: 'password' }
  });

  app.listen(PORT, () => console.log('Now listening'));
});
