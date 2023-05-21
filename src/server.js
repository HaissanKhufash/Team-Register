const app = require('./index');

require('./database') // Carry database connection out.

app.listen(app.get('port'), () => console.log(`Server initialized on ${app.get('port')}`))