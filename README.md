# Here Comes The Bride

A beautiful, responsive wedding dress shop website built with React, TypeScript, and modern web technologies.

## 🌟 Features

- **Product Management**: Admin panel for managing wedding dresses, accessories, and inventory
- **Image Upload**: Imgur integration for free, reliable image hosting
- **Real-time Sync**: Firestore integration for global product synchronization
- **Responsive Design**: Beautiful UI that works on all devices
- **Authentication**: Secure admin access
- **Cost-Effective**: No backend required, completely free to operate

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Here-Comes-The-Bride
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
# Imgur Configuration
REACT_APP_IMGUR_CLIENT_ID=your_imgur_client_id_here

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Start the development server:
```bash
npm start
```

## 🔧 Configuration

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Enable Authentication with Email/Password
5. Copy your Firebase config to `.env` file

### Firestore Security Rules
For testing, you can use open rules (NOT for production):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

For production, implement proper security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products can be read by anyone, but only authenticated users can write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Imgur Integration
This project uses Imgur for free image hosting. The Imgur Client ID is safe to expose in frontend applications as it's designed for public use.

**To get your own Imgur Client ID:**
1. Go to [https://api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient)
2. Register your application
3. Copy the Client ID to your `.env` file

## 🛠️ Troubleshooting

### Firestore 400 Bad Request Errors
If you encounter 400 errors from Firestore:

1. **Check Firebase Configuration**:
   - Verify all environment variables are set correctly
   - Check browser console for Firebase config logs
   - Ensure `projectId` matches your Firebase project

2. **Verify Firestore is Enabled**:
   - Go to Firebase Console → Firestore Database
   - Make sure Firestore is enabled (not Realtime Database)
   - Check that you're using the correct project

3. **Security Rules**:
   - Temporarily set rules to allow all reads/writes for testing
   - Check Firebase Console → Firestore → Rules tab

4. **Network Issues**:
   - Check if `firestore.googleapis.com` is accessible
   - Disable browser extensions that might block requests
   - Try incognito/private browsing mode

### Environment Variables Not Loading
- Ensure `.env` file is in the root directory
- Restart development server after changing `.env`
- For production builds, environment variables must be set during build time

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components (Admin, etc.)
├── services/           # Business logic (Firebase, Imgur)
├── config/             # Configuration files
├── data/               # Static data and types
└── utils/              # Utility functions
```

## 🖼️ Image Upload Flow

1. Admin selects image in the admin panel
2. Image is validated (type, size, format)
3. Image uploads directly to Imgur via API
4. Imgur returns permanent URL
5. Product is saved with Imgur URL in Firestore
6. Images are displayed from Imgur CDN globally

## 🛠️ Technologies Used

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Image Hosting**: Imgur API
- **Deployment**: GitHub Pages
- **Animations**: Framer Motion

## 📦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm test` - Run tests

## 🌐 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## 💰 Cost Structure

This project is designed to be completely free to operate:
- ✅ **Hosting**: GitHub Pages (free)
- ✅ **Database**: Firebase Firestore (free tier)
- ✅ **Images**: Imgur (free)
- ✅ **Authentication**: Firebase Auth (free tier)
- ✅ **No backend required**

## 🔒 Security

- Imgur Client ID is safe for frontend exposure
- Firebase security rules protect admin operations
- No sensitive keys in frontend code
- Environment variables are used for configuration

## 🔍 Debug Mode

The application includes extensive logging for troubleshooting:
- Firebase configuration validation
- Firestore operation logs
- Error handling with detailed messages
- Environment variable verification

Check browser console for detailed logs during development and production.

## 📄 License

This project is licensed under the MIT License.
