# Shopping Portal RESTful API

This is a simple shopping portal project with RESTful API built using Node.js, Express, and MongoDB for data storage. The API allows basic CRUD operations on tasks, where each task has a title, description, status, and timestamps for creation and last update.

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atulr2200/Ecom-CRUD-Task.git
**Install dependencies:**

    cd shopping-portal-api
    npm install
**Start MongoDB:**

Ensure that MongoDB is installed and running locally on the default port.

**Start the server:**

    npm start
The server should now be running on http://localhost:3000.

# API Endpoints
POST /api/tasks: Create a new task.

    Request Body:
        title (string, required): Title of the task.
        description (string, required): Description of the task.
        status (string, optional): Status of the task (default: "pending").
    Response:
        Returns the created task object.
GET /api/tasks: Get all tasks.

    Response:
    Returns an array of task objects.

GET /api/tasks/:id : Get a specific task by ID.

    Parameters:
        id (string): ID of the task.
    Response:
        Returns the task object with the specified ID.
PUT /api/tasks/:id : Update a task by ID.

    Parameters:
        id (string): ID of the task.
    Request Body:
        title (string, optional): New title of the task.
        description (string, optional): New description of the task.
        status (string, optional): New status of the task.
    Response:
        Returns the updated task object.
DELETE /api/tasks/:id : Delete a task by ID.

    Parameters:
        id (string): ID of the task.
    Response:
        Returns a message indicating the task has been deleted.
For more detailed information about each endpoint and its usage, you can access the API documentation by visiting http://localhost:3000/api when the server is running.
