using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheBoulder.Models.Dialogue
{
	public class Response
	{
		public int ID { get; set; }
		public int PromptID { get; set; }
		public int NextPromptID { get; set; }
		public string Text { get; set; }
	}
}
