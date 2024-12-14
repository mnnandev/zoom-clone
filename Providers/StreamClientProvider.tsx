'use client';
import { tokenProvider } from "@/actions/stream.action";
import Loader from "@/components/ui/Loader";
import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
   
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
 

 

 const StreamVideoProvider = ({children}:{children:ReactNode}) => {
    const [videoClient,SetVideoClient]= useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();
    useEffect(()=> {
    if(!user || !isLoaded) return;
    if(!API_KEY) throw new Error('Stream api key is missing');
    const client = new StreamVideoClient ({
      apiKey:API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider:tokenProvider
    })
    SetVideoClient(client);
    },[user,isLoaded])
    if (!videoClient) return <Loader />;
  return (
    <StreamVideo client={videoClient}>
     {children}
    </StreamVideo>
  );
};
export default StreamVideoProvider;