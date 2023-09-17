# Sentiment Analysis Application Guide

Welcome to the Sentiment Analysis Application! This comprehensive guide will walk you through the step-by-step installation and setup process for each component of the application. The application consists of three main parts: the Sentiment Analysis Model, Backend, and Frontend. Follow the instructions in each section to get started and make the most of the application's features.

---

## Analysis Model

### 1. Clone the Sentiment Analysis Model Repository

Clone the Sentiment Analysis Model GitHub repository with the "sentiment-analysis-model" branch to your local machine:

```bash
git clone -b sentiment-analysis-model https://github.com/Dun-Njuguna/SentimentAnalyzer.git
```

This command will clone the "sentiment-analysis-model" branch into your local directory.

### 2. Change Directory

Change your current working directory to the cloned repository:

```bash
cd SentimentAnalyzer
```

### 3. Create and Activate a Virtual Environment

Create a virtual environment and activate it using Python 3. Replace `<python3>` with the appropriate command for your operating system:

```bash
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment (Windows)
venv\Scripts\activate

# Activate the virtual environment (Linux/macOS)
source venv/bin/activate
```

### 4. Install Python Dependencies

Install the required Python packages within the virtual environment:

```bash
pip install -r requirements.txt
```

### 5. Run the Flask Application

Run the Flask web application using Python 3:

```bash
python3 app.py
```

The Flask application will start, and by default, it will run on `http://127.0.0.1:5000/`.

### 6. Use the Sentiment Analysis API

You can now use the API endpoint to classify text sentiment. Make a POST request to `http://127.0.0.1:5000/classify` with a JSON payload containing the text you want to classify. For example, you can use a tool like `curl` or Postman to send a POST request.

Example POST request payload:

```json
{
    "text": "I love this product. It's amazing!"
}
```

The server will respond with the sentiment classification result:

```json
{
    "result": "Positive"
}
```

Feel free to test the sentiment analysis functionality using different text inputs.

### 7. Shutdown the Application

When you're done, you can stop the Flask application by pressing `Ctrl+C` in the terminal where it's running. You can also deactivate the virtual environment if you wish:

```bash
deactivate
```

---

## Backend

### 1. Clone the Backend Repository

Clone the Git repository from the "backend" branch to your local machine. Replace `<repository-url>` with the actual GitHub repository URL you want to clone:

```bash
git clone -b backend <repository-url>
```

### 2. Navigate to the Project Directory

Change your current working directory to the cloned repository:

```bash
cd <repository-directory>
```

### 3. Set Environment Variables

Create a `.env` file in the project directory to set your environment variables. Use a text editor to create and edit this file, adding your specific configuration details:

```env
# MongoDB connection string
MONGO_URI=mongodb+srv://your-mongodb-uri

# Cloudinary Credentials
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Save the file with your environment variables.

### 4. Configure the Application

If your Node.js application uses environment variables, ensure it's configured to read these variables from `process.env`. For example, in your Node.js code where you connect to MongoDB, you might have something like this:

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rest of your MongoDB-related code
```

Similarly, for Cloudinary, ensure that your application uses `process.env` to access Cloudinary credentials.

### 5. Install Node.js (>=14.0.0)

Make sure you have Node.js version 14.0.0 or higher installed on your system. You can check your Node.js version by running:

```bash
node -v
```

If your Node.js version is lower than 14.0.0, you can download and install the latest version from the official Node.js website: [Node.js Download Page](https://nodejs.org/)

### 6. Install Node.js Dependencies

Install the required Node.js packages by running:

```bash
npm install
```

### 7. Run the Node.js Application

Start your Node.js application:

```bash
npm start
```

This command will execute your Node.js application. Ensure that it listens on the appropriate port (e.g., port 3000) or as specified in your application
