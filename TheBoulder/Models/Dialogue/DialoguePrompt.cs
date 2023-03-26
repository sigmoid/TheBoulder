namespace TheBoulder.Models.Dialogue
{
    public class DialoguePrompt
    {
        public int ID { get; set; }
        public int ConversationID { get; set; }
        public IList<DialoguePromptText> Texts { get; set; }

        public IList<DialogueResponse> Responses { get; set; }
    }
}
