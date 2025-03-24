import React from 'react'

import '../Timer/Timer.css';

import { useState, useEffect } from 'react';

import '../Setting/Setting.css';

//import { useSearchParams } from 'react-router-dom';

let fullscreen = false;

const tapAudio = new Audio('./SoundEffects/tap.mp3');
const workAudio = new Audio('./SoundEffects/work.mp3');
const breakAUdio = new Audio('./SoundEffects/break.mp3');

let startFlag = false;

let status = false;

let countTime = 3/60;

let toDoTime = 25;
let breakTime = 5;

let counter = 0;

const getVolume = () => {
  return localStorage.getItem("volume");
};

const fullSc = () => {
  if(fullscreen){
    document.documentElement.requestFullscreen();
  } 
}


const pauseStart = () => {
  fullSc();
  tapAudio.play();
  if(startFlag){
    startFlag = false;
  }else{
    startFlag = true;
  }
};

const toDoStart = () => {
  workAudio.play();
  status = true;
  countTime = toDoTime;
};

const breakStart = () => {
  breakAUdio.play();
  counter++;
  status = false;
  countTime = breakTime;
};


const openSetting = () => {
  setLocalStrage(countTime,toDoTime,breakTime,status,counter);
  window.location.href = '/pomodoro-manager/#/setting';
};


const getLocalStrage = () => {
  countTime = localStorage.getItem("nowTime");
  toDoTime = localStorage.getItem("toDoTime");
  breakTime = localStorage.getItem("breakTime");
  counter = localStorage.getItem("counter");
  localStorage.getItem("status") === "true" ? status = true : status = false; 
  if(countTime>=1){
    localStorage.getItem("status") === "true" ? countTime = toDoTime : countTime = breakTime; 
  }
};

const setLocalStrage = (nowTime,toDoTime,breakTime,status,counter) => {
  localStorage.setItem("nowTime",nowTime);
  localStorage.setItem("toDoTime",toDoTime);
  localStorage.setItem("breakTime",breakTime);
  localStorage.setItem("status",status);
  localStorage.setItem("counter",counter);
};


const getCss = (time,pomodoro) => {
  let manager = 100 - (time/(pomodoro*60))*100;
  return  {
    backgroundImage: `radial-gradient(#fff 0% 32%, transparent 32%),conic-gradient(${status?'rgb(0, 157, 255)':'rgb(50, 192, 202)'} ${manager}%,#e4e4e4 ${manager}% 100%)`
  };
};


if(getVolume()!=null){
  tapAudio.volume = getVolume();
  workAudio.volume = getVolume();
  breakAUdio.volume = getVolume();
}else{
  localStorage.setItem("volume",1);
}

localStorage.getItem("counter")==null ? setLocalStrage(countTime,toDoTime,breakTime,status,counter):getLocalStrage();


const Timer = () => {

  const [time,setTime] = useState(0);

  const [rend,setRend] = useState(false);

  const reset = () => {
    if(countTime>=1){
      var ans = window.confirm('It will be reset, is this OK?');
      if(!ans){
        return;
      }
    }
    countTime = 3/60;
    status = false;
    setTime(0);
    startFlag = true;
    tapAudio.play();
    fullSc();
  };

  /*

  const [searchParams] = useSearchParams();

  const statusCode = searchParams.get('fullscreen');

  if(statusCode==="yes"){
    fullscreen = true;
  }

  */

  useEffect(() => {
    const id = setInterval(() => {
      rend ? setRend(false) : setRend(true);
      if(startFlag){
        if(time<countTime*60){
          setTime(c => c + 1);
        }else{
          status ? breakStart():toDoStart();
          setTime(0);
        }
      }
    },1000);
    return () => {
      clearInterval(id);
    };
  });

  return (
    <>
      <div className='circle' style={getCss(time,countTime)} onClick={pauseStart}></div>
      <div>
        <p className='status'>{!startFlag ? "PAUSE":`${status ? "WORK TIME":"BREAK TIME"}`}</p>
        <p className='counter'> {counter} Pomodoro</p>
        <p><span className='parts btnMenu' onClick={openSetting}>SETTING</span><span className='parts btnMenu' onClick={reset}>RESET</span></p>
      </div>
    </>
  )
};

export default Timer;
