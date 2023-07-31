const router = require('express').Router();
const userRouter = require('./users');

router.get('/', (req, res) => {
  res.send(
        `<html>
        <body>
            <p>Ответ на сигнал из далёкого космоса</p>
        </body>
        </html>`
    );
});

router.use('/', userRouter);


module.exports = router;