export interface PropsVideo{
    videoId: string | null
    videoName: string | null
}

export const DisplayVideo: React.FC<PropsVideo> = ({ videoId, videoName }) => {
    return (
        <div className="embed-responsive embed-responsive-16by9 mt-4">
            <p className="mt-2">{videoName || ""}</p>
            <iframe 
                className="embed-responsive-item"
                src= {`https://www.youtube.com/embed/${videoId}`}
                allow='autoplay; encrypted-media'
                allowFullScreen= {true}
                title= {videoName || ""}
                /> 
        </div>
    )
}
