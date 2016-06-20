
const rtt = require('gl-rtt')

const fragmentShader = `
precision mediump float;
uniform sampler2D src_texture;
varying vec2 uv;

void main() {
	gl_FragColor = texture2D(src_texture, uv);
}`
module.exports = function(src){
	function drawCb(gl, shader, defaultCb) {
		shader.uniforms.src_texture = src.bind(0);
		defaultCb()
	}
	let rttHandle = rtt.create(src.gl, src.shape, fragmentShader, {drawCb: drawCb});
	rttHandle.run();

	let result = rttHandle.fbo.color[0];
	//TODO clean up useless FBO, etc.
	return result;
}
