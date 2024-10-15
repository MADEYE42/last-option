// app/donor/page.js
"use client"; // This is important for using hooks and effects in a component

import { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Adjust the URL as needed

export default function Donor() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        socket.emit("join", "donor");

        socket.on("call", () => {
          // Handle incoming call (you may need to set up WebRTC offer/answer here)
          console.log("Call received from admin");
        });
      })
      .catch((err) => console.error(err));

    return () => {
      socket.disconnect();
    };
  }, []);

  const initiateCall = () => {
    socket.emit("call", "admin"); // Notify the admin
  };

  return (
    <div>
      <h1>Donor Page</h1>
      <video ref={videoRef} autoPlay />
      <button onClick={initiateCall}>Initiate Video Call</button>
    </div>
  );
}
