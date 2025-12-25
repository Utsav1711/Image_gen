🎨 AI Image Generation Platform

A full-stack AI-powered image creation platform that allows users to
generate, manage, and store images using the **ClipDrop API**, with
secure authentication and role-based access control.

------------------------------------------------------------------------

## 🚀 Features

### 🤖 AI Image Generation

-   Integrated with the **ClipDrop API** for high-quality AI image
    creation.

### 🔐 Token-Based Authentication

-   Secure login system using **JWT**.
-   Hierarchical access levels for **admins** and **users**.

### 🗂 Task Management

-   Backend modules built with **Express.js** and **Node.js** to manage
    image generation jobs.

### ☁️ Cloud Storage

-   Media storage and retrieval using **Cloudinary**.

### 🧱 Full-Stack Architecture

-   Modular and scalable backend design.

------------------------------------------------------------------------

## 🛠 Tech Stack

| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| Frontend       | HTML, CSS, JavaScript (or React if used) |
| Backend        | Node.js, Express.js                      |
| Authentication | JWT (JSON Web Tokens)                    |
| AI API         | ClipDrop API                             |
| Database       | MongoDB                                  |
| Media Storage  | Cloudinary                               |

------------------------------------------------------------------------

## 🔐 Authentication Flow

1.  Users register and log in.
2.  JWT token is generated.
3.  Middleware validates the token.
4.  Role-based access ensures secure route access.

------------------------------------------------------------------------

## 📸 Image Generation Flow

1.  User submits an image prompt.
2.  Request is sent to the ClipDrop API.
3.  Generated image is stored on Cloudinary.
4.  Image URL is saved in the database.

------------------------------------------------------------------------

## 👨‍💻 Author

Utsav Hihoriya 
