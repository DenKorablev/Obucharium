using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PhonebookApplication.Models
{
    public class PhonebookDB : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Group> Group { get; set; }

        static PhonebookDB()
        {
            Database.SetInitializer<PhonebookDB>(new PhonebookInitializer());
        }
    }
}