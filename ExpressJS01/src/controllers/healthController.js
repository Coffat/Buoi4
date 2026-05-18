const { ok } = require('../utils/apiResponse');

const getHealth = (req, res) =>
  ok(res, {
    status: 'ok',
    version: '1',
  });

module.exports = { getHealth };
