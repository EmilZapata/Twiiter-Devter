import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBfsboFqrmBxGwopI9XIMPWHhm8shJMLoA",
  authDomain: "twitter-devter.firebaseapp.com",
  databaseURL: "https://twitter-devter.firebaseio.com",
  projectId: "twitter-devter",
  storageBucket: "twitter-devter.appspot.com",
  messagingSenderId: "71812556707",
  appId: "1:71812556707:web:bb92d0bd3c872ae6585c16",
  measurementId: "G-NWELMNXB62",
}

firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = ({ img, avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    img,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return { id, ...data, createdAt: +createdAt.toDate() }
}

export const listenLatestDevits = (callback) => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
      callback(newDevits)
    })
}

// export const fetchLatestDevits = () => {
//   return db
//     .collection("devits")
//     .orderBy("createdAt", "desc")
//     .get()
//     .then(({ docs }) => {
//       return docs.map(mapDevitFromFirebaseToDevitObject)
//     })
// }

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
