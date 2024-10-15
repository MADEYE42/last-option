"use client";

import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import io from "socket.io-client"; // Import socket.io-client

const socket = io("http://localhost:3001"); // Connect to the backend server

const VideoCall = () => {
  const zepRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const appID = 563102835;
        const serverSecret = "2b4bb411cb70c040ccfc3d8dc982fdaa";
        const roomID = "my_room_" + new Date().getTime();
        const userID = new Date().getTime().toString();
        const userName = "user_" + userID;

        console.log("Room ID:", roomID);

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          userID,
          userName
        );

        zepRef.current = ZegoUIKitPrebuilt.create(kitToken);
        zepRef.current.joinRoom({
          container: document.getElementById("myCallContainer"),
          sharedLinks: [
            {
              name: "Personal link",
              url: window.location.origin + window.location.pathname + "?roomID=" + roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          turnOnCameraWhenJoining: true,
          turnOnMicrophoneWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
        });

        // Emit an event to notify the admin about the call and pass the roomID
        socket.emit("notify-admin", roomID);

      } catch (error) {
        console.error("Error initializing ZegoUIKitPrebuilt:", error);
      }
    };

    init();
  }, []);

  return (
    <div>
      <h1></h1>
      <div id="myCallContainer" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default VideoCall;
