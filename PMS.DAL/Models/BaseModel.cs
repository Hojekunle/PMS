using PMS.DAL.ModelInterfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DAL.Models
{
    public class BaseModel: IDbModel
    {
        [Key]
        public Guid Id { get; set; }
    }
}
