# Social Network API

## Description

This project is a Social Network API designed to handle CRUD operations for thoughts, reactions, and user data. The application supports:
- Creating, reading, updating, and deleting thoughts and reactions.
- Adding and removing friends.
- Managing user data.

The API is built with Node.js, Express.js, and MongoDB, utilizing Mongoose for data modeling.

## Features

- Full CRUD functionality for users, thoughts, and reactions.
- Relationship management between users (friends).
- Thought-reaction support with embedded schemas.
- Proper error handling for all routes (e.g., 404 Not Found, 400 Bad Requests).

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd social-network-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your MongoDB connection in the `config/connection.js` file:
   ```javascript
   mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   });
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage

Use a tool like Insomnia or Postman to test the API endpoints. Below are examples of common routes:

### Users
- **Create a User**
  ```
  POST /api/users
  {
      "username": "testUser",
      "email": "test@example.com"
  }
  ```

- **Get All Users**
  ```
  GET /api/users
  ```

- **Update a User**
  ```
  PUT /api/users/:userId
  {
      "username": "updatedUser",
      "email": "updated@example.com"
  }
  ```

- **Delete a User**
  ```
  DELETE /api/users/:userId
  ```

### Thoughts
- **Create a Thought**
  ```
  POST /api/thoughts
  {
      "thoughtText": "This is a thought.",
      "username": "testUser",
      "userId": "<userId>"
  }
  ```

- **Get All Thoughts**
  ```
  GET /api/thoughts
  ```

- **Add a Reaction**
  ```
  POST /api/thoughts/:thoughtId/reactions
  {
      "reactionBody": "This is my reaction!",
      "username": "testUser"
  }
  ```

- **Remove a Reaction**
  ```
  DELETE /api/thoughts/:thoughtId/reactions
  {
      "reactionId": "<reactionId>"
  }
  ```

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling tool.
- **Insomnia/Postman**: API testing tools.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to contribute to this project by submitting issues or pull requests!
