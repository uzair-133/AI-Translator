const express  = require('express')
const app = express();
const aiRouter  = require('./Routes/translatorRoutes')

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format. If sending multiline text in Postman, replace newlines with \\n or format JSON properly.",
    });
  }
  next();
});

app.use('/api/ai', aiRouter);



module.exports = app;