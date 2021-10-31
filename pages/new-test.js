import Head from 'next/head';
import { useState } from 'react';
import moment from 'moment'

//Components
import EventCard from '../components/EventCard';
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

export default function NewTest({ data }) {
  const [ searchTerm, setSearchTerm ] = useState('');

  const filteredData = data.filter(event => {
    const now = new Date()
    const startDate =  moment(event.start.rfc2882local);
    if(now.getTime() < event.start.timestamp && differenceInDays(now, startDate) <=5){
      return event
    }
});

console.log(filteredData);

  return (
    <div>
      <Head>
        <title>Thomas Hitchcock</title>
        <meta name="description" content="Tech Events & Weather App for Whereverly by Thomas Hitchcock" />
      </Head>
      <Box sx={{ backgroundColor: "primary.light" }} pt={3} >
        <Container maxWidth="lg" className="pageContainer">
          <Paper className="searchContainer" elevation={2}>
            <div className="pageTitle">Upcoming Tech Events</div>
            <TextField
              className="searchBar"
              label="Search by location" 
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

