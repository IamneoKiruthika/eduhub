using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public class CourseService
    {
        private readonly ApplicationDbContext _context;

        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Course>> GetAllCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course> GetCourseById(int courseId)
        {
            return await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == courseId);
        }

        public async Task<bool> AddCourse(Course course)
        {       
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateCourse(int courseId, Course course)
        {
            var existingCourse = await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == courseId);

            if (existingCourse == null)
                return false;

            // var overlappingCourse = await _context.Courses
            //     .Where(c => c.UserId == course.UserId && c.CourseId != courseId)
            //     .Where(c => c.CourseStartDate <= course.CourseEndDate && c.CourseEndDate >= course.CourseStartDate)
            //     .FirstOrDefaultAsync();

            // if (overlappingCourse != null)
            // {
            //     throw new CourseException("There is already a course scheduled for these dates");
            // }

            course.CourseId = courseId;
            _context.Entry(existingCourse).CurrentValues.SetValues(course);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCourse(int courseId)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == courseId);
            if (course == null)
                return false;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return true;
        }

    
    }
}
