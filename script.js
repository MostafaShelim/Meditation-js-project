(function(){
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    //all the sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //length of the outline
    const outlineLength = outline.getTotalLength();
    //hard code duration
    let totalDuration = 10;
    //time displya
    const timeDisplay = document.querySelector('.time-display');
    const timer = document.querySelectorAll('.time-select button');

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(sound=>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            playingOrNot(song);
        })
    })
    timer.forEach(option =>{
        
        option.addEventListener('click', function(){
            totalDuration = option.getAttribute('data-time');
            let min = totalDuration/60;
            let sec = totalDuration%60;
            timeDisplay.textContent = `${min}:${sec}`;
            song.src = 'sounds/rain.mp3';

            playingOrNot(song);
        })
    })
    song.ontimeupdate = ()=>{
        let currTime = song.currentTime;
        let timeBakiAche = totalDuration - currTime;
        let seconds = Math.floor(timeBakiAche%60);
        let minutes = Math.floor(timeBakiAche/60);

        timeDisplay.textContent = `${minutes}:${seconds}`;
        //stroke animation
        let progress = outlineLength - (currTime/totalDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        if(currTime>=totalDuration){
            song.currentTime = 0;
            song.pause();
            play.src = 'svg/play.svg';
            video.pause();
        }
    }
    play.addEventListener('click', ()=>{
        playingOrNot(song);
    })
    const playingOrNot = (song)=>{
        if(song.paused){
            song.play();
            video.play();
            play.src = '/svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = '/svg/play.svg';
        }
    }
})();

