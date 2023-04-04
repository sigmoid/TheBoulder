using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheBoulder.Models.Dialogue
{
	public class PromptText
	{
		public int ID { get; set; }
		public int PromptID { get; set; }
		public string Text { get; set; }
		public string Speaker { get; set; }
	}
}
