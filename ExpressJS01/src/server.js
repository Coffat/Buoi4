require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 8888;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút' },
});

app.use(helmet());
app.use(cors());
app.use('/v1/api', limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);

const webRoutes = express.Router();
webRoutes.get('/', getHomepage);
app.use('/', webRoutes);

app.use('/v1/api', apiRoutes);

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
