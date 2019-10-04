/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/

class ExpressConfig{

	constructor(app){
		// Setting .html as the default template extension
		app.set('view engine', 'html');

		//Files
    app.use(require('express').static(require('path').join(__dirname, '../../React App/build')));
    app.get('/', function(req, res) {
      res.sendFile(require('path').join(__dirname, '../../React App/build', 'index.html'));
    });
	}
}
module.exports = ExpressConfig;
