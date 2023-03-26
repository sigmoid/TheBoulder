using TheBoulder.Models.Dialogue;

namespace TheBoulder.Models.ConversationPage
{
    public class EditConversationPageData
    {
        public List<ConversationBeat> PreviousConversation { get; set; }
        public DialoguePrompt CurrentPrompt { get; set; }
    }
}
