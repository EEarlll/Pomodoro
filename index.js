let timerId;
let isBreak = false;
let isLongBreak = false;
let isPause = false;
let minutes = 25;
let duration = minutes;
let breakDuration = 5;
let longbreakDuration = 10;
let interval = 0;
let seconds = 0;
let lbOrsb = false;

let timer = document.querySelector(".timer");
const popup_container = document.querySelector(".popup-container");
const main_container = document.querySelector(".main-container");
const audio_sound = document.querySelector("#audio_sound");

const start_button = document.querySelector(".start");
const restart_button = document.querySelector(".restart");
const settings_button = document.querySelector(".settings");

const breaks_button = document.querySelectorAll(".breaks");
const pomo_button = document.querySelector("#pomo");
const shortb_button = document.querySelector("#shortb");
const longb_button = document.querySelector("#longb");

const option = document.querySelector(".options");
const line = document.querySelector("#line");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");

const gen_settings = document.querySelector(".general");
const time_settings = document.querySelector(".Timer-option");
const sound_settings = document.querySelector(".Sounds");
const pomodoro_start = document.querySelector("#Pomodoro_start");
const shortb_start = document.querySelector("#Shortb_start");
const longB_start = document.querySelector("#LongB_start");

pomodoro_start.value = minutes;
shortb_start.value = breakDuration;
longB_start.value = longbreakDuration;
const inputs = [pomodoro_start, shortb_start, longB_start];

const Theme_select = document.querySelector("#themestyle");
const notification_checkbox = document.querySelector("#notification_checkbox");
const PlaceHolder1 = document.querySelector("#PlaceHolder1");

const Sound_select = document.querySelector("#sound-style");
const soundtimer_checkbox = document.querySelector("#soundTimer");
const rangesound_slider = document.querySelector("#range_sound");
const customfile = document.querySelector("#custom_file");

const saveChangeButton = document.querySelector("#save-settings");
const resetSettingsButton = document.querySelector("#reset-settings");
const closeButton = document.querySelector("#close-settings");

const parag_number = document.querySelector("#parag-number");
const parag_text = document.querySelector("#parag-text");

const bg = document.querySelector("#bg");
const bg_1 = document.querySelector("#bg_1");
const bg_2 = document.querySelector("#bg_2");
const bg_3 = document.querySelector("#bg_3");
const bg_4 = document.querySelector("#bg_4");
const inputs_header = [bg_1, bg_2, bg_3, bg_4];

let bg_assets = {
  Still_images: [
    "Assets/bg.png",
    "Assets/bg2.png",
    "Assets/bg3.png",
    "Assets/bg4.png",
  ],
  Dynamic_images: [
    "Assets/bg_dynamic.mp4",
    "Assets/bg2_dynamic.mp4",
    "Assets/bg3_dynamic.mp4",
    "Assets/bg4_dynamic.mp4",
  ],
  Infinite_images: [
    "Assets/bg_inter.mp4",
    "Assets/bg2_inter.mp4",
    "Assets/bg3_inter.mp4",
    "Assets/bg4_inter.mp4",
  ],
};

// header
function changeBackgroundImage() {
  let crnt_setting = get_current_settings();
  let themestyle = crnt_setting.themestyle;
  let asset = changeBackground_assets(themestyle);
  return asset;
}
inputs_header.forEach(function (element, index) {
  element.addEventListener("click", function () {
    let bg = changeBackgroundImage()[index];
    document.body.style.backgroundImage = `url('${bg}')`;
  });
});

// Settings
const default_settings = {
  themestyle: "Still_images",
  notification: true,
  placeholder1: false,

  pomodoro_min: 25,
  shortb_min: 5,
  longb_min: 10,

  soundstyle: "sound1",
  sounttimer: true,
  rangesound: 50,
};
audio_sound.volume = default_settings.rangesound / 100;

function get_current_settings() {
  let current_setting = {
    themestyle: Theme_select.options[Theme_select.selectedIndex].value,
    notification: notification_checkbox.checked,
    placeholder1: PlaceHolder1.checked,

    pomodoro_min: pomodoro_start.value,
    shortb_min: shortb_start.value,
    longb_min: longB_start.value,

    soundstyle: Sound_select.options[Sound_select.selectedIndex].value,
    sounttimer: soundtimer_checkbox.checked,
    rangesound: rangesound_slider.value,
  };
  return current_setting;
}

