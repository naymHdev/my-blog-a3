# My Blog A3 - Backend

This is the backend repository for **My-Blog-A3**, a blogging platform built with modern web technologies. The project includes a robust API for managing blog posts, user authentication, and admin features.

## 🌐 Live Demo

[My Blog A3 Live Site](https://my-blog-a3.vercel.app/)

## 📂 Repository

[GitHub Repository](https://github.com/naymHdev/my-blog-a3)

---

## 📖 Features

### User Features

- **Authentication:** User login and signup.
- **Blog Management:** Create, read, update, and delete blog posts.
- **Sorting:** Efficient API sorting for listing blogs.
- **Search & Filters:** Search blogs by title, content, or author, with advanced filtering capabilities.

### Admin Features

- **User Blocking:** Admins can block/unblock users.
- **Role-Based Access Control:** Secure endpoints for admin-specific actions.

### API Features

- **Query Builder:** Supports advanced searching, filtering, sorting.
- **Mongoose Models:** Modular schema design for scalability.
- **Error Handling:** Consistent and structured error responses.
- **Error Validations:** Consistent and structured error validation use Zod package.

---

## 🛠️ Tech Stack

### Backend

- **Node.js**: Server runtime.
- **Express.js**: Web framework for routing and middleware.
- **Mongoose**: MongoDB object modeling for data handling.

### Database

- **MongoDB**: NoSQL database for scalable data storage.

### Deployment

- **Vercel**: Hosting platform for live deployment.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18+)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/naymHdev/my-blog-a3.git
   cd my-blog-a3
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   PORT=set-up your.env-file
   DATABASE_URL=set-up your.env-file
   BCRYPT_SALT_ROUNDS=set-up your.env-file
   JWT_ACCESS_TOKEN=set-up your.env-file
   JWT_REFRESH_TOKEN=set-up your.env-file
   JWT_ACCESS_EXPIRE_IN=set-up your.env-file
   JWT_REFRESH_EXPIRE_IN=set-up your.env-file
   ```

4. Start the development server:

   ```bash
   yarn run start:dev
   ```

### API Documentation

- Base URL: `http://localhost:3000/api`

#### Endpoints

| Method   | Endpoint                     | Description               |
| -------- | ---------------------------- | ------------------------- |
| `GET`    | `/blogs`                     | Fetch all blogs           |
| `POST`   | `/blogs`                     | Create a new blog         |
| `PATCH`  | `/blogs/:id`                 | Update a blog by ID       |
| `DELETE` | `/blogs/:id`                 | Delete a blog by ID       |
| `PATCH`  | `/admin/users/:userId/block` | Block a user (Admin only) |

---

## 🛡️ Security

- **JWT Authentication**: Secure token-based authentication.
- **Admin Middleware**: Protects admin-specific routes.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🧑‍💻 Author

**Naym Hdev**

- GitHub: [naymHdev](https://github.com/naymHdev)
- Live Project: [My Blog A3](https://my-blog-a3.vercel.app/)

---

## 📧 Contact

For any inquiries, reach out at [Email](naymhossen09@gmail.com).
