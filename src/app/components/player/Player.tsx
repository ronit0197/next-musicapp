'use client';

import Image from "next/image";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { useSongs } from "@/context/MediaContext";

export default function Player() {
    const { songs, nextSong, previousSong, currentSongIndex, isPlaying, setIsPlaying } = useSongs();

    // Get the current song
    const currentSong = songs[currentSongIndex];

    const [currentTime, setCurrentTime] = useState(0);  // Changed to number for better slider handling
    const [duration, setDuration] = useState(0);  // Changed to number for better slider handling
    const [volume, setVolume] = useState(1);

    const [isScrolling, setIsScrolling] = useState(false);
    const [isSingerScrolling, setIsSingerScrolling] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const songNameRef = useRef<HTMLParagraphElement | null>(null);
    const singerNameRef = useRef<HTMLParagraphElement | null>(null);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
            if (Math.floor(audio.currentTime) === Math.floor(duration)) {
                nextSong()
            }
        }
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) {
            setDuration(audio.duration);
        }
    };

    useEffect(() => {
        if (songNameRef.current && singerNameRef.current) {
            const containerWidth = songNameRef.current.parentElement?.offsetWidth || 0;
            const textWidth = songNameRef.current.scrollWidth;

            const container2Width = singerNameRef.current.parentElement?.offsetWidth || 0;
            const text2Width = singerNameRef.current.scrollWidth;

            setIsScrolling(textWidth >= containerWidth);
            setIsSingerScrolling(text2Width >= container2Width)

            console.log("Container width:", containerWidth)
            console.log("Text width:", textWidth)
        }
    }, [currentSong?.SongName]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && isPlaying) {
            audio.play();
        }
    }, [currentSongIndex, isPlaying]);

    console.log("scrolling:", isScrolling)

    if (!currentSong) {
        return (
            <div className="player skeleton">
                <div className="album">
                    <div className="album-img skeleton-box"></div>
                </div>
                <div className="album-info">
                    <div className="skeleton-box song-name"></div>
                    <div className="skeleton-box artist"></div>
                </div>
                <div className="player-controls">
                    <div className="play-pause-next">
                        <div className="skeleton-box btn"></div>
                        <div className="skeleton-box btn"></div>
                        <div className="skeleton-box btn"></div>
                    </div>
                    <div className="player-timming">
                        <div className="skeleton-box timing"></div>
                        <div className="skeleton-box slider"></div>
                        <div className="skeleton-box timing"></div>
                    </div>
                </div>
            </div>
        );

    }

    return (
        <div className="player">
            <div className="album">
                <img className={`album-img ${isPlaying && "rotate-album"}`} src={currentSong?.Album} alt="Player" />
            </div>
            <div className="album-info">
                <p className={`song-name ${isScrolling ? "marquee" : ""}`} ref={songNameRef}>{currentSong?.SongName}</p>
                <p className={`airtist ${isSingerScrolling ? "marquee" : ""}`} ref={singerNameRef}>{currentSong?.Singer}</p>
            </div>
            <div className="player-controls">
                <div className="play-pause-next">
                    <Image onClick={previousSong} src="/previous.svg" alt="Player controls" width={20} height={20} />
                    <Image onClick={togglePlayPause} className="play-btn" src={isPlaying ? "/pause.svg" : "/play.svg"} alt="Player controls" width={30} height={30} />
                    <Image onClick={nextSong} src="/next.svg" alt="Player controls" width={20} height={20} />
                </div>
                <div className="player-timming">
                    <span className="player-timing">{formatTime(currentTime)}</span>
                    <input
                        className="player-slider"
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={(e) => {
                            const audio = audioRef.current;
                            if (audio) {
                                audio.currentTime = Number(e.target.value);
                            }
                        }}
                    />
                    <span className="player-timing">{formatTime(duration)}</span>
                </div>
            </div>
            <div className="player-others">
                <Image src="/playlist.svg" alt="Player controls" width={20} height={20} />
                <Image src="/shuffle.svg" alt="Player controls" width={20} height={20} />
                <Image src="/speaker.svg" alt="Player controls" width={20} height={20} />
            </div>

            <audio
                ref={audioRef}
                src={currentSong?.Src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </div>
    );
}