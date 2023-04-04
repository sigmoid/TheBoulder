using TheBoulder.Models.Dialogue;

namespace TheBoulder.Core.Services
{
	public interface IDialogueService
	{
		Task<Prompt> GetPromptById(int id);
	}
}