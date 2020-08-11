import Head from "next/head"
import AppLayout from "components/AppLayout"
import { colors } from "styles/theme"
import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
// devit
import { loginGitHub, onAuthStateChanged } from "firebase/client"
import { useState, useEffect } from "react"
import Avatar from "components/Avatar"
import Logo from "components/Icons/Logo"

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginGitHub().then(setUser).catch(console.log)
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo width={100} />
          <h1>Devter</h1>
          <h2>
            Talk about development <br /> with developers 👩‍💻👩‍💻
          </h2>
          <div>
            {user === null ? (
              <Button onClick={handleClick}>
                <GitHub width={32} height={32} fill={"white"} />
                Login with GitHub
              </Button>
            ) : (
              <div>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  text={user.username ? user.username : "Sin Username"}
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }

        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
