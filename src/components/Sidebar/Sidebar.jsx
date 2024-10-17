// src/components/Sidebar/Sidebar.jsx

import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../config/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { previousPrompt, setRecentPrompt } = useContext(Context);

    const handlePromptClick = (prompt) => {
        setRecentPrompt(prompt); // Set the clicked prompt as the recent prompt
    };

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title"> Recent </p>
                        {previousPrompt.map((item, index) => (
                            <div 
                                key={index} 
                                className="recent-entry" 
                                onClick={() => handlePromptClick(item)}
                            >
                                <img src={assets.message_icon} alt="" />
                                <p>{item}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} />
                    {extended ? <p>Help</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} />
                    {extended ? <p>Activity</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
