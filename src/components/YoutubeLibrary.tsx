import { PropsDisplay, PropsYoutubeUser, PropsYoutubeVideo, URL_SERVER } from "./YoutubeContainer"
import { VideoList } from "./VideoList"

type PropsYoutubeLibrary = {
    userLibrary: PropsYoutubeUser | undefined 
    setUserLibrary: React.Dispatch<React.SetStateAction<PropsYoutubeUser | undefined>>
    setDisplayScreen: React.Dispatch<React.SetStateAction<PropsDisplay | undefined>>
}

export const YoutubeLibrary: React.FC<PropsYoutubeLibrary> = ({userLibrary, setUserLibrary, setDisplayScreen }) => {
    
    /**
     * Delete a video for a specified user
     * @param videoId Id used to delete the video
     */
    const handleDeleteVideo =  (videoId: string) => {
        const videoToDelete = userLibrary?.videos.find((el) => el.id === videoId);
        if(!! videoToDelete){
            fetch(URL_SERVER + userLibrary?.name, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: userLibrary?.name, video: videoToDelete})
            }
            )
            .then(res => res.json())
            .then(data => setUserLibrary(data))
            .catch(error => console.error(`Error deleting video: ${error.message}`))
        }
    } 

    /**
     * Handle Screen view, whether to display the search filter or a video 
     * @param videoId Parameter required to find the video in user library
     * @param videoName Same has videoId
     */
    const handleDisplayScreen = (videoId?: string, videoName?: string) => {
        if (!!videoId && !! videoName){
            setDisplayScreen({filter: false, videoId: videoId, videoName: videoName});
        } else {
            setDisplayScreen({filter: true});
        }
    }
    
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">{userLibrary?.name.toUpperCase()} LIBRARY</th>
                    <th scope="col"><button className="btn btn-warning" onClick={() => handleDisplayScreen()}>{">"}</button></th>
                </tr>
            </thead>
            <tbody>
                <VideoList handleDisplayScreen={handleDisplayScreen} handleVideoAction={handleDeleteVideo} setList={setUserLibrary} list={userLibrary?.videos || []}></VideoList>     
                {!!userLibrary && userLibrary?.videos.length === 0 &&
                <tr>
                    <td colSpan={2}>No videos available</td>
                </tr>}
            </tbody>
        </table>
    )
}