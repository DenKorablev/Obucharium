using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using PhonebookApplication.Models;

namespace PhonebookApplication.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PersonGroupsController : ApiController
    {
        private PhonebookDB db = new PhonebookDB();

        // GET: api/PersonGroups
        public IQueryable<PersonGroup> GetGroups()
        {
            return db.Groups;
        }

        // GET: api/PersonGroups/5
        [ResponseType(typeof(PersonGroup))]
        public async Task<IHttpActionResult> GetPersonGroup(int id)
        {
            PersonGroup personGroup = await db.Groups.FindAsync(id);
            if (personGroup == null)
            {
                return NotFound();
            }

            return Ok(personGroup);
        }

        // PUT: api/PersonGroups/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPersonGroup(int id, PersonGroup personGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != personGroup.Id)
            {
                return BadRequest();
            }

            db.Entry(personGroup).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonGroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/PersonGroups
        [ResponseType(typeof(PersonGroup))]
        public async Task<IHttpActionResult> PostPersonGroup(PersonGroup personGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Groups.Add(personGroup);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = personGroup.Id }, personGroup);
        }

        // DELETE: api/PersonGroups/5
        [ResponseType(typeof(PersonGroup))]
        public async Task<IHttpActionResult> DeletePersonGroup(int id)
        {
            PersonGroup personGroup = await db.Groups.FindAsync(id);
            if (personGroup == null)
            {
                return NotFound();
            }

            db.Groups.Remove(personGroup);
            await db.SaveChangesAsync();

            return Ok(personGroup);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonGroupExists(int id)
        {
            return db.Groups.Count(e => e.Id == id) > 0;
        }
    }
}