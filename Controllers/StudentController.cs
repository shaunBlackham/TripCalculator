using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text.Json;

namespace TripCalculatorShaunB.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly ILogger<StudentController> _logger;


        public StudentController(ILogger<StudentController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public int CreateStudent([FromBody] Student student)
        {
            List<Student> students = new List<Student>() {
                            new Student(){ Id = 1},
                            new Student(){ Id = 2},
                            new Student(){ Id = 3},
                            new Student(){ Id = 4},
                            new Student(){ Id = 5},
                            new Student(){ Id = 6}
            };

            int currentStudentCount = student.StudentCount;
            string fullPath = "../TripCalculatorShaunB/StudentJson/studentJson.txt";

            if (currentStudentCount == 0)
            {
                students[0].Name = student.Name;
                students[0].Expense = student.Expense;
                // create file for mock storage
                var json1 = JsonSerializer.Serialize(students);
                System.IO.File.WriteAllText(fullPath, json1);
                currentStudentCount = 1;
            }
            else
            {
                string studentCreatedorEdited = "";

                // pull file, update List with current data
                if (System.IO.File.Exists(fullPath))
                {
                    string readtext = System.IO.File.ReadAllText(fullPath);
                    students = JsonSerializer.Deserialize<List<Student>>(readtext);
                }

                for (int i = 0; i < students.Count; i++)
                {
                    if (studentCreatedorEdited != "")
                    {
                        break;
                    }
                    // create
                    if (students[i].Name == null)
                    {
                        students[i].Name = student.Name;
                        students[i].Expense = student.Expense;
                        studentCreatedorEdited = "created";
                    }
                    // update with additional expense
                    else if (students[i].Name == student.Name)
                    {
                        students[i].Expense += student.Expense;
                        studentCreatedorEdited = "edited";
                    }
                }
                currentStudentCount = students.Where(i => i.Name != null).Count();
                // special case, where the max number of students are created, and the user tries to create another
                if (studentCreatedorEdited == "")
                {
                    currentStudentCount = -1;
                }
                else if (studentCreatedorEdited == "edited") {
                    currentStudentCount += 6;
                }
            }
            // create file for mock storage
            var json = JsonSerializer.Serialize(students);
            System.IO.File.WriteAllText(fullPath, json);

            return currentStudentCount;
        }

        [HttpGet]
        public IEnumerable<Student> GetStudentDetails()
        {
            string fullPath = "../TripCalculatorShaunB/StudentJson/studentJson.txt";

            // pull file, update List with current data
            if (System.IO.File.Exists(fullPath))
            {
                string readtext = System.IO.File.ReadAllText(fullPath);
                List<Student> students = JsonSerializer.Deserialize<List<Student>>(readtext);

                string studentWhoSpentTheMost = "";
                decimal currentStudentexpense = 0.00m;
                decimal highestExpense = 0.00m;
                decimal totalExpenses = 0.00m;

                // calculate who owes what to whom
                for (int i = 0; i < students.Count; i++)
                {
                    currentStudentexpense = students[i].Expense;
                    if (currentStudentexpense > highestExpense)
                    {
                        highestExpense = currentStudentexpense;
                        studentWhoSpentTheMost = students[i].Name;
                    }
                    totalExpenses += currentStudentexpense;
                }
                int studentCount = students.Where(i => i.Name != null).Count();
                decimal equalShare = totalExpenses / (decimal)studentCount;
                decimal diff = 0;
                // now fill in data for each student
                for (int i = 0; i < students.Count; i++)
                {
                    if (students[i].Name != studentWhoSpentTheMost && students[i].Name != null)
                    {
                        diff = Decimal.Round(equalShare - students[i].Expense, 2);
                        students[i].PaidTo = studentWhoSpentTheMost;
                        students[i].Reimbursement = Convert.ToString(diff);
                    }
                    else if (students[i].Name == studentWhoSpentTheMost) {
                        students[i].PaidTo = "payee";
                        students[i].Reimbursement = "N/A";
                    }
                }

                var filteredArray = students.Where(i => i.Name != null).ToArray();

                // write updated objects to file
                var json = JsonSerializer.Serialize(students);
                System.IO.File.WriteAllText(fullPath, json);

                return filteredArray;
            }
            else
            {
                return null;
            }
        }

        [HttpGet]
        [Route("count")]
        public int GetStudentCount()
        {
            int returnValue = 0;
            string fullPath = "../TripCalculatorShaunB/StudentJson/studentJson.txt";

            if (System.IO.File.Exists(fullPath))
            {
                string readtext = System.IO.File.ReadAllText(fullPath);
                List<Student> students = JsonSerializer.Deserialize<List<Student>>(readtext);
                returnValue = students.Where(i => i.Name != null).Count();
            }
            return returnValue;
        }
    }
}
