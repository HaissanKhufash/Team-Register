const app = require('./app');

require('./database');

app.listen(app.get('port'), () => console.log(`Server initialized on ${app.get('port')}`));
