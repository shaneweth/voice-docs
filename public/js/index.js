
// for hidden collapsible upload element

var coll = document.getElementsByClassName("collapsible");
var i;

var collAuth = document.getElementsByClassName("collapsibleAuth");
var j;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

for (j = 0; j < collAuth.length; j++) {
  collAuth[j].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "grid") {
      content.style.display = "none";
    } else {
      content.style.display = "grid";
    }
  });
}

//AUDIO PLAYER
// Elements

const player = document.querySelector(".player");
const audio = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress_filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player_slider");


// functions

function togglePlay() {

  // ternary op instead of if/else
  const method = audio.paused ? "play" : "pause";
  audio[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  console.log(icon);
  toggle.textContent = icon;
}

// Skip Function

function skip() {
  console.log(this.dataset.skip);
  audio.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  audio[this.name] = this.value;
  console.log(this.name);
  console.log(this.value);
}

function handleProgress() {
  // updates the flex-basis of .progress_filled
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  audio.currentTime = scrubTime;
  console.log(e);
}
// event listeners

audio.addEventListener("click", togglePlay);
audio.addEventListener("play", updateButton);
audio.addEventListener("pause", updateButton);

// listens for timeupdate for the handleProgress fn
audio.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

$(".project-option").on("click", function (e) {
  let text = $(this).text();
  console.log(text);
  $.get("api/projects/" + text, function (data) {
    $(".player_video").attr("src", data.mainFile);
    console.log(data);
  });
})