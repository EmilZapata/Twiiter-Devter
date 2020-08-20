import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "firebase/client"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ createdAt, id, username, avatar, content, userId }) => (
              <Devit
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                key={id}
                content={content}
                userName={username}
                userId={userId}
              />
            )
          )}
        </section>
        <nav></nav>
      </AppLayout>
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
        }
      `}</style>
    </>
  )
}
