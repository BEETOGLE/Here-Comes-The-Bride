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
REACT_APP_IMGUR_CLIENT_ID=your_imgur_client_id_here
```

4. Start the development server:
```bash
npm start
```

## 🔧 Configuration

### Imgur Integration
This project uses Imgur for free image hosting. The Imgur Client ID is safe to expose in frontend applications as it's designed for public use.

**To get your own Imgur Client ID:**
1. Go to [https://api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient)
2. Register your application
3. Copy the Client ID to your `.env` file

**Note:** The current fallback Client ID is for development/testing only. Use your own for production.

### Firebase Configuration
Update `src/config/firebase.ts` with your Firebase project configuration.

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

## 📄 License

This project is licensed under the MIT License.
