const app = require('./index');

app.listen(app.get('port'), () => console.log(`Server initialized on ${app.get('port')}`))