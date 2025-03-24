import React, { useRef } from 'react'

const testAudio = new Audio('./SoundEffects/tap.mp3');

const volumeTest = () => {
    if(getVolume()!=null){
        testAudio.volume = getVolume();
    }
    testAudio.play();
};

const about = () => {
    window.location.href = '/pomodoro-manager/#/about';
};

const getWorkTime = () => {
    return localStorage.getItem("toDoTime");
};

const getBreakTime = () => {
    return localStorage.getItem("breakTime");
};

const getCounter = () => {
    return localStorage.getItem("counter");
};

const getVolume = () => {
    return localStorage.getItem("volume");
};

const Setting = () => {

    const inpWorkTime = useRef();
    const inpBreakTime = useRef();
    const inpCount = useRef();
    const inpVolume = useRef();

    const openTimer = () => {
        localStorage.setItem("toDoTime",inpWorkTime.current.value);
        localStorage.setItem("breakTime",inpBreakTime.current.value);
        localStorage.setItem("counter",inpCount.current.value);
        localStorage.setItem("volume",inpVolume.current.value/10);
        window.location.href = '/pomodoro-manager/';
    };

    const setVolume = () => {
        localStorage.setItem("volume",inpVolume.current.value/10);
        testAudio.volume = inpVolume.current.value/10;
    };

    const pomodoroReset = () => {
        var ans = window.confirm('It will be pomodoro reset, is this OK?');
        if(ans){
            localStorage.setItem("counter",0);
            localStorage.setItem("nowTime",3/60);
            localStorage.setItem("status",false);
            window.location.href = '/pomodoro-manager/';
        }
    };

    return (
        <>
            <div>
                <p><span className='parts'>WORK TIME</span><input type='number' className='parts input' defaultValue={getWorkTime()} ref={inpWorkTime}></input><span className='parts'>minutes</span></p>
                <p><span className='parts'>BREAK TIME</span><input type='number' className='parts input' defaultValue={getBreakTime()} ref={inpBreakTime}></input><span className='parts'>minutes</span></p>
                <p><span className='parts'>POMODORO COUNT</span><input type='number' className='parts input' defaultValue={getCounter()} ref={inpCount}></input><span className='parts'>times</span></p>
                <p><span className='parts'>VOLUME</span><input type='range' min={0} max={10} className='parts' defaultValue={getVolume()*10} ref={inpVolume} onInput={setVolume}></input></p>
                <p className='parts btn' onClick={volumeTest}>VOLUME TEST</p>
                <p className='parts btn' onClick={pomodoroReset}>POMODORO RESET</p>
                <p className='parts btn' onClick={about}>ABOUT</p>
                <p className='parts btn' onClick={openTimer}>SAVE</p> 
            </div>
        </>
    )
};

export default Setting;
