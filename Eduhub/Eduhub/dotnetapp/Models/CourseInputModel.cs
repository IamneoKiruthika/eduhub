using Microsoft.AspNetCore.Http;
using System;

namespace dotnetapp.Models
{
    public class CourseInputModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CourseStartDate { get; set; }
        public DateTime CourseEndDate { get; set; }
        public string Category { get; set; }
        public IFormFile CoverImage { get; set; } // IFormFile for uploading
        public string Level { get; set; }
    }
}
