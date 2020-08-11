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

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
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
