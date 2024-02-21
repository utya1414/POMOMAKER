"use client";
import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import CookieConsent from './cookies_consent';

const Example = () => {
  const [operations, setOperations] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  function addOperation(ope) {
    setOperations([...operations, `${new Date()},${ope}`])
  }
  function handlePlay() {
    console.log('handlePlay');
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setPlaying(true);
    }
  }
  const handleDownload = () => {
    setDownload('data:text/plain;charset=utf-8,' + encodeURIComponent(operations.join('\n')));
  }

  return (
    <div>
      <CookieConsent />
      {isClient && (
        <ReactPlayer
          url="https://www.youtube-nocookie.com/embed/9w1KP2364vo"
          controls={true}
          ref={playerRef}
          playing={playing}
          onReady={() => addOperation('ready')}
          onStart={() => addOperation('start')}
          onPlay={() => addOperation('play')}
          onPause={() => addOperation('pause')}
          onEnded={() => addOperation('end')}
          onError={() => addOperation('error')}
          width="0px"
          height="0px"
        />
      )}
      <div>{operations.map((ope) => {
        return (
          <li key={ope}>
            {ope}
          </li>
        )
      })}</div>
      <button onClick={handlePlay}>自作した再生ボタン（始めから再生）</button>
      <br></br>
      <button onClick={handleDownload}>download(コピペしたのにあったやつ)</button>
    </div>
  )
}

export default Example