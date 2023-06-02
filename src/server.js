const app = require('./index');

require('./database');

app.listen(app.get('port'), () => console.log(`Server initialized on ${app.get('port')}`));
