let colours = new Array("#fee", "#fcc", "#f9b", "#fee", "#fcc", "#f9b"); // colours of the hearts
let minisize = 10; // smallest size of hearts in pixels
let maxisize = 15; // biggest size of hearts in pixels
let hearts = 66; // maximum number of hearts on screen
let over_or_under = "over"; // set to "over" for hearts to always be on top, or "under" to allow them to float behind other objects

let x = (ox = 400);
let y = (oy = 300);
let swide = 800;
let shigh = 600;
let sleft = (sdown = 0);
let herz = new Array();
let herzx = new Array();
let herzy = new Array();
let herzs = new Array();
let kiss = false;

if (typeof "addRVLoadEvent" != "function")
  function addRVLoadEvent(funky) {
    let oldonload = window.onload;
    if (typeof oldonload != "function") window.onload = funky;
    else
      window.onload = function () {
        if (oldonload) oldonload();
        funky();
      };
  }

addRVLoadEvent(mwah);

function mwah() {
  if (document.getElementById) {
    let i, heart;
    for (i = 0; i < hearts; i++) {
      heart = createDiv("auto", "auto");
      heart.style.visibility = "hidden";
      heart.style.zIndex = over_or_under == "over" ? "1001" : "0";
      heart.style.color = colours[i % colours.length];
      heart.style.pointerEvents = "none";
      if (navigator.appName == "Microsoft Internet Explorer")
        heart.style.filter = "alpha(opacity=75)";
      else heart.style.opacity = 0.75;
      heart.appendChild(document.createTextNode(String.fromCharCode(9829)));
      document.body.appendChild(heart);
      herz[i] = heart;
      herzy[i] = false;
    }
    set_scroll();
    set_width();
    herzle();
  }
}

function herzle() {
  let c;
  if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
    ox = x;
    oy = y;
    for (c = 0; c < hearts; c++)
      if (herzy[c] === false) {
        herz[c].firstChild.nodeValue = String.fromCharCode(9829);
        herz[c].style.left = (herzx[c] = x - minisize / 2) + "px";
        herz[c].style.top = (herzy[c] = y - minisize) + "px";
        herz[c].style.fontSize = minisize + "px";
        herz[c].style.fontWeight = "normal";
        herz[c].style.visibility = "visible";
        herzs[c] = minisize;
        break;
      }
  }
  for (c = 0; c < hearts; c++) if (herzy[c] !== false) blow_me_a_kiss(c);
  setTimeout("herzle()", 40);
}

document.onmousedown = pucker;
document.onmouseup = function () {
  clearTimeout(kiss);
};
document.addEventListener("touchstart", pucker);
document.addEventListener("touchend", () => {
  clearTimeout(kiss);
});

function pucker() {
  ox = -1;
  oy = -1;
  kiss = setTimeout("pucker()", 100);
}

function blow_me_a_kiss(i) {
  herzy[i] -= herzs[i] / minisize + (i % 2);
  herzx[i] += ((i % 5) - 2) / 5;
  if (
    herzy[i] < sdown - herzs[i] ||
    herzx[i] < sleft - herzs[i] ||
    herzx[i] > sleft + swide - herzs[i]
  ) {
    herz[i].style.visibility = "hidden";
    herzy[i] = false;
  } else if (herzs[i] > minisize + 2 && Math.random() < 0.5 / hearts)
    break_my_heart(i);
  else {
    if (Math.random() < maxisize / herzy[i] && herzs[i] < maxisize)
      herz[i].style.fontSize = ++herzs[i] + "px";
    herz[i].style.top = herzy[i] + "px";
    herz[i].style.left = herzx[i] + "px";
  }
}

function break_my_heart(i) {
  let t;
  herz[i].firstChild.nodeValue = String.fromCharCode(9676);
  herz[i].style.fontWeight = "bold";
  herzy[i] = false;
  for (t = herzs[i]; t <= maxisize; t++)
    setTimeout(
      "herz[" + i + '].style.fontSize="' + t + 'px"',
      60 * (t - herzs[i])
    );
  setTimeout("herz[" + i + '].style.visibility="hidden";', 60 * (t - herzs[i]));
}

document.onmousemove = mouse;
document.addEventListener("touchmove", mouse);
function mouse(e) {
  if (e) {
    y = e.pageY;
    x = e.pageX;
  } else {
    set_scroll();
    y = event.y + sdown;
    x = event.x + sleft;
  }
}

window.onresize = set_width;
function set_width() {
  let sw_min = 999999;
  let sh_min = 999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth > 0)
      sw_min = document.documentElement.clientWidth;
    if (document.documentElement.clientHeight > 0)
      sh_min = document.documentElement.clientHeight;
  }
  if (typeof self.innerWidth == "number" && self.innerWidth) {
    if (self.innerWidth > 0 && self.innerWidth < sw_min)
      sw_min = self.innerWidth;
    if (self.innerHeight > 0 && self.innerHeight < sh_min)
      sh_min = self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min)
      sw_min = document.body.clientWidth;
    if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min)
      sh_min = document.body.clientHeight;
  }
  if (sw_min == 999999 || sh_min == 999999) {
    sw_min = 800;
    sh_min = 600;
  }
  swide = sw_min;
  shigh = sh_min;
}

window.onscroll = set_scroll;
function set_scroll() {
  if (typeof self.pageYOffset == "number") {
    sdown = self.pageYOffset;
    sleft = self.pageXOffset;
  } else if (
    document.body &&
    (document.body.scrollTop || document.body.scrollLeft)
  ) {
    sdown = document.body.scrollTop;
    sleft = document.body.scrollLeft;
  } else if (
    document.documentElement &&
    (document.documentElement.scrollTop || document.documentElement.scrollLeft)
  ) {
    sleft = document.documentElement.scrollLeft;
    sdown = document.documentElement.scrollTop;
  } else {
    sdown = 0;
    sleft = 0;
  }
}

function createDiv(height, width) {
  let div = document.createElement("div");
  div.style.position = "absolute";
  div.style.height = height;
  div.style.width = width;
  div.style.overflow = "hidden";
  div.style.backgroundColor = "transparent";
  return div;
}
