require('dotenv').config();
const app = require('./src/app')
const connectToDb = require('./src/db/db')

connectToDb();
const PORT = 3000 || process.env.PORT
app.listen(()=> {
    console.log(`Server is Running ON ${PORT}`)
})