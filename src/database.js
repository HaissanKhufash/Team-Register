const mongoose = require('mongoose'),
    MONGODB_URI = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.HOST}.cvfadkv.mongodb.net/${process.env.DATABASE}`;

mongoose
    // useNewUrlParser ==> The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser. You should set useNewUrlParser: true unless that prevents you from connecting. 
    // Note that if you specify useNewUrlParser: true, you must specify a port in your connection string, like mongodb://localhost:27017/dbname.

    // useUnifiedTopology ==> False by default. Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true, except for the unlikely case that it prevents you from maintaining a stable connection.

    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('Database connected'))
    .catch(err => console.log(err));