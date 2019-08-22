using _01_Dal.Entidades;
using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace _01_Dal.Dal
{
    public class Metodos
    {
        public IEnumerable<TipDocument> ConsultarTipo()
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConCC"].ToString());
            try
            {
                using (IDbConnection db = conn)
                {
                    return conn.Query<TipDocument>("sp_Tip_Documents", new { }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Usuarios> InsertarUsu(Usuarios ObjUser)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConCC"].ToString());
            try
            {
                using (IDbConnection db = conn)
                {
                    var p = new DynamicParameters();

                    p.Add("@TipDoc", ObjUser.TipDoc, dbType: DbType.Int16, direction: ParameterDirection.Input);
                    p.Add("@Num", ObjUser.NumDoc, dbType: DbType.String, direction: ParameterDirection.Input);
                    p.Add("@Nombres", ObjUser.Nombres, dbType: DbType.String, direction: ParameterDirection.Input);
                    p.Add("@Apellidos", ObjUser.Apellidos, dbType: DbType.String, direction: ParameterDirection.Input);

                    return db.Query<Usuarios>("spInsertarUsuario ", p, commandType: CommandType.StoredProcedure).AsList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Usuarios> GetAllusr(string tipDoc, int numDoc)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConCC"].ToString());
            try
            {
                List<Usuarios> getResult = new List<Usuarios>();
                using (IDbConnection db = conn)
                {
                    var p = new DynamicParameters();

                    p.Add("@TipDoc", tipDoc, dbType: DbType.Int16, direction: ParameterDirection.Input);
                    p.Add("@Num", numDoc, dbType: DbType.String, direction: ParameterDirection.Input);

                    getResult = db.Query<Usuarios>("spConsultarUsuario ", p, commandType: CommandType.StoredProcedure).AsList();

                    if (getResult.Count == 0)
                    {
                        getResult = null;
                    }
                    return getResult;

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool ActualizarCaso(Usuarios con)
        {
            bool resp = false;
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConCC"].ToString());
            try
            {
                using (IDbConnection db = conn)
                {
                    var p = new DynamicParameters();

                    p.Add("@TipDoc", con.TipDoc, dbType: DbType.Int16, direction: ParameterDirection.Input);
                    p.Add("@NumDoc", con.NumDoc, dbType: DbType.String, direction: ParameterDirection.Input);
                    p.Add("@Nombres", con.Nombres, dbType: DbType.String, direction: ParameterDirection.Input);
                    p.Add("@Apellidos", con.Apellidos, dbType: DbType.String, direction: ParameterDirection.Input);

                    var RS = db.Execute("spActualizarUsuario", p, commandType: CommandType.StoredProcedure);

                    if (RS == 1)
                    {
                        resp = true;
                    }
                    return resp;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DelUsr(Usuarios con)
        {
            bool resp = false;
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConCC"].ToString());
            try
            {
                using (IDbConnection db = conn)
                {
                    var p = new DynamicParameters();

                    p.Add("@TipDoc", con.TipDoc, dbType: DbType.Int16, direction: ParameterDirection.Input);
                    p.Add("@NumDoc", con.NumDoc, dbType: DbType.String, direction: ParameterDirection.Input);

                    var RS = db.Execute("spElimnarUsuario", p, commandType: CommandType.StoredProcedure);

                    if (RS == 1)
                    {
                        resp = true;
                    }
                    return resp;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
