import * as React from 'react';
import * as styles from "./Post.module.scss";

interface IPostProps {
  title: string;
  content: string;
  publicationDate: Date;
}


const computeMonth = (date: Date): string => {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  return months[date.getMonth()];
}

const computeModel = (props: IPostProps) => {
  const { content, title, publicationDate } = props;

  // Short content.
  const shortContent = content.length > 232 ? content.slice(0, 232) : content;

  // Date
  const day = publicationDate.getDate();
  const month = computeMonth(publicationDate);
  const year = publicationDate.getFullYear();

  return { title, day, month, year, shortContent }
}

const Post: React.FunctionComponent<IPostProps> = (props) => {
  const model = computeModel(props);

  return (
    <div className={styles.Publication}>

      {/* Header */}
      <div className={styles.Header}>
        {/* Title */}
        <span className={styles.Title}>{model.title}</span>

        {/* Publication date */}
        <span className={styles.PublicationDate}>
          {`${model.day} de ${model.month} de ${model.year}`}
        </span>
      </div>

      {/* Short content */}
      <div className={styles.Content}>
        {model.shortContent}..
    </div>

      {/* Actions */}
      <div className={styles.Actions}>
        <a>Leer más</a>
      </div>

    </div>
  )
};

export default Post;