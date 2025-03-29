# Configuration Panel

A web-based admin panel for managing configuration parameters, built with Vue 3, TypeScript, and Firebase authentication.

- Panel deployed on Vercel. Access using the URL: https://codeway-case-study-blush.vercel.app/
- Email Address: test@test.com
- Password: test123

## Features

- **Secure Authentication**: Firebase-based authentication system
- **Configuration Management**:
  - View all configuration parameters
  - Add new configuration parameters
  - Edit existing parameters
  - Delete parameters
- **Responsive Design**: Works on both desktop and mobile devices

## Technologies Used

- **Vue 3**: Frontend framework with Composition API
- **TypeScript**: For type-safe code
- **Vite**: Fast build tool and development server
- **Firebase**: Authentication
- **TailwindCSS**: Utility-first CSS framework
- **Vue Router**: For navigation and route protection
- **Axios**: For API requests

## Project Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd panel
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables by creating a `.env` file (see example in `.env.example`)

4. Start the development server:
```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

- `src/` - Application source code
  - `components/` - Reusable Vue components
  - `firebase/` - Firebase configuration
  - `router/` - Vue Router configuration
  - `views/` - Page components
    - `SignIn.vue` - Authentication page
    - `Home.vue` - Configuration management dashboard
  - `App.vue` - Root component
  - `main.ts` - Application entry point

## Environment Variables

The application requires the following environment variables:

```env
# API Configuration
VITE_API_BASE_URL=your_api_base_url
VITE_API_KEY=your_api_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

You can copy the `.env.example` file and fill in your values:

```bash
cp .env.example .env
```
