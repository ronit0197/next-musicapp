"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define types for song and context
interface Song {
    id: string;
    SongName: string;
    Singer: string;
    Album: string | undefined;
    Src: string | undefined;
    Generation: string;
}

interface MediaContextType {
    songs: Song[];
    generations: string[];
    currentSongIndex: number;
    nextSong: () => void;
    previousSong: () => void;
    setCurrentSongIndex: (index: number) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    isLoading: boolean;
}

// Create the context with default values
export const MediaContext = createContext<MediaContextType | null>(null);

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {

    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [generations, setGenerations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const q = collection(db, "songs");
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    throw new Error("No songs found");
                }

                const data: Song[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Song));
                setSongs(data);

                const uniqueGenerations = [...new Set(data.map((song) => song.Generation))];
                setGenerations(uniqueGenerations);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const nextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    };

    const previousSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    };

    return (
        <MediaContext.Provider
            value={{
                songs,
                generations,
                currentSongIndex,
                nextSong,
                previousSong,
                setCurrentSongIndex,
                isPlaying,
                setIsPlaying,
                isLoading,
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};

// Hook to use Expense Context
export const useSongs = () => {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error("useExpense must be used within an ExpenseProvider");
    }
    return context;
};