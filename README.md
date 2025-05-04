# Expense Tracker

## Overview
The Expense Tracker is a simple yet powerful application designed to help users manage their finances effectively. It allows users to track their income, expenses, and savings, providing insights into their spending habits and financial health.

## Features
- Add, edit, and delete income and expense entries.
- Categorize transactions for better organization.
- View detailed reports and charts for financial analysis.
- Set budgets and track progress.
- Responsive design for use on both desktop and mobile devices.

## Technologies Used
### Frontend
- **HTML5**: For structuring the web pages.
- **CSS3**: For styling and layout.
- **JavaScript**: For interactivity and dynamic content.
- **React.js**: For building the user interface.

### Backend
- **Node.js**: For server-side logic and API development.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: As the database for storing user data and transactions.

### Tools and Libraries
- **Mongoose**: For MongoDB object modeling.
- **Axios**: For handling HTTP requests.
- **Chart.js**: For creating interactive financial charts.
- **dotenv**: For managing environment variables.
- **bcrypt.js**: For password hashing and security.
- **JSON Web Tokens (JWT)**: For user authentication.

### Development Tools
- **Git**: For version control.
- **GitHub**: For repository hosting and collaboration.
- **Visual Studio Code**: As the primary code editor.
- **Postman**: For API testing.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Pappyjay157/expense-tracker
    ```
2. Navigate to the project directory:
    ```bash
    cd expense-tracker
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
      ```
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      PORT=5000
      ```
5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
1. Open the application in your browser at `http://localhost:5000`.
2. Register or log in to your account.
3. Start adding your income and expense entries.
4. View reports and manage your finances effectively.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
