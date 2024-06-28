using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Linq;
using System.Reflection;
using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;

namespace dotnetapp.Tests
{
    [TestFixture]
    public class Tests
    {

 [Test, Order(1)]
public async Task Backend_Test_Method_GetCourseById_In_CourseService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CourseService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo getCourseByIdMethod = serviceType.GetMethod("GetCourseById");

            if (getCourseByIdMethod != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(2)]
public async Task Backend_Test_Method_GetAllCourse_In_CourseService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CourseService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("GetAllCourses");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(3)]
public async Task Backend_Test_Method_AddCourse_In_CourseService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CourseService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("AddCourse");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(4)]
public async Task Backend_Test_Method_UpdateCourse_In_CourseService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CourseService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("UpdateCourse");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(5)]
public async Task Backend_Test_Method_DeleteCourse_In_CourseService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CourseService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("DeleteCourse");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
 [Test, Order(6)]
public async Task Backend_Test_Method_GetAllCourses_In_CourseController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CourseController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("GetAllCourses");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(7)]
public async Task Backend_Test_Method_GetCourseById_In_CourseController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CourseController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("GetCourseById");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(8)]
public async Task Backend_Test_Method_AddCourse_In_CourseController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CourseController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("AddCourse");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(9)]
public async Task Backend_Test_Method_UpdateCourse_In_CourseController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CourseController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("UpdateCourse");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(10)]
public async Task Backend_Test_Method_DeleteCourse_In_CourseController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CourseController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("DeleteCourse");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(11)]
public async Task Backend_Test_Method_Login_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("Login");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(12)]
public async Task Backend_Test_Method_Register_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCourseById method
            MethodInfo Method = serviceType.GetMethod("Register");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
}
}

