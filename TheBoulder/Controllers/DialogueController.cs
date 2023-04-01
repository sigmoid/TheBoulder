using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheBoulder.Models.ConversationPage;
using TheBoulder.Models.Dialogue;

namespace TheBoulder.Controllers
{

	[Route("api/[controller]")]
	[ApiController]
	public class DialogueController : ControllerBase
	{
		private IList<DialoguePrompt> _state = new List<DialoguePrompt>() {
			new DialoguePrompt(){
				ID=1,
				Texts= new List<DialoguePromptText>()
				{
					new DialoguePromptText()
					{
						Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim a orci ut pharetra. Integer sollicitudin tellus est, eu hendrerit tellus vehicula ut."
					}
				},
				Responses= new List<DialogueResponse>()
				{
					new DialogueResponse(){
						Text="Hello, sisyphus"
					},
					new DialogueResponse(){
						Text="Who are you?",
						NextPromptId=2
					}
				}
			},
			new DialoguePrompt(){
				ID=2,
				Texts= new List<DialoguePromptText>()
				{
					new DialoguePromptText()
					{
						Text="Do you have anything else you want to ask me?"
					}
				},
				Responses= new List<DialogueResponse>()
				{
					new DialogueResponse(){
						Text="no way no way"
					},
				}
			}
		};

		[HttpGet]
		[Route("get-conversation")]
		public EditConversationPageData GetConversation([FromQuery]int id)
		{
			return new EditConversationPageData()
			{
				PreviousConversation = new List<ConversationBeat>()
				{
					new ConversationBeat() {
						PromptId = 0,
						Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim a orci ut pharetra. Integer sollicitudin tellus est, eu hendrerit tellus vehicula ut."
					},
					new ConversationBeat() {
						ResponseId = 1,
						Text = "Maecenas in ipsum odio. Ut aliquet sodales sem consequat aliquet. Maecenas urna libero, rhoncus nec fringilla a, commodo sed velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ut leo at sapien laoreet euismod."
					},
					new ConversationBeat() {
						PromptId = 2,
						Text = "Proin posuere ullamcorper magna, et auctor lectus. Aenean eget aliquam felis, a pretium erat. Suspendisse porta finibus iaculis. Integer in erat efficitur, tristique erat vel, dapibus diam."
					},
					new ConversationBeat() {
						ResponseId = 3,
						Text = " Nunc semper volutpat commodo. Vestibulum sagittis sit amet justo sit amet fringilla. Nam congue ultricies magna, id interdum dolor hendrerit eu."
					},
				},
				CurrentPrompt = _state.Last()
			};
		}

		[HttpPost]
		[Route("save-prompt")]
		public void SavePrompt(DialoguePrompt prompt)
		{
			Console.WriteLine(prompt.ToString());
		}
	}
}
