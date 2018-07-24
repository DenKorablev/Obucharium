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
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using PhonebookApplication.Models;

namespace PhonebookApplication.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using PhonebookApplication.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<PhoneGroup>("Groups");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class GroupsController : ODataController
    {
        private PhonebookDB db = new PhonebookDB();

        // GET: odata/Groups
        [EnableQuery]
        public IQueryable<PhoneGroup> GetGroups()
        {
            return db.Group;
        }

        // GET: odata/Groups(5)
        [EnableQuery]
        public SingleResult<PhoneGroup> GetPhoneGroup([FromODataUri] int key)
        {
            return SingleResult.Create(db.Group.Where(phoneGroup => phoneGroup.Id == key));
        }

        // PUT: odata/Groups(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<PhoneGroup> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PhoneGroup phoneGroup = await db.Group.FindAsync(key);
            if (phoneGroup == null)
            {
                return NotFound();
            }

            patch.Put(phoneGroup);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneGroupExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(phoneGroup);
        }

        // POST: odata/Groups
        public async Task<IHttpActionResult> Post(PhoneGroup phoneGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Group.Add(phoneGroup);
            await db.SaveChangesAsync();

            return Created(phoneGroup);
        }

        // PATCH: odata/Groups(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<PhoneGroup> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PhoneGroup phoneGroup = await db.Group.FindAsync(key);
            if (phoneGroup == null)
            {
                return NotFound();
            }

            patch.Patch(phoneGroup);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneGroupExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(phoneGroup);
        }

        // DELETE: odata/Groups(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            PhoneGroup phoneGroup = await db.Group.FindAsync(key);
            if (phoneGroup == null)
            {
                return NotFound();
            }

            db.Group.Remove(phoneGroup);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PhoneGroupExists(int key)
        {
            return db.Group.Count(e => e.Id == key) > 0;
        }
    }
}
