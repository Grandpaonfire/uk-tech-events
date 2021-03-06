import Head from 'next/head'
import { useState } from 'react'

//Components
import EventCard from '../components/EventCard'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';


export async function getServerSideProps() {
  const res = await fetch("http://opentechcalendar.co.uk/api1/events.json");
  const res_JSON = await res.json();

  return {
    props: {
      data: res_JSON.data
    }
  }
}

export default function Home({ data }) {
  const [ searchTerm, setSearchTerm ] = useState('');

  const pageTitle = "Upcoming UK Tech Events";

  return (
    <div>
      <Head>
        <title>Thomas Hitchcock</title>
        <meta name="description" content="Tech Events & Weather App for Whereverly by Thomas Hitchcock" />
      </Head>
      <Box sx={{backgroundColor: "primary.light" }} pt={3} >
        <Container maxWidth="lg" className="pageContainer">
          <Paper className="searchContainer" elevation={2}>
            <div className="pageTitle">
              {pageTitle}
            </div>
            <TextField
              className="searchBar"
              label="Search for event" 
              variant="standard"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }} 
            />
          </Paper>
          <div className="eventContainer">
            {data.filter((val) => {
              if (searchTerm == "") {
                return val
              } else if (val.summary.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
              }
            }).map((item, id) => {
                return (
                  <div key={id}>
                    <EventCard 
                      summary={item.summary} 
                      displayLocal={item.start.displaylocal}
                      description={item.description}
                      url={item.url}
                    />
                  </div>
                )
              })}
            </div> 
        </Container>
      </Box>
    </div> 
  )
}

