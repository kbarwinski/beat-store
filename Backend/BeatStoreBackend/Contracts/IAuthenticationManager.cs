﻿using Entities.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IAuthenticationManager
    {
        Task<bool> ValidateUser(AppUserAuthInputDto userForAuth);
        Task<string> CreateJwtToken();
    }
}
