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

        public readonly string[] groups_name =
        {
            "Family",
            "Hobby",
            "Work",
            "Friends",
        };

        protected override void Seed(PhonebookDB context)
        {
            Random random_number = new Random();
            var groups = groups_name.Select((gr_name, id) => new Group { Name = gr_name, Id = id });
            context.Group.AddRange(groups);

            for (var i = 0; i < names.Length; i++)
            {
                context.Contacts.Add(new Contact
                {
                    Name = names[i],
                    Phone = Math.Abs((int)names[i].GetHashCode()).ToString().Substring(0, 6).PadRight(6, '0'),
                    Town = towns[i],
                    GroupID = groups.FirstOrDefault(g => g.Id == random_number.Next(1, 5))?.Id
                });
            }
            base.Seed(context);
        }
    }
}