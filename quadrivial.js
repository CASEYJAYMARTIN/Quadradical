(function() {

  var Quadradical = {

    createCSS: function () {
      var style = document.createElement('style');

      style.innerHTML =
        '.q-ui {' +
          'bottom: 48px;' +
          'font-family: courier;' +
          'font-weight: bold;' +
          'position: fixed;' +
          'right: 48px;' +
          'z-index: 999999997' +
        '}' +
        '.q-ui * {' +
          'box-sizing: border-box;' +
        '}' +
        '.q-ui label {' +
          'background:' +
            "url('data:image/svg+xml;utf8," +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,11,11">' +
              '<path d="M11,11L5,11A5,5,0,0,1,0,6L0,5A5,5,0,0,1,5,0L6,0A5,5,0,0,1,11,5ZM10,6L10,5A4,4,0,0,0,6,1L5,1' +
              'A4,4,0,0,0,1,5L1,6A4,4,0,0,0,5,10L6,10L6,9L5,9A3,3,0,0,1,2,6L2,5A3,3,0,0,1,5,2L6,2A3,3,0,0,1,9,5' +
              'L9,6M8,6L8,5A2,2,0,0,0,6,3L5,3A2,2,0,0,0,3,5L3,6A2,2,0,0,0,5,8L6,8L6,7L5,7A1,1,0,0,1,4,6L4,5' +
              'A1,1,0,0,1,5,4L6,4A1,1,0,0,1,7,5L7,6M6,6L6,5L5,5L5,6ZM7,7L7,8L8,8L8,7ZM7,9L7,10L8,10L8,9ZM9,9L9,10' +
              'L10,10L10,9ZM9,7L9,8L10,8L10,7Z"/>' +
            '</svg>' +
            "');" +
          'bottom: 0;' +
          'display: inline-block;' +
          'height: 54px;' +
          'position: absolute;' +
          'right: 0;' +
          'width: 54px;' +
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
          'border: 1px solid black;' +
          'height: 54px;' +
          'line-height: 27px;' +
          'padding: 0 0 0 9px;' +
          'position: relative;' +
          'width: 144px;' +
          'z-index: 999999998' +
        '}' +
        '.q-ui .control {' +
          'border: none;' +
          'width: 54px;' +
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