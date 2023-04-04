using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheBoulder.Core.Models;

namespace TheBoulder.Core.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TestController : ControllerBase
	{
		[HttpGet]
		[Route("test-data")]
		public object TestData()
		{
			return new { message = "Test!" };
		}

		[HttpPost]
		[Route("test-post")]
		public void TestPost(ItemModel model)
		{
		}
	}
}
