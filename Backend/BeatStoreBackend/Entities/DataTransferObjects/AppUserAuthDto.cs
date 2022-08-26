using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects
{
    public class AppUserAuthDto
    {
        public string Token { get; set; }
        public List<string>? Roles { get; set; }
    }
}
