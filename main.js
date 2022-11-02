let parent = document.querySelector(".container .parent");
let iFrame = document.querySelector(".container iframe");
let name = document.querySelector(".container .name");
let media = document.querySelector(".container .media");
let startBtn = document.querySelector("button.start");


// startBtn.onclick = function() {
//   this.style.display = "none";
//   iFrame.src = "http://download.quranicaudio.com/quran/ahmed_ibn_3ali_al-3ajamy/001.mp3"
//   media.style.display = 'flex';
// }


fetch("https://quran-endpoint.vercel.app/quran")
.then((res)=> res.json())
.then((data)=> {
  name.textContent = data.data[0].asma.ar.long;
  for(let i=0; i<data.data.length; i++) {

    parent.innerHTML += `<div class='box' data-num='${`${i+1}`.zFill(3)}'>${data.data[i].asma.ar.long}<div/>`;
  }

  handleClick();

});


function handleClick() {
  let boxs = document.querySelectorAll(".parent .box");

  boxs.forEach((box)=> {
    box.addEventListener(('click'), (e)=> {
      iFrame.src = `https://download.quranicaudio.com/quran/ahmed_ibn_3ali_al-3ajamy/${e.target.dataset.num}.mp3`;
      iFrame.onload = function(){media.style.display = "flex";}
      name.textContent = e.target.textContent;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  })

}


String.prototype.zFill = function (width) {
    let result = this;
    while(width > result.length) {
        result = `0${result}`
    }
    return result.toString();
  }