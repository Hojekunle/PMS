using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DAL.ModelInterfaces
{
    public interface IDbModel
    {
        /// <summary>
        /// The primary key. Required in Entity framework.
        /// </summary>
        Guid Id { get; set; }
    }
}
