import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';

const Example = () => {
	const opts = {
		height: '300',
		width: '300',
		playerVars: {
		// https://developers.google.com/youtube/player_parameters
		autoplay: 1,
		},
	};
	const [operations, setOperations] = useState([]);
	const [download, setDownload] = useState("");
  const playerRef = useRef(null);

	function addOperation(ope) {
		setOperations([...operations, `${new Date()},${ope}`])
	}
	function _onReady(event) {
		// access to player in all event handlers via event.target
    playerRef.current = event.target;
		event.target.pauseVideo()
		addOperation('ready')
	}
	function _onError(event) {
		addOperation('error')
	}
	function _onPlay(event) {
		addOperation(`{"event": "play", "currentTime": ${event.target.getCurrentTime()}}`)
	}
	function _onPause(event) {
		addOperation(`{"event": "pause", "currentTime": ${event.target.getCurrentTime()}}`)
	}
	function _onEnd(event) {
		addOperation(`{"event": "end", "currentTime": ${event.target.getCurrentTime()}}`)
	}
	const handleDownload = () => {
		setDownload('data:text/plain;charset=utf-8,' + encodeURIComponent(operations.join('\n')));
	}
  const handlePlay = () => {
    console.log(playerRef.current);
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  }

	return (
		<div>
			<YouTube
				// videoId="2g811Eo7K8U"
        videoId="9w1KP2364vo"
				opts={opts}
				onReady={_onReady}
				onError={_onError}
				onPlay={_onPlay}
				onEnd={_onEnd}
				onPause={_onPause}
			/>
			<div>{operations.map((ope) => {
				return (
					<li key={ope}>
						{ope}
					</li>
				)
			})}</div>
      <button onClick={handlePlay}>自作した再生ボタン</button>
      <br></br>
			<button><a href={download} download="download.txt" onClick={handleDownload}>download(コピペしたのにあったやつ)</a></button>
		</div>
	)
}

export default Example
