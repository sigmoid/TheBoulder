using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheBoulder.Models.Dialogue
{
	public class Prompt
	{
		public int ID { get; set; }
		public List<PromptText> Texts { get; set; }
		public List<Response> Responses { get; set; }
	}
}
