using Microsoft.AspNetCore.Mvc;
using TheBoulder.Core.Models;

namespace TheBoulder.Core.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ItemController : ControllerBase
	{

		[HttpGet("{itemType:int}")]
		public ItemModel[] Get(int itemType)
		{
			return new ItemModel[1];
		}

		[HttpPost]
		[Route("test-send")]
		public void TestSend([FromBody] string testString)
		{

		}
	}
}
