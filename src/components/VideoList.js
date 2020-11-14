import VideoItem from './VideoItem.js'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function VideoList( {videos, onVideoSelect} ) { 
    
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
 
    return (
        <Grid item lg={3} xs={12} >  
            <Grid container spacing={3}  className={matches ? '' : 'videoList' } >   
                    { videos.map( (video, key)=>(
                        <Grid item lg={12} sm={4} xs={6} spacing={3}> 
                            <VideoItem key={key}
                            video={video} 
                            onVideoSelect={onVideoSelect} 
                            /> 
                            </Grid>
                    ))}            
                
            </ Grid>  
        </Grid>
    ) 
}

export default VideoList;
