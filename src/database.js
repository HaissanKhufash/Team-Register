const mongoose = require('mongoose'),
    { NODE_ENV, MONGODB_URL, MONGODB_URL_TEST } = process.env,
    uri = (NODE_ENV != 'production')
        ? MONGODB_URL_TEST
        : MONGODB_URL;

mongoose
    // useNewUrlParser ==> The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser. You should set useNewUrlParser: true unless that prevents you from connecting. 
    // Note that if you specify useNewUrlParser: true, you must specify a port in your connection string, like mongodb://localhost:27017/dbname.

    // useUnifiedTopology ==> False by default. Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true, except for the unlikely case that it prevents you from maintaining a stable connection.

    .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => { 
        if (NODE_ENV != 'test') console.log('Database conected');
    })
    .catch((err => { 
        if (NODE_ENV != 'test') console.log(err.message);
    }));