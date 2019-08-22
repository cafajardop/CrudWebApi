var DataHttpService = function ($http) {
    /*******************************************/
    /*Conexion Modulos
    /*******************************************/
    var UrlSite = "";
    this.GetTipo = function () {
        var response = $http({
            url: UrlSite + "/TipDocument/GetTipo",
            method: "GET"
        });
        return response;
    };

    this.InsrtMod = function (idop) {
        var response = $http({
            url: UrlSite + "/Usuarios/IUsr/",
            method: "POST",
            data: idop
        });
        return response;
    };

    this.TraeMod = function (tipDoc, numDoc) {
        var response = $http({
            url: UrlSite + "/Usuarios/GUsr/" + tipDoc + "/" + numDoc,
            method: "GET"
        });
        return response;


    };

    this.ActCasNum = function (idop) {
        var response = $http({
            url: UrlSite + "/Usuarios/UUsr/",
            method: "POST",
            data: idop
        });
        return response;
    };

    this.DelMod = function (idop) {
        var response = $http({
            url: UrlSite + "/Usuarios/DUsr/",
            method: "POST",
            data: idop
        });
        return response;
    };
}

DataHttpService.$inject = ['$http'];
