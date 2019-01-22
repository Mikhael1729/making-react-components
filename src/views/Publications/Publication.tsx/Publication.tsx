import * as React from 'react';
import * as styles from "styles/views/Publications.module.css";

interface PublicationProps {
  title: string;
  content: string;
  publicationDate: Date;
}

const Publication: React.SFC<PublicationProps> = (props) => {
  const { content, title, publicationDate } = props;
  const shortContent = content.length > 232 ? content.slice(0, 232) : content;
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

export default Publication;