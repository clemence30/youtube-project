import { FormEvent, useState } from "react";
import YoutubeAPI from "../youtube-api/YoutubeAPI";
import { AxiosResponse } from "axios";
import { PropsYoutubeVideo } from "./YoutubeContainer";

type PropsSearchVideos = {
    setResult: React.Dispatch<React.SetStateAction<PropsYoutubeVideo[]>>
}

export interface PropsResultVideo {
    etag: string
    id: {
        kind: string,
        videoId: string
    }
    snippet: {
        channelId: string,
        channelTitle: string,
        description: string,
        liveBroadcastContent: string,
        publishTime: string,
        publishedAt: string,
        thumbnails : {}
        title: string
    }
}

export const SearchVideo = ({ setResult }: PropsSearchVideos) => {
    const [search, setSearch] = useState("");

    /**
     * Function to fetch youtube video based on a search value
     * @param value Search value
     */
    const fetchYoutubeVideo = async (value: string) => {
        await YoutubeAPI.get("/search", {
            params: {
                q: value
            }
        }) 
        .then((res)  => handleResult(res))
        .catch(error => console.error(`Error searching video: ${error.message}`))
    }

    /**
     * Retrieve the list of search results
     * @param res Videos returned by the Youtube v3 api
     */
    const handleResult = (res: AxiosResponse<any, any>) => {
       const responseList: PropsYoutubeVideo[] = res.data.items.map((e: PropsResultVideo) => ({
            id: e.id.videoId,
            title: e.snippet.title,
        }));
        // Only keep videos that have an id
        setResult(responseList.filter((e: PropsYoutubeVideo) => !!e.id));
    }

    /**
     * Allows to dynamically search for videos as the search value change
     * @param e Input change param
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
        fetchYoutubeVideo(value);
    }

    /**
     * Allows to search for videos when form is submitted
     * @param e Input submit param
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchYoutubeVideo(search);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label fw-bold" htmlFor="inputSearch">Search</label>
            <input type="text" 
                id="inputSearch" 
                className="col-sm-9"
                placeholder="Search video here..."
                value={search} 
                onChange={(e) => handleChange(e)}>
            </input>
            </div>
        </form>
    )
}