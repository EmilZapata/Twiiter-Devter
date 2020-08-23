import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

export default function Devit({
  avatar,
  userId,
  id,
  img,
  userName,
  content,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <date>{timeago}</date>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
          }

          img {
            border-radius: 10px;
            height: auto;
            margin-top: 10px;
            width: 100%;
          }

          div {
            padding-right: 10px;
          }
          p {
            margin: 0;
            line-height: 1.3125;
          }
          date {
            color: #555;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}
