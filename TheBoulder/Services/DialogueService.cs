using TheBoulder.DAL.DataAccessLayers;
using TheBoulder.Models.Dialogue;

namespace TheBoulder.Core.Services
{
	public class DialogueService : IDialogueService
	{
		private readonly IDialogueDAL _db;
		public DialogueService(IDialogueDAL db)
		{
			_db = db;
		}

		public Task<Prompt> GetPromptById(int id)
		{
			return _db.GetPromptById(id);
		}
	}
}
