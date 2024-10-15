// app/admin/page.js
"use client"; // This is important for using hooks and effects in a component

import { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Adjust the URL as needed

export default function Admin() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        socket.emit("join", "admin");

        socket.on("call", () => {
          // Handle the call from donor
          console.log("Call initiated by donor");
        });
      })
      .catch((err) => console.error(err));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <video ref={videoRef} autoPlay />
      {/* Add functionality to accept calls or display notifications here */}
    </div>
  );
}
