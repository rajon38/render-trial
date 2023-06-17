const app = require('./app');

const port = 8020;

app.listen(port, function () {
    console.log(`Server Running on port ${port}`);
})