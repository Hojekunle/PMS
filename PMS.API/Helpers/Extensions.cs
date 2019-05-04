using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.API.Helpers
{
    public static class Extensions
    {
        /// <summary>  
        /// custom HttpResponse extension method : for use in adding error message and COR headers to global exceptions for errors in Production environment
        /// as COR headers are not added to http responses in Production environment. See startup.cs for usage 
        /// </summary>  
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        //public static void AddPagination(this HttpResponse response,
        //    int currentPage, int itemsPerPage, int totalItems, int totalPages)
        //{
        //    var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
        //    var camelCaseFormatter = new JsonSerializerSettings();
        //    camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
        //    response.Headers.Add("Pagination",
        //        JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
        //    response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        //}

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears(age) > DateTime.Today)
                age--;

            return age;
        }
    }
}
