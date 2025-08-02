import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { PlyrLayout, plyrLayoutIcons } from "@vidstack/react/player/layouts/plyr";

type VideoPlayerProps = {
    videoId: string;
    autoplay: boolean;
}

const VideoPlayer = ({ videoId, autoplay }: VideoPlayerProps) => {
    const userAlreadyInteracted = navigator.userActivation.hasBeenActive;

    return (
        <MediaPlayer title="Vídeo de Aula" autoPlay={autoplay && userAlreadyInteracted} src={`youtube/${videoId}`}>
            <MediaProvider />
            <PlyrLayout icons={plyrLayoutIcons} />
        </MediaPlayer>
    )
}

export default VideoPlayer;