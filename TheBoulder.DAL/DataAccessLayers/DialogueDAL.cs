using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBoulder.Models.Dialogue;

namespace TheBoulder.DAL.DataAccessLayers
{
	public class DialogueDAL : IDialogueDAL
	{
		private readonly ISQLDataAccess _db;

		public DialogueDAL(ISQLDataAccess db)
		{
			_db = db;
		}


		public async Task<Prompt> GetPromptById(int promptID)
		{
			string sql = "select * from Boulder.Dialogue.Prompt where ID = @promptID";

			var res = await _db.LoadDataSingle<Prompt, dynamic>(sql, new { promptID });

			res.Responses = await GetResponsesByPromptID(promptID);
			res.Texts = await GetPromptTextsByPromptID(promptID);

			return res;
		}

		public async Task<List<Response>> GetResponsesByPromptID(int promptID)
		{
			string sql = "select * from Boulder.Dialogue.Response where PromptID = @promptID";

			var res = await _db.LoadData<Response, dynamic>(sql, new { promptID });

			return res;
		}

		public async Task<List<PromptText>> GetPromptTextsByPromptID(int promptID)
		{
			string sql = "select * from Boulder.Dialogue.PromptText where PromptID = @promptID";

			var res = await _db.LoadData<PromptText, dynamic>(sql, new { promptID });

			return res;
		}
	}
}
