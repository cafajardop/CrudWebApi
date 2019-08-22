var UsuarioController = function ($scope, $rootScope, $location, $http, DataHttpService, growl) {
    DataHttpService.GetTipo().then(function (data) {
        $scope.TiposDoc = data.data;
        $scope.row1 = false;
        $scope.row2 = false;
    });


    //Insertar caso
    $scope.InsertarUsr = function () {
        var authobj = {};
        authobj.TipDoc = $scope.tipodoc;
        authobj.NumDoc = $scope.documento;
        authobj.Nombres = $scope.Nombre;
        authobj.Apellidos = $scope.Apellido;

        if (authobj.TipDoc == "" || authobj.TipDoc == undefined) {
            growl.warning('Debe Seleccionar un tipo de Documento', { title: 'Atención!' });
            return false;
        }
        if (authobj.NumDoc == "" || authobj.NumDoc == undefined) {
            growl.warning('Debe Ingresar un Numero de documento', { title: 'Atención!' });
            return false;
        }

        if (authobj.Nombres == "" || authobj.Nombres == undefined) {
            growl.warning('Debe Ingresar un Nombre', { title: 'Atención!' });
            return false;
        }

        if (authobj.Apellidos == "" || authobj.Apellidos == undefined) {
            growl.warning('Debe Ingresar un apellido', { title: 'Atención!' });
            return false;
        }

        DataHttpService.InsrtMod(authobj).then(function (resp) {
            growl.success('Usuario ' + authobj.NumDoc + ' creado correctamente!!', { title: 'Exito!' })
            setTimeout(function () {
                $scope.tipodoc = undefined
                $scope.documento = undefined;
                $scope.Nombre = undefined;
                $scope.Apellido = undefined;
            }, 2000);

        }, function (err) {
            $scope.novalido = err;
            });
    }

    //Consultar Usuarios
    $scope.TraerUsuarios = function () {
        if ($scope.tipodocUpd == "" || $scope.tipodocUpd == undefined) {
            growl.error('Debe Seleccionar un tipo de documento', { title: 'Atención!' });
            return false;
        }
        if ($scope.documentoUpd == "" || $scope.documentoUpd == undefined) {
            growl.error('Debe Seleccionar un Numero de Documento', { title: 'Atención!' });
            return false;
        }
        //var authobj = {};
        DataHttpService.TraeMod($scope.tipodocUpd, $scope.documentoUpd).then(function (resp) {
            debugger;
            if (resp.data == null) {
                growl.error('Usuario No existe', { title: 'Atención!' });
                //setTimeout(function () { location.reload(); }, 2000);
                setTimeout(function () { $scope.documentoUpd = undefined; $scope.authobj = undefined; }, 2000);
                $scope.tipodocUpd = undefined;
                return false;
            } else {
                $scope.authobj = resp.data[0];
                $scope.row1 = true;
                $scope.row2 = true;
            }
        });

    }

    $scope.ActualizaUsuario = function () {

        if ($scope.tipodocUpd == "" || $scope.tipodocUpd == undefined) {
            growl.error('Debe seleccionar un tipo de documento', { title: 'Atención!' });
            return false;
        }
        if ($scope.documentoUpd == "" || $scope.documentoUpd == undefined) {
            growl.error('Debe Seleccionar un Numero de Documento', { title: 'Atención!' });
            return false;
        }

        var authobjUsu = {};
        authobjUsu.TipDoc = $scope.tipodocUpd;
        authobjUsu.NumDoc = $scope.documentoUpd;
        authobjUsu.Nombres = $scope.authobj.Nombres;
        authobjUsu.Apellidos = $scope.authobj.Apellidos;

        DataHttpService.ActCasNum(authobjUsu).then(function (resp) {
            //alert("Actualizado");
            //location.reload();
            growl.success('Usuario Actualizado Correctamente!', { title: 'Exito!' });
            setTimeout(function () { location.reload(); }, 3000);
        }, function (err) {
            $scope.novalido = err;
        });
    }

    //Consultar Usuarios
    $scope.TraerUsuariosDel = function () {
        if ($scope.tipodocDel == "" || $scope.tipodocDel == undefined) {
            growl.error('Debe Seleccionar un tipo de documento', { title: 'Atención!' });
            return false;
        }
        if ($scope.documentoDel == "" || $scope.documentoDel == undefined) {
            growl.error('Debe Seleccionar un Numero de Documento', { title: 'Atención!' });
            return false;
        }
        //var authobj = {};
        DataHttpService.TraeMod($scope.tipodocDel, $scope.documentoDel).then(function (resp) {
            debugger;
            if (resp.data == null) {
                growl.error('Usuario No existe', { title: 'Atención!' });
                //setTimeout(function () { location.reload(); }, 2000);
                setTimeout(function () { $scope.documentoUpd = undefined; $scope.authobj = undefined; }, 2000);
                $scope.tipodocUpd = undefined;
                return false;
            } else {
                $scope.authobj = resp.data[0];
                $scope.row3 = true;
                $scope.row4 = true;
            }
        });

    }

    $scope.BorraUsr = function () {
        if ($scope.tipodocDel == "" || $scope.tipodocDel == undefined) {
            growl.error('Debe seleccionar un tipo de documento', { title: 'Atención!' });
            return false;
        }
        if ($scope.documentoDel == "" || $scope.documentoDel == undefined) {
            growl.error('Debe Seleccionar un Numero de Documento', { title: 'Atención!' });
            return false;
        }

        var authobjDel = {};
        authobjDel.TipDoc = $scope.tipodocDel;
        authobjDel.NumDoc = $scope.documentoDel;

        DataHttpService.DelMod(authobjDel).then(function (resp) {
            growl.success('Usuario Eliminado Correctamente!', { title: 'Exito!' });
            setTimeout(function () { location.reload(); }, 3000);
        }, function (err) {
            $scope.novalido = err;
        });
    }
}
UsuarioController.$inject = ['$scope', '$rootScope', '$location', '$http', 'DataHttpService', 'growl'];