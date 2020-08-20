import Avatar from "components/Avatar"

export default function Devit({
  avatar,
  userId,
  id,
  userName,
  content,
  createdAt,
}) {
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
            <date>{createdAt}</date>
          </header>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
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
