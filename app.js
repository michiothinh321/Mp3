let play = document.querySelector('.player-inner')
let song = document.querySelector('.song')
let nextBtn = document.querySelector('.forward')
let prevBtn= document.querySelector('.backward')
let musicImg = document.querySelector('.music_title img')
let musicName = document.querySelector('.music_name')
let nextNameSong = document.querySelector('.nameSong')
let rangeSong = document.querySelector('.range')
let durationSong = document.querySelector('.duration')
let remainingSong = document.querySelector('.remaining')
let repeat= document.querySelector('.repeat')
let infinity= document.querySelector('.infinity')
let currentIndex= 0
let count = 0;
let listSong = [
    {
        id:0,
        name: 'Tai Vi Sao',
        file: 'TaiViSao-MCK-7963973.mp3',
        img: 'mck.jpg'
    },
    {
        id:1,
        name: 'Waiting For U',
        file: 'WaitingForYou-MONOOnionn-7733882.mp3',
        img: 'mono-4-8195.jpg'
    },
    {
        id:2,
        name: 'Vi Anh Dau Co Biet',
        file: 'ViAnhDauCoBiet-MadihuVu-7666644.mp3',
        img: 'channels4_profile (1).jpg'
    },
    {
        id:3,
        name: 'Tong Phu',
        file: 'TongPhu-KeyoVietNam-7802406.mp3',
        img: 'channels4_profile.jpg'
    },
]

let isPlaying = true;
play.addEventListener('click',playPause)
function playPause(){
        if(isPlaying){
            song.play();
            play.innerHTML= `<i class="fa-solid fa-pause"></i>`
            isPlaying=false
        }
        else{
            song.pause();
            play.innerHTML= `<i class="fa-solid fa-play play_icon"></i>`
            isPlaying=true
        }
}

function init(currentIndex){
    song.setAttribute('src',`./music/${listSong[currentIndex].file}`)
    musicImg.setAttribute('src',`./img/${listSong[currentIndex].img}`)
    musicName.innerHTML = listSong[currentIndex].name;
    if(currentIndex < listSong.length-1){
        nextNameSong.innerHTML = listSong[currentIndex+1].name
    }
    else
    {
        nextNameSong.innerHTML = listSong[0].name
    }
}
function randomSong(index){
   currentIndex= Math.floor(Math.random()*index);
   init(currentIndex);
   isPlaying=true;
   playPause();

}
infinity.addEventListener('click',()=>{
    infinity.classList.toggle("active")
    if(infinity.classList.contains('active')==true){
     
        count=2;
    }
    else{
        count=0;
    }
})

repeat.addEventListener('click',()=>{
    repeat.classList.toggle("active")
    if(repeat.classList.contains('active')==false){
       
        count=0;
    }
    else{
        count=1;
    }
})
song.addEventListener('ended',function(){
    if(count==1){
        isPlaying=true;
        playPause();
    }
    else if(count==0){
        changeSong(1);
    }
    else if(count==2){
        randomSong(listSong.length);
    }

})
nextBtn.addEventListener('click',()=>{
    if(count==2){
        randomSong(listSong.length);
    }
    else{
        changeSong(1)
    }
    
})

prevBtn.addEventListener('click',()=>{
    if(count==2){
        randomSong(listSong.length);
    }
    else{
        changeSong(-1)
    }
})

function changeSong(index){
    if(index == 1){
        currentIndex++
        if(currentIndex > listSong.length-1)
        {
            currentIndex=0
            
        }
        isPlaying=true;
    }
    else if (index == -1){
        currentIndex--;
        if(currentIndex < 0)
        {
            currentIndex= listSong.length-1
        }
        isPlaying= true;
    }
    
    init(currentIndex)
    
    playPause()
}


function formatTime(number){
    let minutes = Math.floor(number/60);
    let seconds =Math.floor(number - minutes*60);
    return `${minutes < 10 ? "0" + minutes : minutes}: ${seconds < 10 ? "0" + seconds : seconds}`;
}
setInterval(function displayTime(){
    const { duration, currentTime } = song;
    rangeSong.max = duration;
    rangeSong.value = currentTime;
    remainingSong.textContent = formatTime(currentTime);
    if (!duration) {
      durationSong.textContent = "00:00";
    } else {
      durationSong.textContent = formatTime(duration);
    }
},1000)
rangeSong.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeSong.value;
}
init(currentIndex);