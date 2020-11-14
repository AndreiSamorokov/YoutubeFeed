import Typography from '@material-ui/core/Typography'
import './VideoItem.css'
import Paper from '@material-ui/core/Paper'

function VideoItem( {video, onVideoSelect} ) {
    
    return (
        <Paper variant="outlined" onClick={() => onVideoSelect(video)} title={video.title} >
            <img className="ui video-thumb" 
                src={video.thumb} 
                alt={video.title} />

            <Typography className="videoListItemTitle" >
                {video.title} 
            </Typography>
                
        </Paper>
    );
}

export default VideoItem;
