import React from "react";
import { Users } from "./YoutubeContainer";

export const UserConnexion: React.FC = () => {

    const handleButtonUserClick = (user: Users) => {
        window.location.href += user;
    }

    return (
        <div className="container mt-4">
            <div>
                <h1>
                    Please connect to your{" "}
                    <span className="badge bg-danger">Youtube Library</span>
                </h1>
                <button
                    type="button"
                    className="btn btn-secondary position-relative m-2"
                    onClick={() => handleButtonUserClick(Users.John)}
                >
                    {Users.John}
                    <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">Connect</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="btn btn-secondary position-relative m-2"
                    onClick={() => handleButtonUserClick(Users.Mark)}
                >
                    {Users.Mark}
                    <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">Connect</span>
                    </span>
                </button>
            </div>
        </div>
    );
};