using TheBoulder.Models.Dialogue;

namespace TheBoulder.Core.Models.ConversationPage
{
	public class EditConversationPageData
	{
		public List<ConversationBeat> PreviousConversation { get; set; }
		public Prompt CurrentPrompt { get; set; }
	}
}