function save_settings() {
  let new_settings = get_current_settings();
  Theme_select.value = new_settings.themestyle;
  notification_checkbox.checked = new_settings.notification;
  PlaceHolder1.checked = new_settings.placeholder1;

  pomodoro_start.value = new_settings.pomodoro_min;
  shortb_start.value = new_settings.shortb_min;
  longB_start.value = new_settings.longb_min;

  Sound_select.value = new_settings.soundstyle;
  soundtimer_checkbox.checked = new_settings.sounttimer;
  rangesound_slider.value = new_settings.rangesound;
  change_mode("pomo");
  changeBackground_assets(Theme_select.value);

  if (!soundtimer_checkbox.checked) {
    audio_sound.volume = 0;
  } else {
    audio_sound.volume = new_settings.rangesound / 100;
  }
}
function reset_settings() {
  Theme_select.value = default_settings.themestyle;
  notification_checkbox.checked = default_settings.notification;
  PlaceHolder1.checked = default_settings.placeholder1;

  pomodoro_start.value = default_settings.pomodoro_min;
  shortb_start.value = default_settings.shortb_min;
  longB_start.value = default_settings.longb_min;

  Sound_select.value = default_settings.soundstyle;
  soundtimer_checkbox.checked = default_settings.sounttimer;
  rangesound_slider.value = default_settings.rangesound;
  customfile.style.display = "none";
  audio_sound.src = "Assets/audio.mp3";
  save_settings();
}
function close_settings() {
  popup_container.style.display = "none";
  main_container.classList.remove("blur");
}

// popups
closeButton.addEventListener("click", close_settings);
saveChangeButton.addEventListener("click", function () {
  save_settings();
  close_settings();
});
resetSettingsButton.addEventListener("click", reset_settings);
Sound_select.addEventListener(
  "change",
  function () {
    if (this.value == "sound3") {
      customfile.style.display = "block";
    } else if (this.value == "sound2") {
      audio_sound.src = "Assets/audio2.mp3";
    } else {
      customfile.style.display = "none";
      audio_sound.src = "Assets/audio.mp3";
    }
  },
  false
);
customfile.addEventListener("change", function () {
  const file = this.files[0];
  const audioURL = URL.createObjectURL(file);
  audio_sound.src = audioURL;
});
inputs.forEach((input, index) => {
  input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const nextInput = inputs[index + 1];

      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});
function changeBackground_assets(theme_style) {
  let style;
  let themeStyles = ["Still_images", "Dynamic_images", "Infinite_images"];
  themeStyles.forEach((element, index) => {
    if (element == theme_style) {
      style = bg_assets[themeStyles[index]];
      return style;
    }
  });
  return style;
}

// body
document.body.style.backgroundImage = "url('Assets/bg2.png')";

function handleOptionClick(selected, option, settings) {
  option.addEventListener("click", function () {
    settings.forEach(function (i) {
      i.style.display = i === selected ? "flex" : "none";
    });
  });
}

handleOptionClick(gen_settings, option1, [
  gen_settings,
  sound_settings,
  time_settings,
]);
handleOptionClick(time_settings, option2, [
  gen_settings,
  sound_settings,
  time_settings,
]);
handleOptionClick(sound_settings, option3, [
  gen_settings,
  sound_settings,
  time_settings,
]);

