import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

firebase.apps.length === 0 && firebase.initializeApp(FIREBASE_CONFIG)

const storage = firebase.storage()
const auth = firebase.auth()

/**
 * Utility to store photos in firebase
 * @param photos photos
 * @param path path
 */
const uploadPhotos = async (photos, path) => {
  if (!photos) return
  if (!path) return

  // TODO refactor
  const promises = []
  photos.forEach(photo => {
    promises.push(fetch(photo.src))
  })
  const blobsPromises = []
  const downloadURLPromises = []
  const res = await Promise.all(promises)
  res.forEach(blobPromise => {
    blobsPromises.push(blobPromise.blob())
  })
  const blobs = await Promise.all(blobsPromises)
  const prs = []
  blobs.forEach(blob => {
    // Generate unique key
    const key = (Math.random() * 1000).toFixed(0).toString()
    prs.push(storage.ref().child(`${path}/${key}`).put(blob))
  })
  const res1 = await Promise.all(prs)
  res1.forEach(val => {
    const { ref } = val
    downloadURLPromises.push(ref.getDownloadURL())
  })
  const downloadURLs = await Promise.all(downloadURLPromises)
  return downloadURLs
}

/**
 * Utility to store photo in firebase
 * @param photo photo
 * @param path path
 */
const uploadPhoto = async (photo, path) => {
  if (!photo) return
  if (!path) return

  const [downloadUrl] = await uploadPhotos([photo], path)
  return downloadUrl
}

export {
  uploadPhotos,
  uploadPhoto,
  storage,
  auth
}
