# AI Blog

This project uses artificial intelligence to create posts for a blog. The backend of the project was developed using Node.js, Express.js, and MongoDB.

## Installation

To install and start the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/ai-blog.git`
2. Install the dependencies: `npm install`
3. Start the server: `npm start`

## Endpoints

The project includes the following routes for accessing the blog's functionality through the REST APIs:

| index | Path                      | Method | Middlewares                         | Description                     |
| ----- | ------------------------- | ------ | ----------------------------------- | ------------------------------- |
| 1     | /api/users/register       | POST   | { - }                               | Register a new user             |
| 2     | /api/users/login          | POST   | { - }                               | Login an existing user          |
| 3     | /api/users/logout         | POST   | { - }                               | Logout a user                   |
| 4     | /api/users/refreshToken   | GET    | { - }                               | Refresh the user's access token |
| 5     | /api/users/me             | GET    | { authorize }                       | Get the user's information      |
| 6     | /api/posts                | GET    | { - }                               | Get all the posts               |
| 7     | /api/posts/:id            | GET    | { - }                               | Get a specific post             |
| 8     | /api/posts/:id            | PUT    | { - }                               | Update a specific post          |
| 9     | /api/posts/:id            | DELETE | { - }                               | Delete a specific post          |
| 10    | /api/posts/:categoryId    | POST   | { authorize, adminOnly, anonymous } | Create a new post               |
| 11    | /api/posts/categories     | GET    | { - }                               | Get all the categories          |
| 12    | /api/posts/categories     | POST   | { - }                               | Create a new category           |
| 13    | /api/posts/categories/:id | GET    | { - }                               | Get a specific category         |
| 14    | /api/posts/categories/:id | PUT    | { - }                               | Update a specific category      |
| 15    | /api/posts/categories/:id | DELETE | { - }                               | Delete a specific category      |

## Authors

- Luca Perullo - [@lucaperullo](https://www.linkedin.com/in/luca-perullo/)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.
s
