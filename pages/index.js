import Head from "next/head"
import AppLayout from "components/AppLayout"
import { colors } from "styles/theme"
import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
// devit
import { loginGitHub } from "firebase/client"
import { useEffect } from "react"
import Logo from "components/Icons/Logo"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("./home")
  }, [user])

  const handleClick = () => {
    loginGitHub().catch(console.log)
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
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub width={32} height={32} fill={"white"} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
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
