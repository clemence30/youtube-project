import { Dispatch, SetStateAction, useState } from "react"
import { SearchVideo } from "./SearchVideo"
import { VideoList } from "./VideoList"
import { PropsDisplay, PropsYoutubeUser, PropsYoutubeVideo, URL_SERVER } from "./YoutubeContainer"

type PropsYoutubeFilter = {
    youtubeUserLibrary: PropsYoutubeUser
    setYoutubeUserLibrary: React.Dispatch<React.SetStateAction<PropsYoutubeUser | undefined>>
    setDisplayScreen: React.Dispatch<SetStateAction<PropsDisplay | undefined>>
}

export const YoutubeFilter :React.FC<PropsYoutubeFilter> = ({setYoutubeUserLibrary, youtubeUserLibrary}) => {

    const [result, setResult] = useState<PropsYoutubeVideo[]>([]);

    /**
     * Add a video for a specified user
     * @param videoId Id used to delete the video
     */
    const handleAddVideo =  (videoId: string) => {
        const videoToAdd = result.filter((el) => el.id === videoId)[0];
        if(!! videoToAdd){
            fetch(URL_SERVER + youtubeUserLibrary.name, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: youtubeUserLibrary.name, video: videoToAdd})
            }
            )
            .then(res => res.json())
            .then(data => setYoutubeUserLibrary(data))
            .catch(error => console.error(`Error adding video: ${error.message}`))
        }
    }  

    return (
        <div>
            <div className="mb-3">
            <SearchVideo setResult={setResult}/>
            </div>
            <table className="table table-striped">
                <tbody>
                    <VideoList handleVideoAction={handleAddVideo} setList={setYoutubeUserLibrary} list={result} setSearchList={setResult}></VideoList>     
                </tbody>
            </table>
        </div>
    )
}