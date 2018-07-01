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
            "David"
        };
        protected override void Seed(PhonebookDB context)
        {
            foreach (var name in names)
            {
                context.Contacts.Add(new Contact
                {
                    Name = name,
                    Phone = Math.Abs((int)name.GetTypeCode()).ToString().Substring(0, 9).PadRight(6, '0')
                });
            }
            base.Seed(context);
        }
    }
}