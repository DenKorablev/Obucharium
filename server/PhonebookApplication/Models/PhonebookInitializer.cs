using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PhonebookApplication.Models
{

    public class PhonebookInitializer : DropCreateDatabaseAlways<PhonebookDB>
    {
        public readonly string[] names =
        {
            "Jeff",
            "Bill",
            "Bernard",
            "Mark",
            "Carlos",
            "David",
        };

        public readonly string[] towns =
        {
            "Paris",
            "Rome",
            "Moscow",
            "New-York",
            "London",
            "Tokyo",
        };

        public readonly string[] name_groups =
{
            "Friends",
            "Work",
            "Hobby",
            "Family",
            "Music",
        };

        protected override void Seed(PhonebookDB context)
        {
            var groups = name_groups.Select((gr_name, id) => new PersonGroup { Name = gr_name, Id = id });
            context.Groups.AddRange(groups);
            var random = new Random();

            for (var i = 0; i < names.Length; i++)
            {
                context.Contacts.Add(new Contact
                {
                    Name = names[i],
                    Phone = Math.Abs((int)names[i].GetHashCode()).ToString().Substring(0, 6).PadRight(6, '0'),
                    Town = towns[i],
                    GroupID = groups.FirstOrDefault(g => g.Id == random.Next(1, 6))?.Id
                });
            }
            base.Seed(context);
        }
    }
}