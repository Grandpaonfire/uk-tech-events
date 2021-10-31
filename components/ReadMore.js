import { useState } from "react";
import styles from './ReadMore.module.css'

const ReadMore = ({ children }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const text = children;

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className={styles.description}>
      {isReadMore ? text.slice(0, 400) + "..."  : text }
      <div onClick={toggleReadMore} className={styles.readOrHide}>
        {isReadMore ? "Read more" : " Show less"}
      </div>
    </div>
  )
}

export default ReadMore
