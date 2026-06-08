(function() {
  function init() {
    const wrapper = document.getElementById('photo-fluid-wrapper');
    if (!wrapper) return;

    const W = 300, H = 300;

    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    canvas.style.cssText = 'width:100%;height:100%;display:block;border-radius:16px;';
    wrapper.appendChild(canvas);

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) { wrapper.style.display = 'none'; return; }

    const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_base;
      uniform sampler2D u_hover;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_presence;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
        vec2 uv = v_uv;
        uv.y = 1.0 - uv.y;

        float pixelSize = 0.045;
        vec2 pixelUV = floor(uv / pixelSize) * pixelSize;
        vec2 pixelCenter = pixelUV + pixelSize * 0.5;

        vec2 mouse = vec2(u_mouse.x, 1.0 - u_mouse.y);

        float dist = length(pixelCenter - mouse);

        float h = hash(pixelUV);
        float delay = h * 0.4;

        float wave = u_presence - dist * 1.2 - delay;
        float switched = step(0.0, wave);

        vec2 texUV = uv;
        vec4 base  = texture2D(u_base,  texUV);
        vec4 hover = texture2D(u_hover, texUV);

        gl_FragColor = mix(base, hover, switched);
      }
    `;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uMouse    = gl.getUniformLocation(prog, 'u_mouse');
    const uTime     = gl.getUniformLocation(prog, 'u_time');
    const uPresence = gl.getUniformLocation(prog, 'u_presence');
    const uBase     = gl.getUniformLocation(prog, 'u_base');
    const uHover    = gl.getUniformLocation(prog, 'u_hover');

    function loadTex(url, unit) {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0,0,0,255]));
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      };
      img.src = url;
      return tex;
    }

    loadTex('/data/me.jpg', 0);
    loadTex('/data/me2.png', 1);
    gl.uniform1i(uBase, 0);
    gl.uniform1i(uHover, 1);

    let mouse = { x: 0.5, y: 0.5 };
    let targetMouse = { x: -1, y: -1 };
    let presence = 1;

    const rect = () => canvas.getBoundingClientRect();

    canvas.addEventListener('mousemove', e => {
      const r = rect();
      targetMouse.x = (e.clientX - r.left) / r.width;
      targetMouse.y = (e.clientY - r.top)  / r.height;
    });

    canvas.addEventListener('mouseleave', () => {
      targetMouse.x = -1;
    });

    let start = null;
    function frame(ts) {
      if (!start) start = ts;
      const t = (ts - start) / 1000;

      const ambientX = 0.5 + Math.sin(t * 0.35) * 0.55 + Math.sin(t * 0.13) * 0.15;
      const ambientY = 0.5 + Math.cos(t * 0.28) * 0.50 + Math.cos(t * 0.19) * 0.12;

      if (targetMouse.x < 0) {
        mouse.x += (ambientX - mouse.x) * 0.03;
        mouse.y += (ambientY - mouse.y) * 0.03;
      } else {
        mouse.x += (targetMouse.x - mouse.x) * 0.12;
        mouse.y += (targetMouse.y - mouse.y) * 0.12;
      }

      gl.viewport(0, 0, W, H);
      gl.uniform2f(uMouse, mouse.x, mouse.y);

      gl.uniform1f(uTime, t);
      gl.uniform1f(uPresence, presence);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
