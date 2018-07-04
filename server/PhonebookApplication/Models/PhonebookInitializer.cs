using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PhonebookApplication.Models
{

    public class PhonebookInitializer : DropCreateDatabaseIfModelChanges<PhonebookDB>
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

        protected override void Seed(PhonebookDB context)
        {
            for (var i = 0; i < names.Length; i++)
            {
                context.Contacts.Add(new Contact
                {
                    Name = names[i],
                    Phone = Math.Abs((int)names[i].GetHashCode()).ToString().Substring(0, 6).PadRight(6, '0'),
                    Town = towns[i],
                });
            }
            base.Seed(context);
        }
    }
}