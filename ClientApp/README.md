TripCalculatorSB project details:

I chose to use the following project variables for my coding submission:

Domain:		Trip Calculator
Interface: 	Web UI(SPA)
Platform:	.NET
Backend:	C#
Frontend:	React

I used the ASP.NET Core with React.js template in visual studio, which creates a create-react-app.

For snapshot testing, I used Enzyme.

installed npm packages
enzyme
react-toastify

Assumptions/observations:
I had fun building this app, as I enjoy making usable user interfaces. :)
Per the project specification, the user can enter up to 6 people and their corresponding expenses.  The user can either enter the expense total, or enter them incrementally, as long as the name is entered correctly. I used react toast notifications to provide information to the user of successful student record creations, and updates. I also used toasts to warn the user if certain raised conditions were met, like if the user tries to create more than 6 students, or if they try and navigate to the Calculate Payments page with less than 3 created student records.  

Per the spec, I did observe some interesting behavior if the students who paid less did not pay significantly less than the student who spent the most.  

If I had more time to work on this, I would have added the user ability to see the students and their expenses on the student entry page, and I would have also added the ability to delete individual records.  

In addition, I would have added more testing on more complex component aspects, such as mocking async API calls. 