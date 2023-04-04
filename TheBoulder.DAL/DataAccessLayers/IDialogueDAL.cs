using TheBoulder.Models.Dialogue;

namespace TheBoulder.DAL.DataAccessLayers
{
	public interface IDialogueDAL
	{
		Task<Prompt> GetPromptById(int promptID);
		Task<List<PromptText>> GetPromptTextsByPromptID(int promptID);
		Task<List<Response>> GetResponsesByPromptID(int promptID);
	}
}