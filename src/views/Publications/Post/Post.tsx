import * as React from 'react';
import * as styles from "views/Publications/Publications.module.css";

interface PostProps {
  title: string;
  content: string;
  publicationDate: Date;
}

const Post: React.SFC<PostProps> = (props) => {
  const { content, title, publicationDate } = props;

  // Short content.
  const shortContent = content.length > 232 ? content.slice(0, 232) : content;

  // Date
  const day = publicationDate.getDate();
  const month = computeMonth(publicationDate);
  const year = publicationDate.getFullYear();

  return <div className={styles.Publication}>

    {/* Title */}
    <div className={styles.Header}>
      <span className={styles.Title}>{title}</span>
      <span className={styles.PublicationDate}>{`${day} de ${month} de ${year}`}</span>
    </div>

    {/* Short content */}
    <div className={styles.Content}>
      {shortContent}..
    </div>

    {/* Actions */}
    <div className={styles.Actions}>
      <a>Leer más</a>
    </div>

  </div>
};

const computeMonth = (date: Date): string => {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  return months[date.getMonth()];
}

export default Post;