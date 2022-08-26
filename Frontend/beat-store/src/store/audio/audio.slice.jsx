import { createSlice } from "@reduxjs/toolkit";

//Slice responsible for storing data for the music player
const initialState = {
  playlistArray: [""],
  playingIndex: -1,
  audioUrl: "",
  playing: false,
  volume: 0.1,
  duration: 0,
  seek: 0,
  loop: false,
  mute: false,
  reset: false,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    initPlaylist(state, action) {
      state.playlistArray = [...action.payload.playlistArray];
      state.playingIndex = action.payload.playingIndex;
      state.playing = true;
    },
    togglePlaying(state) {
      state.playing = !state.playing;
    },
    toggleLoop(state) {
      state.loop = !state.loop;
    },
    toggleMute(state) {
      state.mute = !state.mute;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setAudioUrl(state, action) {
      state.audioUrl = action.payload;
    },
    playNext(state) {
      if (!state.loop)
        state.playingIndex =
          (state.playingIndex + 1) % state.playlistArray.length;
      else state.reset = !state.reset;
    },
    playPrevious(state) {
      if (!state.loop)
        state.playingIndex =
          state.playingIndex === 0
            ? state.playlistArray.length - 1
            : state.playingIndex - 1;
      else state.reset = !state.reset;
    },
  },
});

export const {
  initPlaylist,
  togglePlaying,
  toggleLoop,
  toggleMute,
  setVolume,
  setDuration,
  setAudioUrl,
  playNext,
  playPrevious,
} = audioSlice.actions;
export default audioSlice.reducer;
