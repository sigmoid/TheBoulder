namespace TheBoulder.DAL
{
	public interface ISQLDataAccess
	{
		string ConnectionStringName { get; set; }

		Task<List<T>> LoadData<T, U>(string sql, U parameters);
		Task<T> LoadDataSingle<T, U>(string sql, U parameters);
		Task SaveData<T>(string sql, T paramaters);
	}
}