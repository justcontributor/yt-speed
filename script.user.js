/*

MIT License

Copyright 2024 justcontributor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// ==UserScript==
// @name            More Variable YouTube Speed
// @namespace       https://github.com/justcontributor/yt-speed
// @homepageURL     https://github.com/justcontributor/yt-speed
// @supportURL      https://github.com/justcontributor/yt-speed/issues
// @updateURL       https://github.com/justcontributor/yt-speed/raw/main/script.user.js
// @downloadURL     https://github.com/justcontributor/yt-speed/raw/main/script.user.js
// @license         MIT
// @version         1.0
// @description:ko  Userscript that allows you to change the playback speed of YouTube videos more widely
// @description     유튜브 동영상의 재생속도를 더 폭넓게 변경할 수 있도록 하는 유저 스크립트
// @author          justcontributor
// @match           *://www.youtube.com/*
// @icon            https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant           none
// @run-at          document-start
// ==/UserScript==

let checkLoadInterval;
let rateLabel;
let rateLabelTimer;

(function () {
  "use strict";
  checkLoadInterval = setInterval(checkPlayerLoaded, 100);
  addKeyListener();
})();

function addKeyListener() {
  window.addEventListener(
    "keydown",
    (e) => {
      if (!e.shiftKey) return;

      const focus = e.target.tagName.toUpperCase();
      const typing =
        focus === "INPUT" ||
        focus === "TEXTAREA" ||
        e.target.getAttribute("contentEditable");
      
      if (typing) return;

      if (e.key === ">" || e.key === "<") {
        e.preventDefault();
        e.stopImmediatePropagation();
        sign = e.key === ">" ? 1 : -1;
        step =
          document.querySelector("video").playbackRate + sign * 0.25 > 2
            ? 0.5
            : 0.25;
        newRate = document.querySelector("video").playbackRate + step * sign;
        if (newRate > 16 || newRate < 0.25) {
          setRateLabelText(`브라우저의 속도 제한에 도달했습니다.`);
          showRateLabel();
          return;
        }
        document.querySelector("video").playbackRate = newRate;
        setRateLabelText(`${newRate}x`);
        showRateLabel();
      }
    },
    true
  );
}

function createRateLabel() {
  rateLabel = document.createElement("div");
  rateLabel.style.cssText = `
    left:50%;
    top:10%;
    transform:translate(-50%,0);
    text-align:center;
    background-color: rgba(0,0,0,0.5);
    display:inline-block;
    font-size:3rem;
    position:absolute;
    z-index:19;
    font-family "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
    color: #eee;
    direction: ltr;
    font-size: 175%;
    padding: 10px 20px;
    border-radius: 3px;
    line-height: 1.5;
    `;
  const playerContainer = document.getElementById("ytd-player");
  playerContainer.appendChild(rateLabel);
  console.log("[More Variable YouTube Speed] UserScript is Ready.");
}

function setRateLabelText(s) {
  rateLabel.innerText = s;
}

function checkPlayerLoaded() {
  const target = document.getElementById("ytd-player");
  if (target) {
    clearInterval(checkLoadInterval);
    createRateLabel();
  }
}

function showRateLabel() {
  rateLabel.style.setProperty("display", "inline", "important");
  if (rateLabelTimer) clearTimeout(rateLabelTimer);
  rateLabelTimer = setTimeout(() => {
    rateLabel.style.setProperty("display", "none", "important");
  }, 500);
}
