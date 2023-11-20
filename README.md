# Task-Manager-App
Created an App with Reactnative
Task Manager
TaskManager is a user-friendly task management app designed to streamline your daily activities and boost productivity. With an intuitive interface, it allows you to organize tasks, set priorities, and track progress effortlessly.

 
#### The main front end code can be found in another repository (TMFrontProject)
Key Features:
* Task Organization: Create, categorize, and organize tasks based on projects or categories.
* Priority Settings: Set priorities to highlight urgent tasks and maintain focus.
* Deadline Tracking: Assign due dates to tasks and receive reminders to stay on track.
* Progress Monitoring: Track task completion and monitor progress easily.
TaskManager aims to simplify your workflow, enabling you to manage tasks efficiently, whether it's personal chores, work-related assignments, or team projects.

![2023-11-19 16-25-04](https://github.com/AtefAhmedM/Task-Manager-App/assets/142015943/5c1086a4-9ad0-4ead-8b4d-43595d6b3657)

![2023-11-19 16-25-04 (1)](https://github.com/AtefAhmedM/Task-Manager-App/assets/142015943/181eb722-76d6-4613-9937-84e0cc4536ee)

![2023-11-19 16-25-04 (2)](https://github.com/AtefAhmedM/Task-Manager-App/assets/142015943/f3bc88fe-3ca9-4573-9dce-f9db76c0315c)

## Table of Contents
About
Features
Installation
Usage
Contributing
License

# About
TaskManager is a user-friendly task management app designed to streamline your daily activities and boost productivity. With an intuitive interface, it allows you to organize tasks, set priorities, and track progress effortlessly. Created the ux concept in figma https://www.figma.com/file/j21siNjAu5xTUfraIWzxXb/Untitled?type=design&node-id=0-1&mode=design&t=0sK2WgtCI9OJV0OO-0. 

#  Learning outcomes
## React Native Frontend:
* Cross-Platform Development: Understanding how to build mobile applications for both iOS and Android using a single codebase in React Native.
* Component-Based Architecture: Learning to design reusable and modular components that enhance code maintainability and scalability.
* State Management: Implementing state management using tools like Redux, Context API, or React hooks to manage app state efficiently.
* API Integration: Integrating with backend services using fetch, Axios, or other HTTP request libraries to retrieve and update data from the server.
* User Interface (UI) Design: Gaining experience in designing intuitive and responsive user interfaces to enhance user experience on mobile devices.
## Node.js Express Backend with SQLite:
* RESTful API Development: Understanding the principles of creating RESTful APIs to handle HTTP requests for CRUD operations.
* Database Integration: Learning to work with SQLite as a relational database management system, including schema creation, querying, and data manipulation.
* Middleware Implementation: Implementing middleware functions for authentication, request validation, logging, and error handling.
* Asynchronous Programming: Grasping concepts of asynchronous programming in Node.js, utilizing callbacks, Promises, or async/await for handling asynchronous operations.
* Security Measures: Implementing basic security practices such as parameterized queries, input validation, and hashing for sensitive data stored in the database.
## Common Learning Outcomes:
* Full Stack Development Concepts: Understanding the workflow involved in building a complete application, from frontend design to backend development.
* Error Handling and Debugging: Learning to identify and debug errors in both frontend and backend codebases, enhancing troubleshooting skills.
* Deployment Considerations: Gaining insights into deploying frontend applications to mobile devices and backend services to servers or cloud platforms.
* Collaborative Development: Experience in collaborating and version controlling code using Git, managing repositories, and integrating changes between frontend and backend.

# Features
* Sign Up/Sign In Pages: The Sign Up and Sign In pages are the entry points to the app, allowing users to create accounts or log in to existing ones. These pages would incorporate secure authentication methods, such as email verification or OAuth, to ensure user data safety.
* Authentication and Authorization: Understanding user authentication flows using technologies like Firebase Authentication or JWT.
* Form Validation: Implementing client-side and server-side form validation to ensure data integrity.
* Error Handling: Learning to manage and display error messages effectively to guide users during the sign-up/sign-in process.
* Home Page: The Home Page serves as the central hub where users can view an overview of their tasks, sorted by priority or due date. This page may feature a task list with options for adding, editing, or deleting tasks.

* State Management: Utilizing state management libraries like Redux or Context API to manage task data.
CRUD Operations: Implementing Create, Read, Update, and Delete functionalities for tasks.
Task Sorting and Filtering: Allowing users to sort tasks based on priority, due date, or categories.
* Favorite Tasks Page:
The Favorite Tasks Page is a specialized section where users can mark specific tasks as favorites for quick access. Learning outcomes might include:

* Data Persistence: Implementing local storage or database mechanisms to store favorite task preferences.
User Interaction: Learning to handle user interactions for favoriting or unfavoriting tasks.
UI/UX Design: Designing an intuitive interface to differentiate and display favorite tasks effectively.
Calendar Page:
The Calendar Page provides users with a visual representation of their tasks on a calendar view. Users can view tasks based on their due dates, set reminders, and manage their schedules efficiently. Learning outcomes might include:

* Calendar Integration: Integrating a calendar library (like FullCalendar or React Big Calendar) to display tasks visually.
Date and Time Handling: Managing date and time formats, handling time zones, and setting up reminders.
Event Handling: Enabling users to interact with calendar events to view or edit task details.
Account Page:
The Account Page allows users to manage their profiles, update personal information, change passwords, or modify account settings. Learning outcomes might include:

* User Profile Management: Implementing features for updating profile details and account preferences.
Security Practices: Ensuring secure password handling and implementing password reset functionalities.
UX Considerations: Designing a user-friendly interface for account settings and profile management.


# Installation
Guide on how to install and set up the app. Include prerequisites and step-by-step instructions:

bash
Copy code
# Example Installation Steps
$ git clone https://github.com/username/project.git
$ cd project
$ npm install
$ react-native run-android  # for Android
$ react-native run-ios      # for iOS
Usage
Explain how to use the app or any necessary configurations. Provide examples or code snippets if applicable.


# Backend Infrastructure:
## Technology Stack:
* Node.js with Express: Used to create a RESTful API server to handle HTTP requests and responses.
* SQLite Database: Utilized for storing and managing data related to users, tasks, and other app functionalities.
### Features Implemented:
* User Authentication: Integrated endpoints for user sign-up, sign-in, and managing user sessions.
* Task Management Endpoints: Developed API endpoints for CRUD operations on tasks (create, read, update, delete).
* Database Integration: Established connections to SQLite database for data storage and retrieval.
Considerations for Future Integration:
* Scalability: The backend architecture allows for easy scalability by leveraging Node.js' non-blocking I/O and SQLite's lightweight nature. Future integration with more scalable databases (e.g., PostgreSQL, MongoDB) can accommodate increased data and user loads.
* Deployment and Server Management: While the backend isn't fully integrated for server management, it's designed to be deployable on cloud services (like AWS, Google Cloud, or Azure) or on dedicated servers for efficient management and accessibility.
* Frontend-Backend Separation:
The codebase for the frontend React Native application is maintained in a separate repository. The backend repository solely focuses on the server-side logic, API endpoints, and database management required to support the app. The frontend and backend repositories can be integrated for a complete working solution.

## Key Learning Outcomes:
- RESTful API Development: Understanding how to design and implement API endpoints for CRUD operations.
- Database Integration: Learning to interact with SQLite, including creating schemas, performing queries, and managing data.
- Routing and Middleware: Implementing middleware for authentication and request handling using Express routing.
### Future Development Potential:
- Server Integration: Completing integration for server management tools or cloud deployment services (e.g., Docker, Kubernetes) for better scalability and reliability.
- Enhanced Security Measures: Implementing additional security layers such as encryption, rate limiting, and data validation for enhanced protection against potential vulnerabilities.
- Performance Optimization: Further optimizing the backend for improved response times and handling larger volumes of concurrent requests.

