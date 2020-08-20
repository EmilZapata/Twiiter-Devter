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

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const intl = new Intl.DateTimeFormat("es-ES")
        const normalizedCreatedAt = intl.format(
          new Date(createdAt.seconds * 1000)
        )

        return { id, ...data, createdAt: normalizedCreatedAt }
      })
    })
}
