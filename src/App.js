import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';


import VideoList from './components/VideoList'
import VideoDetails from './components/VideoDetails' 
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles' 
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { useLoading, Bars } from '@agney/react-loading';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));


function App() {
 
  const classes = useStyles();

  const [videos, setVideos] = React.useState([]);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [channelId, setChannelId] = React.useState('UCg8ss4xW9jASrqWGP30jXiw');
  

 
  const channels = ([
    {
      'title' : 'Владилен Минин',
      'channelId' : 'UCg8ss4xW9jASrqWGP30jXiw'
    },
    {
      'title' : 'Developer',
      'channelId' : 'UC2WHjPDvbE6O328n17ZGcfg'
    }
  ]);
  
  React.useEffect(() => {
    setVideos([]); 
    fetchVideos(); 
  }, [channelId]);
 

  const fetchVideos = async  () => { 
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    
    await fetch(
      proxyurl+`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    )
    .then(response => {
      return response.text();
    })
    .then(res => {
       
      var XMLParser = require("react-xml-parser");
      var xml = new XMLParser().parseFromString(res); 
      let items = xml.getElementsByTagName("entry"); 
       
      setDatas( items );  
    });

  }

  function setDatas( items ){
    
    const videosarray = [];
    items.map( (item) => { 
      const newVideo = {
        'id'    : item.children[1].value,
        'title' : item.children[3].value,
        'thumb' : item.children[8].children[2].attributes.url,
        'url'   : item.children[4].attributes.href
      }
      
      videosarray.push( newVideo );      
    }) 

    setVideos( videosarray );
    setSelectedVideo( videosarray[0] ); 
  }


  function onVideoSelect(video){ 
    setSelectedVideo( video );  
  }

  function onChannelSelect( channelIdval ){ 
    setChannelId( channelIdval ); 
  }
  
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Bars width="50" />,
  });

  return (
    <div >   
          <AppBar position="relative">
              <Toolbar >
                <VideoLibraryIcon />
                <Typography variant="h5" className={classes.title}> My Feeds </Typography> 
                { channels.map((channel) =>(
                  <Button className={classes.menuButton} variant="outlined" key={channel.title}  onClick={() => onChannelSelect(channel.channelId)} color="inherit">{channel.title}</Button>
                ))}                
              </Toolbar> 
          </AppBar>
          <main> 
          { selectedVideo ? 
          <Container >
            <Grid container spacing={3}>  
                <VideoDetails video={selectedVideo} />  
                <VideoList 
                  videos = {videos}
                  onVideoSelect = {onVideoSelect}
                  />  
            </Grid>   
          </Container>
          : 
          <div className="loading"> {indicatorEl} </div>
          }
        </main>
    </div>
  )  
}

export default App;
