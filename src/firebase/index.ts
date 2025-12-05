import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAfVbokhKHIs2u1aHbmeSfhZnQXmMRDjaE',
  authDomain: 'update-old-project.firebaseapp.com',
  databaseURL: 'https://update-old-project-default-rtdb.firebaseio.com',
  projectId: 'update-old-project',
  storageBucket: 'update-old-project.firebasestorage.app',
  messagingSenderId: '555940951345',
  appId: '1:555940951345:web:6764c55f6e2eedd0d86c10',
  measurementId: 'G-N945M7S420'
}

// initialize firebase
const app = initializeApp(firebaseConfig)

// initialize realtime db and export
export const db = getDatabase(app)
