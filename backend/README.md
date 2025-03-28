# Case Study Backend

A Node.js backend service with Express and Firebase integration for managing application configurations.

## Overview

This backend service provides API endpoints to:
- Fetch application configurations with API key authentication
- Modify configuration settings (requires Firebase authentication)
- Remove configuration keys (requires Firebase authentication)

## Tech Stack

- Node.js with Express
- TypeScript
- Firebase Admin SDK (Firestore)
- Authentication middleware

## Setup & Installation

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Copy the .env.example file to create your own .env file:
   ```bash
   cp .env.example .env
   ```
   Then modify the values in the .env file according to your environment:
   ```
   PORT=your_port_here
   API_TOKEN=your_api_token_here
   CONFIG_COLLECTION=configurations
   CONFIG_DOCUMENT=appConfig

   # Firebase Admin SDK
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email@example.com
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_CERT_URL=your_client_cert_url
   FIREBASE_UNIVERSE_DOMAIN=googleapis.com
   ```

4. **Firebase Service Account**
   - The Firebase service account credentials are configured via environment variables
   - No need for a separate JSON file

5. **Run the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Get Configuration
- **URL**: `/api/config`
- **Method**: GET
- **Auth**: Requires API Key (x-api-key header)
- **Description**: Retrieves the entire application configuration

### Update Configuration
- **URL**: `/api/config`
- **Method**: PATCH
- **Auth**: Requires Firebase Auth Token
- **Body**: JSON object with key-value pairs to update
- **Description**: Updates specified configuration values

### Delete Configuration Key
- **URL**: `/api/config/:key`
- **Method**: DELETE
- **Auth**: Requires Firebase Auth Token
- **URL Params**: `key` - The configuration key to delete
- **Description**: Removes a specific key from the configuration

## Authentication

The API uses two authentication methods:

1. **API Key Authentication**
   - Used for read operations
   - Provided via `x-api-key` header
   - Implemented in `apiAuthMiddleware.ts`

2. **Firebase Authentication**
   - Used for write/delete operations
   - Provided via `Authorization: Bearer {token}` header
   - Implemented in `authMiddleware.ts`

## Project Structure

```
backend/
├── src/
│   ├── controllers/         # Request handlers
│   ├── middlewares/         # Authentication middleware
│   ├── routes/              # API routes
│   ├── services/            # Business logic & Firebase integration
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions 
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Scripts

- **Development**: `npm run dev` - Starts development server with hot reloading
- **Build**: `npm run build` - Compiles TypeScript to JavaScript
- **Start**: `npm start` - Runs the compiled JavaScript

## Firebase Configuration

The application uses Firebase Firestore to store configuration data. Make sure:

1. Your service account key file is properly configured
2. The Firestore database has a collection named as per your `CONFIG_COLLECTION` env variable
3. The document ID is set to match your `CONFIG_DOC` env variable

## Data Structure

The configuration is stored as a single document with key-value pairs following the `AppConfig` interface structure.
