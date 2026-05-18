require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/index');
const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 8888;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);

const webRoutes = express.Router();
webRoutes.get('/', getHomepage);
app.use('/', webRoutes);

app.use('/v1/api', apiRoutes);
app.use(errorHandler);

(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log('>>> Error connect to DB: ', error);
    process.exit(1);
  }
})();
