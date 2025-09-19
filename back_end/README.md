# Description

Api for consulting recalls in 2 different categories, Electronics and Vehicles, using Node.js , express and MongoDB.

In the folder documentation, you can find information about the population of collections through this API and external API's.


# Dependencies
    "axios": "^1.12.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^6.8.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^7.5.0"
    
# Structure Project
The folder structure designed by our software architects ensures adherence to best practices:

- `controllers`: Contains the logic for handling incoming requests and returning responses to the client.
- `models`: Defines the data models and interacts directly with the database.
- `routes`: Manages the routes of your API, directing requests to the appropriate controller.
- `middlewares`: Houses custom middleware functions, including authentication and rate limiting.
- `.env`: Stores environment variables, such as database connection strings and the JWT secret.
- `app.js`: The main entry point of your application, where you configure the Express app and connect all the pieces.
- `db.js`: Manages the database connection.
- `package.json`: Keeps track of npm packages and scripts necessary for your project.

This structure provides a solid foundation for building a well-organized, scalable backend service. By separating concerns into dedicated directories and files, your project remains clean, navigable, and easier to debug and extend.

# API external consumed

- NHTSA Datasets and APIs

NHTSA's New Car Assessment Program conducts crash tests to determine how well a vehicle protects its occupants during a crash, and rollover resistance tests to determine the risk of a vehicle rolling over in a single-vehicle crash. Also, NCAP conducts advanced driver assistance system tests to determine how well the system avoids a crash.   

https://www.nhtsa.gov/nhtsa-datasets-and-apis

- CPSC Recalls Retrieval  

The Recall Retrieval Web Services are part of the CPSC Recall Database project.  The services are implemented as REST 
web services and provide access to the Recall CThe Recall Retrieval Web Services are part of the CPSC Recall Database project.  The services are implemented as REST 

https://www.saferproducts.gov/
