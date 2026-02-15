"use client";

import { useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import MenuBar from "./MenuBar";
import Login from "./login/login";

export default function Header() {
    const [isLoginPopup, setIsLoginPopup] = useState(false);

    return (
        <div className="z-50">
            <AnnouncementBar />
            <MenuBar setIsLoginPopup={setIsLoginPopup} />
            {isLoginPopup && (
                <Login
                    isLoginPopup={isLoginPopup}
                    setIsLoginPopup={setIsLoginPopup}
                />
            )}
        </div>
    );
}
