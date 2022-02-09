require('dotenv').config();
const express = require('express');

const {sequelize} = require('./database');
const {userRouter, authRouter, movieRouter} = require('./routers');
const {PORT} = require('./configs/config');

sequelize.sync().then(() => {
    console.log('db is ready');
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/movies', movieRouter);


app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});


app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
