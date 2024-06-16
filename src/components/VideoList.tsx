import { PropsYoutubeUser, PropsYoutubeVideo } from "./YoutubeContainer"

type PropsVideoList = {
    list: PropsYoutubeVideo[]
    setList: React.Dispatch<React.SetStateAction<PropsYoutubeUser  | undefined>>
    handleVideoAction: (videoId: string) => void
    handleDisplayScreen?: (videoId?: string, videoName?: string) => void
    setSearchList?: React.Dispatch<React.SetStateAction<PropsYoutubeVideo[]>>
}

export const VideoList :React.FC<PropsVideoList> = ({list, handleVideoAction, handleDisplayScreen}) => {
    return (
        <>
            {list.length > 0 ? list.map((video) => {
            return (
                <tr key={video.id}>
                    <td>
                        {!!handleDisplayScreen ?
                            <button className="btn"onClick={() => handleDisplayScreen(video.id, video.title)}>{video.title}</button>
                            
                        : <p>{video.title}</p>}
                    </td>
                    <td>
                        {!!handleDisplayScreen ?
                            <button className="btn btn-danger" onClick={() => handleVideoAction(video.id)}>x</button>
                            :
                            <button className="btn btn-success" onClick={() => handleVideoAction(video.id)}>+</button>
                        }
                    </td>
                </tr>
            )}) : null }
        </>
    )
}

