using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheBoulder.Models;

namespace TheBoulder.Controllers
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
