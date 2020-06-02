// Author @patriciogv - 2015
// Title: DeFrag

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e6); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x*2.0/u_resolution.y*2.0;

    vec2 grid = vec2(40.0,40.0);
    st *= grid;

    vec2 ipos = floor(st);

    vec2 vel = floor(vec2(u_time*15.));
    vel *= vec2(-1.,0.);

    vel *= (step(1., mod(ipos.y,2.0))-0.5)*2.;
    vel *= random(ipos.y);

    float totalCells = grid.x*grid.y;
    float t = mod(u_time*max(grid.x,grid.y)+floor(1.0+u_time),totalCells);
    vec2 head = vec2(mod(t,grid.x), floor(t/grid.x));

    vec2 offset = vec2(0.1,0.);

    vec3 color = vec3(1.0);
    color *= step(grid.y-head.y,ipos.y);
    color += (20.0-step(head.x,ipos.x))*step(grid.y-head.y,ipos.y+1.);
    color = clamp(color,vec3(0.),vec3(1.));

    color.r *= random(floor(st));
    color.g *= random(floor(st));
    color.b *= random(floor(st));

    color = smoothstep(0.,.5+0.1/u_resolution.x*.5,color*color);
    color = step(0.5+0.1/u_resolution.x*0.5,color);

    color *= step(.1,fract(st.x*vel.x))*step(.1,fract(st.y+vel.y));

    gl_FragColor = vec4(1.0*color,1.0);
}
