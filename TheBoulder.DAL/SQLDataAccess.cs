namespace TheBoulder.DAL
{
	using Dapper;
	using Microsoft.Extensions.Configuration;
	using System;
	using System.Collections.Generic;
	using System.Data;
	using System.Linq;
	using System.Text;
	using System.Threading.Tasks;
	using Microsoft.Data.SqlClient;

	namespace DataAccessLibrary
	{
		public class SQLDataAccess : ISQLDataAccess
		{
			private readonly IConfiguration _config;

			public string ConnectionStringName { get; set; } = "Default";

			public SQLDataAccess(IConfiguration config)
			{
				_config = config;
			}

			public async Task<List<T>> LoadData<T, U>(string sql, U parameters)
			{
				string connectionString = _config.GetConnectionString(ConnectionStringName);

				using (IDbConnection connection = new SqlConnection(connectionString))
				{
					var data = await connection.QueryAsync<T>(sql, parameters);

					return data.ToList();
				}
			}

			public async Task SaveData<T>(string sql, T paramaters)
			{
				string connectionString = _config.GetConnectionString(ConnectionStringName);

				using (IDbConnection connection = new SqlConnection(connectionString))
				{
					try
					{
						await connection.ExecuteAsync(sql, paramaters);
					}
					catch (Exception e)
					{
					}
				}
			}

			public async Task<T> LoadDataSingle<T, U>(string sql, U parameters)
			{
				string connectionString = _config.GetConnectionString(ConnectionStringName);

				using (IDbConnection connection = new SqlConnection(connectionString))
				{
					var data = await connection.QueryAsync<T>(sql, parameters);

					return data.SingleOrDefault();
				}
			}
		}
	}

}