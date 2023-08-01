const router = require('express').Router();
const userRouters = require('./users');

router.get('/', (req, res) => {
  res.send(
        `<html>
        <body>
            <p>Ответ на сигнал из далёкого космоса111</p>
        </body>
        </html>`
    );
});

router.use('/users', userRouters);


module.exports = router;