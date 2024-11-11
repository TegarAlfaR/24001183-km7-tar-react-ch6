
# 🌐 Frontend Backend integration

A fullstack application showcasing user authentication, built with a **React** frontend and a **Node.js** backend. This guide will walk you through setting up both components to create a functional authentication system.

## 📋 Overview

This project is split into two parts, each in its own repository:

- **Backend**: A Node.js and Express server with authentication endpoints.
- **Frontend**: A React app that includes user authentication pages.

Both parts need to be cloned and set up separately, then connected to run as a unified system.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js**
- **NPM**

### Repository Links

- **Backend Repository**: [GitHub Link](https://github.com/TegarAlfaR/ch5-29-Oktober-2024-Auth)
- **Frontend Repository**: [GitHub Link](https://github.com/TegarAlfaR/24001183-km7-tar-react-ch6)

---

## 🛠️ Clone Repositories

To start, clone both the backend and frontend repositories:

```bash
# Clone backend repository
git clone https://github.com/TegarAlfaR/ch5-29-Oktober-2024-Auth.git

# Clone frontend repository
git clone https://github.com/TegarAlfaR/24001183-km7-tar-react-ch6.git
```

---

## 📂 Backend Setup

1. **Navigate to the backend directory**:

    ```bash
    cd ch5-29-Oktober-2024-Auth
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create an environment file**:

   - Duplicate the `.env.example` file and rename it to `.env`.
   - Fill in the required environment variables as indicated in `.env.example`.

4. **Start the backend server**:

    ```bash
    npm run dev
    ```

   The backend server should now be running on `localhost` at the port specified in your `.env` file.

---

## 🎨 Frontend Setup

1. **Navigate to the frontend directory**:

    ```bash
    cd 24001183-km7-tar-react-ch6
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create an environment file**:

   - Duplicate the `.env.example` file and rename it to `.env`.
   - Configure the environment variables based on `.env.example`, ensuring that the **API URL** matches the backend setup.

4. **Start the frontend application**:

    ```bash
    npm run dev
    ```

   The frontend should now be accessible in your browser at [http://localhost:5173](http://localhost:5173).

---

## 🧰 Tools Used

- **Postman**: For testing API endpoints
- **React**: Frontend framework

---

## 📐 Usage

With both servers running, you can:

- Access the app at [http://localhost:5173](http://localhost:5173).
- Test the API endpoints using **Postman** or another API client.

For further documentation on APIs or additional setup instructions, refer to the README files in each repository.
