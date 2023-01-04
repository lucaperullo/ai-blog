# AI Blog

This project uses artificial intelligence to create posts for a blog. The backend of the project was developed using Node.js, Express.js, and MongoDB.

## Installation

To install and start the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/ai-blog.git`
2. Install the dependencies: `npm install`
3. Start the server: `npm start`

## Endpoints

The project includes the following routes for accessing the blog's functionality through the REST APIs:

// User routes

- `POST /api/users/register`: route to register a new user.
- `POST /api/users/login`: route to login an existing user.
- `POST /api/users/logout`: route to logout a user.
- `GET /api/users/refreshToken`: route to refresh the user's access token.
- `GET /api/users/me`: route to get the user's information.

// Post routes

- `GET /api/posts`: route to get all the posts.

- `GET /api/posts/:id`: route to get a specific post.
- `PUT /api/posts/:id`: route to update a specific post.
- `DELETE /api/posts/:id`: route to delete a specific post.

// Category routes

- `POST /api/posts/:categoryId`: route to create a new post.

- `GET /api/posts/categories`: route to get all the categories.
- `POST /api/posts/categories`: route to create a new category.

- `GET /api/posts/categories/:id`: route to get a specific category.
- `PUT /api/posts/categories/:id`: route to update a specific category.
- `DELETE /api/posts/categories/:id`: route to delete a specific category.

// creo una tabella per le rotte scritte sopra e le descrizioni
| index | Path | Method | Middlewares | Description |
| --- | --- | --- | --- | --- |
| 1 | /api/users/register | POST | { - } | Register a new user |
| 2 | /api/users/login | POST | { - } | Login an existing user |
| 3 | /api/users/logout | POST | { - } | Logout a user |
| 4 | /api/users/refreshToken | GET | { - } | Refresh the user's access token |
| 5 | /api/users/me | GET | { authorize } | Get the user's information |
| 6 | /api/posts | GET | { - } | Get all the posts |
| 7 | /api/posts/:id | GET | { - } | Get a specific post |
| 8 | /api/posts/:id | PUT | { - } | Update a specific post |
| 9 | /api/posts/:id | DELETE | { - } | Delete a specific post |
| 10 | /api/posts/:categoryId | POST | { authorize, adminOnly, anonymous } | Create a new post |
| 11 | /api/posts/categories | GET | { - } | Get all the categories |
| 12 | /api/posts/categories | POST | { - } | Create a new category |
| 13 | /api/posts/categories/:id | GET | { - } | Get a specific category |
| 14 | /api/posts/categories/:id | PUT | { - } | Update a specific category |
| 15 | /api/posts/categories/:id | DELETE | { - } | Delete a specific category |

## Authors

- Luca Perullo - [@lucaperullo](https://www.linkedin.com/in/luca-perullo/)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.
s
