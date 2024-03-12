precision highp float;
varying vec2 uv;
uniform float time;

float smin(float a, float b, float k) {
  float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
  return mix( b, a, h ) - k*h*(1.0-h);
}
float sdSphere(vec3 p, float s) {
  return length(p) - s;
}
float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}
float sdBox(vec3 p, vec3 b) {
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}
vec3 opRep(inout vec3 p, vec3 c) {
  vec3 m = mod(p, c);
  vec3 id = (p - m) / c;
  p = m - 0.5 * c;
  return id;
}

vec2 scene (vec3 p) {
  p.x += time;
  vec3 id = opRep(p, vec3(2.0, 14.0, 4.0));
  p.y += 0.5 + 0.5 * cos(4.3 * (id.x + time) + 1.3 * (id.z + time));
  float rot = time + cos(30.0 * id.x + 123.4 * id.z);
  p.xz *= mat2(
    cos(rot), sin(rot),
    -sin(rot), cos(rot)
  );
  float r = smin(
    mix(sdSphere(p, 0.7), sdBox(p, vec3(0.7)), 0.5 + 0.5 * cos(time + id.x)),
    sdTorus(p.xzy - vec3(0.0, 0.7, 0.0), vec2(0.2, 0.08)),
    0.1
  );
  return vec2(r, id.x);
}
vec3 normal(vec3 p, float smoothness) {
  vec3 n;
  vec2 dn = vec2(smoothness, 0.0);
