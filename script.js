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
// @name         More Variable YouTube Speed
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  설명.
// @author       justcontributor
// @match        *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";
  console.log("[More Variable YouTube Speed] UserScript is Running...");
  ["keydown", "keyup"].forEach((eventName) => {
    window.addEventListener(
      eventName,
      (event) => {
        if (!event.shiftKey) {
          return;
        }
        if (event.key === "<") {
          event.preventDefault();
          event.stopImmediatePropagation();
          document.querySelector("video").playbackRate -= 0.25;
          console.log(document.querySelector("video").playbackRate);
        } else if (event.key === ">") {
          event.preventDefault();
          event.stopImmediatePropagation();
          document.querySelector("video").playbackRate += 0.25;
          console.log(document.querySelector("video").playbackRate);
        }
      },
      true
    );
  });
})();
