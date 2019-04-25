using System;

namespace PMS.DAL.Models
{
    public class User
    {
        public Guid Id {get; set;}
        public string Username {get; set;}
        public byte[] PasswordHash {get; set;}
        public byte[] PasswordSalt {get; set;}      
    }
}