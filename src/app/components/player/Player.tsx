'use client';

import Image from "next/image"
import "./style.scss"
import { useState } from "react";

export default function Player() {

    const [currentTime, setCurrentTime] = useState("00:00");
    const [duration, setDuration] = useState("00:00");
    const [volume, setVolume] = useState(1);

    return (
        <div className="player">
            <div className="album">
                <img className="album-img" src="https://c.saavncdn.com/700/Ajogyo-Bengali-2024-20240604150032-150x150.jpg" alt="Player" />
            </div>
            <div className="album-info">
                <p className="song-name">Ajogyo Ami</p>
                <p className="airtist">Rupam Islam</p>
            </div>
            <div className="player-controls">
                <div className="play-pause-next">
                    <Image src={"/previous.svg"} alt={"Player controls"} width={20} height={20} />
                    <Image className="play-btn" src={"/play.svg"} alt={"Player controls"} width={30} height={30} />
                    <Image src={"/next.svg"} alt={"Player controls"} width={20} height={20} />
                </div>
                <div className="player-timming">
                    <span className='player-timing'>{currentTime}</span>
                    <input
                        className='player-slider'
                        type="range"
                        min={0}
                        max={100}
                        value={0}
                        onChange={(e) => {

                        }}
                    />
                    <span className='player-timing'>{duration}</span>
                </div>
            </div>
            <div className="player-others">
                <Image src={"/playlist.svg"} alt={"Player controls"} width={20} height={20} />
                <Image src={"/shuffle.svg"} alt={"Player controls"} width={20} height={20} />
                <Image src={"/speaker.svg"} alt={"Player controls"} width={20} height={20} />
            </div>
        </div>
    )
}