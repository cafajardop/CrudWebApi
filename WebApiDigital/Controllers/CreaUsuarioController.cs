using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using _01_Dal.Entidades;

namespace WebApiDigital.Controllers
{
    [RoutePrefix("Usuarios")]
    public class CreaUsuarioController : ApiController
    {
        [HttpPost]
        [Route("IUsr")]
        public IHttpActionResult InsertaUsuario(Usuarios usr)
        {
            try
            {
                var resp = new _01_Dal.Dal.Metodos().InsertarUsu(usr);

                return Ok(resp);
            }

            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("GUsr/{tipDoc}/{numDoc:int}")]
        public IHttpActionResult Traeusuario(string tipDoc, int numDoc)
        {
            try
            {
                var resp = new _01_Dal.Dal.Metodos().GetAllusr(tipDoc, numDoc);
                return Ok(resp);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("UUsr")]
        public IHttpActionResult ActualizaCasoStore(Usuarios usr)
        {
            try
            {
                var resp = new _01_Dal.Dal.Metodos().ActualizarCaso(usr);
                return Ok(resp);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("DUsr")]
        public IHttpActionResult BorrarUsuario(Usuarios usr)
        {
            try
            {
                var resp = new _01_Dal.Dal.Metodos().DelUsr(usr);
                return Ok(resp);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }

}

