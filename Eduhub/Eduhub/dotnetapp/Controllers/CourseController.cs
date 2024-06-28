using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly CourseService _courseService;
        private readonly BlobService _blobService;


        public CourseController(CourseService courseService, BlobService blobService)
        {
            _courseService = courseService;
            _blobService = blobService;
        }

        // [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetAllCourses()
        {
            var courses = await _courseService.GetAllCourses();
            return Ok(courses);
        }

        [HttpGet("{courseId}")]
        public async Task<ActionResult<Course>> GetCourseById(int courseId)
        {
            var course = await _courseService.GetCourseById(courseId);

            if (course == null)
                return NotFound(new { message = "Cannot find any course" });

            return Ok(course);
        }

        // [HttpPost]
        // public async Task<ActionResult> AddCourse([FromBody] Course course)
        // {
        //     try
        //     {
        //         var success = await _courseService.AddCourse(course);
        //         if (success)
        //             return Ok(new { message = "Course added successfully" });
        //         else
        //             return StatusCode(500, new { message = "Failed to add course" });
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, new { message = ex.Message });
        //     }
        // }

        [HttpPost]
        public async Task<IActionResult> AddCourse([FromForm] CourseInputModel inputModel)
        {
            if (inputModel.CoverImage == null || inputModel.CoverImage.Length == 0)
                return BadRequest(new { message = "Cover image file is empty." });

            // Validate file type
            var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
            var fileExtension = Path.GetExtension(inputModel.CoverImage.FileName).ToLowerInvariant();

            if (string.IsNullOrEmpty(fileExtension) || !allowedExtensions.Contains(fileExtension))
            {
                return BadRequest(new { message = "Invalid file type. Only PNG, JPG, and JPEG files are allowed." });
            }

            // Upload the file to blob storage and get the URL
            var blobResponse = await _blobService.UploadAsync1(inputModel.CoverImage);

            // Create a new course object with the URL of the uploaded file
            var course = new Course
            {
                Title = inputModel.Title,
                Description = inputModel.Description,
                CourseStartDate = inputModel.CourseStartDate,
                CourseEndDate = inputModel.CourseEndDate,
                Category = inputModel.Category,
                CoverImage = blobResponse.Uri,
                Level = inputModel.Level
            };

            var success = await _courseService.AddCourse(course);
            if (success)
                return Ok(new { message = "Course added successfully" });
            else
                return StatusCode(500, new { message = "Failed to add course" });
        }



        // [HttpPut("{courseId}")]
        // public async Task<ActionResult> UpdateCourse(int courseId, [FromBody] Course course)
        // {
        //     try
        //     {
        //         var success = await _courseService.UpdateCourse(courseId, course);

        //         if (success)
        //             return Ok(new { message = "Course updated successfully" });
        //         else
        //             return NotFound(new { message = "Cannot find any course" });
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, new { message = ex.Message });
        //     }
        // }

        [HttpPut("{courseId}")]
        public async Task<ActionResult> UpdateCourse(int courseId, [FromForm] CourseInputModel inputModel)
        {
            try
            {
                // Fetch the existing course to update
                var existingCourse = await _courseService.GetCourseById(courseId);
                if (existingCourse == null)
                {
                    return NotFound(new { message = "Cannot find any course" });
                }

                // Validate file type if a new cover image is provided
                if (inputModel.CoverImage != null && inputModel.CoverImage.Length > 0)
                {
                    var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
                    var fileExtension = Path.GetExtension(inputModel.CoverImage.FileName).ToLowerInvariant();

                    if (string.IsNullOrEmpty(fileExtension) || !allowedExtensions.Contains(fileExtension))
                    {
                        return BadRequest(new { message = "Invalid file type. Only PNG, JPG, and JPEG files are allowed." });
                    }

                    // Upload the new file to blob storage and get the URL
                    var blobResponse = await _blobService.UploadAsync1(inputModel.CoverImage);
                    existingCourse.CoverImage = blobResponse.Uri;
                }

                // Update course properties
                existingCourse.Title = inputModel.Title;
                existingCourse.Description = inputModel.Description;
                existingCourse.CourseStartDate = inputModel.CourseStartDate;
                existingCourse.CourseEndDate = inputModel.CourseEndDate;
                existingCourse.Category = inputModel.Category;
                existingCourse.Level = inputModel.Level;

                var success = await _courseService.UpdateCourse(courseId, existingCourse);

                if (success)
                    return Ok(new { message = "Course updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any course" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        [HttpDelete("{courseId}")]
        public async Task<ActionResult> DeleteCourse(int courseId)
        {
            try
            {
                var success = await _courseService.DeleteCourse(courseId);

                if (success)
                    return Ok(new { message = "Course deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any course" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

    }
}
