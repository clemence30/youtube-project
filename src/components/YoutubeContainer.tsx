import { useEffect, useState } from "react"
import { YoutubeFilter } from "./YoutubeFilter"
import { DisplayVideo } from "./DisplayVideo"
import { YoutubeLibrary } from "./YoutubeLibrary"
import { UserConnexion } from "./UserConnexion"

export interface PropsYoutubeUser {
    name: string
    videos: PropsYoutubeVideo[]
}

export interface PropsYoutubeVideo {
    id: string
    title: string
}

export interface PropsDisplay {
    filter: boolean
    videoId?: string
    videoName?: string
}

export enum Users {
    John = "john",
    Mark = "mark",
  }

export const URL_SERVER ="http://localhost:8000/";

export const YoutubeContainer: React.FC = () => {
 
    const [userLibrary, setUserLibrary] = useState<PropsYoutubeUser | undefined >();
    const [displayScreen, setDisplayScreen] = useState<PropsDisplay | undefined>();

    /**
     * Function to fetch user data based on his name
     * @param userSpecified User to fetch data
     */
    const fetchUserData =  (userSpecified?: Users) => {
        // if no user specified, take current URL
        const userInUrl = window.location.pathname.split("/").pop();
        
        if(!! userInUrl || !! userSpecified){
            const userToFetch = !! userSpecified ? userSpecified : userInUrl;
            
            fetch(URL_SERVER + userToFetch, {
                method: 'GET'})
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to fetch user data for ${userToFetch}`);
                    }
                    return res.json();
                })
                .then(data => setUserLibrary(data))
                .catch(error => {
                    console.error(`Error fetching user data: ${error.message}`);
                    setUserLibrary(undefined);
                     // Redirect to home page if no user found
                    window.location.pathname = "/";
                })
        }
    }  

    useEffect(() => {
        fetchUserData();
    },[displayScreen])

    return (
        <div className="container mt-4">
            {!! userLibrary ?
            <div className="row">
                    <div className="col-4">
                        <YoutubeLibrary userLibrary={userLibrary} setDisplayScreen={setDisplayScreen} setUserLibrary={setUserLibrary} />
                    </div>
                    <div className="col-6 mt-2">
                        {displayScreen && displayScreen.filter ?
                            <YoutubeFilter setDisplayScreen={setDisplayScreen} setYoutubeUserLibrary={setUserLibrary} youtubeUserLibrary={userLibrary} />               
                            : displayScreen && !!displayScreen.videoId && !!displayScreen.videoName?
                            <DisplayVideo  videoId={displayScreen.videoId} videoName={displayScreen.videoName}/>
                            : null
                        }   
                    </div>
                </div>
            :
                <UserConnexion  />
            }
        </div>
    )
}