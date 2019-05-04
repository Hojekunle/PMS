using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PMS.API.Dtos;
using PMS.DAL;
using PMS.DAL.Models;
using PMS.DAL.Repositories;

namespace PMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //ApiController substitues the need for [FromBody] attribute for method parameter's inference from request and ModelState validation
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }
        // GET api/values
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            //ApiController attribute makes the passed arguments auto infer from request body rather than use [FromBody] arg attribute
            if (await _repo.UserExists(userDto.UserName.ToLower()))
                return BadRequest("User already exists");

            var newUser = new User
            {
                Username = userDto.UserName.ToLower()
            };

            await _repo.Register(newUser, userDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto userDto)
        {
            var userDetail = await _repo.Login(userDto.UserName.ToLower(), userDto.Password);
            if (userDetail == null)
                return Unauthorized();

            //bits of data to send to server in the token
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, userDetail.Id.ToString()),
                new Claim(ClaimTypes.Name, userDto.UserName)
            };

            //key to assign to the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            //generate Signing credentials
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //create the token descriptor that contains info about the claims for the token, token expiry date and Signing credentials 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            //create token and specify the token descriptor
            var token = tokenHandler.CreateToken(tokenDescriptor);

            //serialize the security token into jwt token with WriteToken mehtod and send token to client as an object 
            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}
