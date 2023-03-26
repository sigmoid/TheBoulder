namespace TheBoulder.Models.Dialogue
{
	public class DialogueResponse
	{
		public int ID { get; set; }
		public string Text { get; set; }
		public int PromptId { get; set; }
		public int NextPromptId {get;set;}
	}
}
