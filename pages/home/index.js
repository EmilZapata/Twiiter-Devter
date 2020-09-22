import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "firebase/client"
import Link from "next/link"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { colors } from "styles/theme"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  console.log({ timeline })
  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ createdAt, id, img, userName, avatar, content, userId }) => (
            <Devit
              avatar={avatar}
              createdAt={createdAt}
              id={id}
              key={id}
              img={img}
              content={content}
              userName={userName}
              userId={userId}
            />
          )
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
      <style jsx>{`
        header {
          position: sticky;
          height: 49px;
          border-bottom: 1px solid #eee;
          top: 0;
          width: 100%;
          display: flex;
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
        }

        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          width: 100%;
          bottom: 0;
          position: sticky;
          border-top: 1px solid #eee;
          height: 49px;
          background: #fff;
          display: flex;
        }

        nav a {
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
