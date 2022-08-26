import {
  PlayerBarContainer,
  PlayerButtonsContainer,
  SliderContainer,
  StyledButton,
  StyledToggleButton,
  StyledSlider,
  StyledThumb,
  StyledTrack,
  PlayerContainer,
} from "./music-player.styles";

import { Fragment, useEffect } from "react";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeOff,
  FaVolumeMute,
} from "react-icons/fa";

import { MdReplay } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import ReactHowler from "react-howler";
import raf from "raf";

import {
  togglePlaying,
  setVolume,
  setDuration,
  setAudioUrl,
  playNext,
  playPrevious,
  toggleLoop,
  toggleMute,
} from "../../store/audio/audio.slice";
import MusicVisualizer from "../music-visualizer/music-visualizer.component";
import { useState, useRef } from "react";
import { AudioItemRequest } from "../../requests/AudioItem/audio-item-requests";

const MusicPlayer = () => {
  //Initialization of sliders thumbs and tracks
  const Thumb = (props, state) => (
    <StyledThumb {...props}>{state.valueNow}</StyledThumb>
  );
  const Track = (props, state) => (
    <StyledTrack {...props} index={state.index} />
  );

  //Selecting audio redux state
  const {
    playlistArray,
    playingIndex,
    playing,
    volume,
    duration,
    mute,
    reset,
    loop,
    audioUrl,
  } = useSelector((state) => state.audio);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAudioUrl = async () => {
      let fetchedUrl = await AudioItemRequest.getAudioUrl(
        playlistArray[playingIndex]
      );
      dispatch(setAudioUrl(fetchedUrl));
    };

    if (playingIndex !== -1) fetchAudioUrl();
  }, [dispatch, playingIndex, playlistArray]);

  //References react-howler player for accessing it's methods
  const player = useRef(null);

  //References AnalyserNode and length of it's result array for visualizing audio
  const audioAnalyser = useRef(null);
  //Helper function used for initialization of audioAnalyser
  const audioInit = (howlerInstance) => {
    let analyser = new AnalyserNode(howlerInstance.ctx);

    //Shortest possible fftSize for preserving resources
    analyser.fftSize = 32;
    howlerInstance.masterGain.connect(analyser);

    return {
      analyser: analyser,
      bufferLength: analyser.frequencyBinCount,
    };
  };

  //Temporary array for storing AudioAnalyser getByteFrequencyData method results.
  var tempArray;
  const [audioArray, setAudioArray] = useState([]);

  function handleAudioLoading() {
    let howler = window.Howler;

    audioAnalyser.current = audioInit(howler);

    tempArray = new Uint8Array(audioAnalyser.current.bufferLength);
    setAudioArray(tempArray);

    dispatch(setDuration(player.current.duration()));
  }

  //Represents elapsed playing time for the audio.
  const [seek, setSeek] = useState();

  //Used for requesting frames to display seek slider's position and visualization
  var _raf;

  //Runs on each frame as long as audio is being played
  const seekSliderUpdate = () => {
    setSeek(player.current.seek());

    audioAnalyser.current.analyser.getByteFrequencyData(tempArray);

    //Gets only first 9 elements from analyzed frequency array, because next ones are usually close to 0
    setAudioArray([...tempArray.slice(0, 8)]);

    _raf = raf(seekSliderUpdate);
  };

  function handlePause() {
    raf.cancel(_raf);
  }

  function handleSeekChange(value) {
    setSeek(value);
    player.current.seek(value);
  }

  //Plays next audioUrl from the playlist in case the current one ends
  function handleEnd() {
    dispatch(playNext());
  }

  useEffect(() => {
    if (player.current) player.current.seek(0);
  }, [reset]);

  const VolumeIconRendering = () => {
    return mute ? (
      <FaVolumeMute />
    ) : volume >= 0.5 ? (
      <FaVolumeUp />
    ) : volume > 0.0 ? (
      <FaVolumeDown />
    ) : (
      <FaVolumeOff />
    );
  };

  return (
    <Fragment>
      <MusicVisualizer barHeights={audioArray}></MusicVisualizer>
      <PlayerBarContainer>
        <PlayerContainer>
          {audioUrl === "" ? null : (
            <ReactHowler
              src={audioUrl}
              playing={playing}
              volume={volume}
              onLoad={handleAudioLoading}
              onPlay={seekSliderUpdate}
              onPause={handlePause}
              onEnd={handleEnd}
              mute={mute}
              ref={(ref) => (player.current = ref)}
            />
          )}
        </PlayerContainer>

        <SliderContainer>
          <StyledToggleButton
            disabled={playingIndex === -1}
            toggleColor={loop}
            onClick={() => dispatch(toggleLoop())}
          >
            <MdReplay />
          </StyledToggleButton>
          <StyledSlider
            value={seek}
            min={0}
            max={duration}
            step={0.1}
            onChange={(value) => handleSeekChange(value)}
            renderTrack={Track}
            renderThumb={Thumb}
          />
        </SliderContainer>

        <PlayerButtonsContainer>
          <StyledButton
            disabled={playingIndex === -1}
            onClick={() => dispatch(playPrevious())}
          >
            <FaStepBackward />
          </StyledButton>

          <StyledButton
            disabled={playingIndex === -1}
            onClick={() => dispatch(togglePlaying())}
          >
            {playing ? <FaPause /> : <FaPlay />}
          </StyledButton>

          <StyledButton
            disabled={playingIndex === -1}
            onClick={() => dispatch(playNext())}
          >
            <FaStepForward />
          </StyledButton>
        </PlayerButtonsContainer>

        <SliderContainer>
          <StyledSlider
            value={volume}
            min={0.0}
            max={1.0}
            step={0.01}
            onChange={(value) => dispatch(setVolume(value))}
            renderTrack={Track}
            renderThumb={Thumb}
          />
          <StyledToggleButton
            disabled={playingIndex === -1}
            toggleColor={mute}
            onClick={() => dispatch(toggleMute())}
          >
            {VolumeIconRendering()}
          </StyledToggleButton>
        </SliderContainer>
      </PlayerBarContainer>
    </Fragment>
  );
};

export default MusicPlayer;
