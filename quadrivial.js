(function() {

  var Quadradical = {

    createCSS: function () {
      var style = document.createElement('style');

      style.innerHTML =
        '.q-ui {' +
          'bottom: 24px;' +
          'font-family: courier;' +
          'font-weight: bold;' +
          'position: fixed;' +
          'right: 24px;' +
          'z-index: 999999997' +
        '}' +
        '.q-ui * {' +
          'box-sizing: border-box;' +
        '}' +
        '.q-ui label {' +
          'background:' +
            "url('data:image/svg+xml;utf8," +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,24,24"><defs><linearGradient id="g" x2="0%" y2="100%"><stop offset="0%" stop-color="#008040"/><stop offset="20%" stop-color="#007F80"/><stop offset="40%" stop-color="#004080"/><stop offset="80%" stop-color="#000080"/><stop offset="100%" stop-color="#400080"/></linearGradient></defs><path d="M14.875,23.5L14.875,12A2.875,2.875,0,1,0,12,14.875L23.5,14.875M17.75,23.5L17.75,12A5.75,5.75,0,1,0,12,17.75L23.5,17.75M20.625,23.5L20.625,12A8.625,8.625,0,1,0,12,20.625L23.5,20.625M23.5,23.5L23.5,12A11.5,11.5,0,1,0,12,23.5Z" fill="transparent" stroke="url(#g)"/></svg>' +
            "');" +
          'bottom: 0;' +
          'cursor: pointer;' +  
          'display: inline-block;' +
          'height: 48px;' +
          'position: absolute;' +
          'right: 0;' +
          'width: 48px;' +
          'z-index: 999999999;' +
        '}' +
        '.q-ui .q-checkbox {' +
          'bottom: 0;' +
          'margin: 0;' +
          'opacity: 0;' +
          'position: absolute;' +
          'right: 0;' +
        '}' +
        '.q-ui .q-grid {' +
          'height: 100vh;' +
          'left: 0;' +
          'opacity: 0.5;' +
          'pointer-events: none;' +
          'position: fixed;' +
          'top: 0;' +
          'width: 100vw;' +
          'z-index: 999999996' +
        '}' +
        '.q-ui .controls {' +
          'background: white;' +
          'height: 48px;' +
          'line-height: 24px;' +
          'padding: 0 0 0 8px;' +
          'position: relative;' +
          'width: 144px;' +
          'z-index: 999999998' +
        '}' +
        '.q-ui .control {' +
          'border: none;' +
          'padding: 0;' +
          'line-height: 24px;' +
          'width: 48px;' +
        '}' +
        '.q-ui .q-checkbox ~ div {' +
          'display: none;' +
        '}' +
        '.q-ui .q-checkbox:checked ~ div {' +
          'display: inline-block;' +
        '}';

      return style;
    },

    createEventListeners: function () {
      document.getElementById('qX').addEventListener('click', this.updateX);
      document.getElementById('qY').addEventListener('click', this.updateY);
    },

    createGrid: function (x, y) {
      var div = document.createElement('div');

      div.id = 'qGrid';
      div.className = 'q-grid';
      div.style.background = (function () {
        return "url('data:image/svg+xml;utf8," + Quadradical.createSVG(x, y).outerHTML + "')";
      })();

      return div;
    },

    createPath: function (x, y) {
      var path = document.createElement('path');

      path.setAttribute('d',
        'M0,0' +
        'L' + x + ',' + 0 +
        'L' + x + ',' + y +
        'L' + ( x - 1 ) + ',' + y +
        'L' + ( x - 1 ) + ',' + 1 +
        'L0,1Z');

      return path;
    },

    createUI: function () {
      var UI = document.createElement('div');

      UI.className = 'q-ui';
      UI.innerHTML =
        "<label for='qCheckbox'></label>" +
        "<input class='q-checkbox' id='qCheckbox' type='checkbox'/>" +
        "<div class='controls'>" +
          "<div>X: <input class='control' id='qX' type='number' value='9'></div>" +
          "<div>Y: <input class='control' id='qY' type='number' value='9'></div>" +
        "</div>" +
        this.createGrid(9, 9).outerHTML;

      return UI;
    },

    createSVG: function (x, y) {
      var svg = document.createElement('svg');

      svg.appendChild(this.createPath(x, y));
      svg.setAttribute('height', y);
      svg.setAttribute('viewBox', '0,0,' + x + ',' + y);
      svg.setAttribute('width', x);
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      return svg;
    },

    initialize: function () {
      document.head.appendChild(this.createCSS());
      document.body.appendChild(this.createUI());
      this.createEventListeners();
    },

    updateX: function (event) {
      var y = document.getElementById('qY').value;

      document.getElementById('qGrid').style.background = (function () {
        return  "url('data:image/svg+xml;utf8," +
                Quadradical.createSVG(event.target.value, y).outerHTML +
                "')";
      })();
    },

    updateY: function (event) {
      var x = document.getElementById('qX').value;

      document.getElementById('qGrid').style.background = (function () {
        return  "url('data:image/svg+xml;utf8," +
                Quadradical.createSVG(x, event.target.value).outerHTML +
                "')";
      })();
    }

  };

  Quadradical.initialize();

})();
