import React from 'react';
import Grid from '@material-ui/core/Grid' 
import Typography from '@material-ui/core/Typography' 
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'; 
import CardContent from '@material-ui/core/CardContent'; 

import './VideoDetail.css'
 

function VideoDetails({video}) { 

    if (!video) return <div>Loading....! </div>;
    const videoEmbedURL = `https://www.youtube.com/embed/${video.id}`;
    return (
        <Grid item lg={9}  xs={12}>   
            <Card>
                <div className='CardDetail'>
                    <iframe width="1280" height="716" src={videoEmbedURL}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <CardActionArea> 
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {video.title}
                    </Typography> 
                    </CardContent>
                </CardActionArea> 
            </Card>

        </Grid>
    );
}

export default VideoDetails;
