/*Declaracion incial del modulo y las rutas*/
var app = angular.module('Generico', ['angular-growl']);

/*Injecta los controladores*/
app.controller('UsuarioController', UsuarioController);

//Injecta servicio
app.service('DataHttpService', DataHttpService);

//Mensajes growl
app.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive({ success: 3000, error: 3000, warning: 3000, info: 3000 })

}]);