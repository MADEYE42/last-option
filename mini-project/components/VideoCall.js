// components/VideoCall.js
import React, { useEffect, useRef } from 'react';

const VideoCall = ({ roomId }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        // Set up WebSocket connection
        socketRef.current = new WebSocket('ws://localhost:8080');

        socketRef.current.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            // Handle signaling messages here (offer/answer/ICE candidates)
        };

        // Set up media stream
        const startVideoCall = async () => {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = localStream;

            peerConnectionRef.current = new RTCPeerConnection();
            localStream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, localStream));

            peerConnectionRef.current.ontrack = (event) => {
                const remoteStream = new MediaStream();
                remoteStream.addTrack(event.track);
                remoteVideoRef.current.srcObject = remoteStream;
            };

            // Send the local stream to the server
            // Signaling logic here (e.g., sending offer to the other peer)
        };

        startVideoCall();

        return () => {
            // Cleanup on component unmount
            if (socketRef.current) {
                socketRef.current.close();
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, [roomId]);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
        </div>
    );
};

export default VideoCall;