function startTimer() {
  if (lbOrsb) {
    timerId = setInterval(updateTimer2, 1000);
  } else {
    timerId = setInterval(updateTimer, 1000);
  }
}
function updateTimer() {
  if (seconds == 0) {
    if (minutes == 0) {
      if (isBreak) {
        interval++;
        console.log(interval);
      }
      if (interval == 5) {
        change_color_btn("pomo");
        reset();
        audio_sound.play();
        return;
      }
      isBreak = !isBreak;
      minutes = isBreak ? breakDuration : duration;
      audio_sound.play();
      if (isBreak) {
        change_color_btn("shortb");
      } else {
        change_color_btn("pomo");
      }
      if (interval == 4 && isBreak) {
        minutes = longbreakDuration;
        change_color_btn("longb");
      }
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds -= 1;
  }
  const formatted_min = minutes.toString().padStart(2, "0");
  const formatted_sec = seconds.toString().padStart(2, "0");
  timer.innerHTML = `${formatted_min}:${formatted_sec}`;
}
function updateTimer2() {
  if (seconds == 0) {
    if (minutes == 0) {
      reset();
      audio_sound.play();
      return;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds -= 1;
  }
  const formatted_min = minutes.toString().padStart(2, "0");
  const formatted_sec = seconds.toString().padStart(2, "0");
  timer.innerHTML = `${formatted_min}:${formatted_sec}`;
}
function reset() {
  seconds = 0;
  interval = 0;
  minutes = duration;
  isPause = false;
  start_button.textContent = "Start";
  clearInterval(timerId);
  const formatted_min = duration.toString().padStart(2, "0");
  const formatted_sec = seconds.toString().padStart(2, "0");
  timer.innerHTML = `${formatted_min}:${formatted_sec}`;
  return;
}
function change_mode(mode) {
  change_color_btn(mode);
  let settings = get_current_settings();
  if (mode == "pomo") {
    isBreak = false;
    minutes = settings.pomodoro_min;
    interval = 0;
  }
  if (mode == "shortb") {
    isBreak = true;
    minutes = settings.shortb_min;
    interval = 4;
  }
  if (mode == "longb") {
    minutes = settings.longb_min;
    interval = 5;
  }
  lbOrsb = mode != "pomo" ? true : false;
  breakDuration = settings.shortb_min;
  duration = minutes;
  seconds = 0;
  isPause = false;
  start_button.textContent = "Start";
  const formatted_min = duration.toString().padStart(2, "0");
  const formatted_sec = seconds.toString().padStart(2, "0");
  timer.innerHTML = `${formatted_min}:${formatted_sec}`;
  clearInterval(timerId);
}
function change_color_btn(mode) {
  let options = [pomo_button, shortb_button, longb_button];
  let indexoptions = ["pomo", "shortb", "longb"];
  options.forEach(function (i) {
    i.style.backgroundColor =
      i == options[indexoptions.indexOf(mode)] ? "white" : "transparent";
  });
}
// upper_settings
pomo_button.addEventListener("click", function () {
  change_mode("pomo");
});
shortb_button.addEventListener("click", function () {
  change_mode("shortb");
});
longb_button.addEventListener("click", function () {
  change_mode("longb");
});

// lower_settings
function btn() {
  if (isPause) {
    clearInterval(timerId);
    isPause = false;
    start_button.textContent = "Start";
  } else {
    startTimer();
    isPause = true;
    start_button.textContent = "pause";
  }
}
function showpopup() {
  popup_container.style.display = "flex";
  main_container.classList.add("blur");
}
function closepopup(e) {
  let container = document.querySelector(".popup-container");
  if (!container.contains(e.target)) {
    container.style.display = "none";
    main_container.classList.remove("blur");
  }
}
document.addEventListener("click", function (e) {
  closepopup(e);
});

start_button.addEventListener("click", btn);
restart_button.addEventListener("click", function (e) {
  reset();
  restart_button.classList.toggle("rotate");
  setTimeout(() => {
    restart_button.classList.remove("rotate");
  }, 500);
});
settings_button.addEventListener("click", function (e) {
  e.stopPropagation();
  showpopup();
});

// api
const url =
  "https://numbersapi.p.rapidapi.com/6/21/date?fragment=true&json=true";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "53b853365cmsh1d916c0f1e990afp1b8c51jsn5c03a1afcfbd",
    "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
  },
};
async function random_fact() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
async function fetchData() {
  try {
    const k = await random_fact();
    return k;
  } catch (error) {
    console.error(error);
  }
}

fetchData().then((result) => {
  parag_number.innerHTML = result["year"];
  parag_text.innerHTML = result["text"];
});
