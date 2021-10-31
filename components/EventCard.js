import Link from 'next/link'
import Paper from '@mui/material/Paper';
import ReadMore from '../components/ReadMore'
import Button from '@mui/material/Button';
import styles from './EventCard.module.css';


export default function EventCard({ summary, displayLocal, description, url, location }) {
  return (
      <Paper 
        elevation={3}
        className={styles.paper}
      >
        <div className={styles.eventTitle}>
          <div className={styles.title}>
            {summary}
          </div>
          <Button variant="contained" className={styles.button}>
            <Link href={url} passHref={true}>
              <a>
                Visit
              </a>
            </Link>
          </Button>
          <div className={styles.eventDate}>
            {displayLocal}
            {location}
          </div>
        </div>
        <ReadMore>{description}</ReadMore>
      </Paper>
  )
}
