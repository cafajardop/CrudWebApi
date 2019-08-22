using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using _01_Dal.Entidades;


namespace WebApiDigital.Controllers
{
    [RoutePrefix("TipDocument")]
    public class GenericoTestController : ApiController
    {
        [HttpGet]
        [Route("GetTipo")]
        public IHttpActionResult GetTipoDocumento()
        {
            try
            {
                var resp = new _01_Dal.Dal.Metodos().ConsultarTipo();
                return Ok(resp);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
