using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PhonebookApplication.Models
{
    public class Contact
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        [Required]
        public string Name { get; set; }

        [JsonProperty("phone")]
        [Required]
        [RegularExpression("\\d+")]
        public string Phone { get; set; }

        [JsonProperty("town")]
        [Required]
        public string Town { get; set; }
    }
}