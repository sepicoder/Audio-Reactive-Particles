// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
      constructor(){
        this.x = random(0,width);
        this.y = random(0,height);
        this.r = random(4,30);
        this.changeSpeed();
        this.randomColor();
      }
    
    // creation of a particle.
      draw(size) {
        noStroke();
        // fill(this.r, this.g, this.b, this.a);
        fill(200, 100, 0)
        circle(this.x,this.y,size*random(0,5));
      }
  
      randomColor() {
        this.r = random(255); 
        this.g = random(0,200);
        this.b = random(0,255); 
        this.a = random(100,255);
      }
  
      changeSpeed() {
        this.xSpeed = random(-2,2);
        this.ySpeed = random(-1,1.5);
      }
    
    // setting the particle in motion.
      moveParticle() {
        if(this.x < 0 || this.x > width)
          this.xSpeed*=-1;
        if(this.y < 0 || this.y > height)
          this.ySpeed*=-1;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    
    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
      joinParticles(particles) {
        particles.forEach(element =>{
          let dis = dist(this.x,this.y,element.x,element.y);
          if(dis<85) {
            stroke('rgba(225,225,255,0.04)');
            line(this.x,this.y,element.x,element.y);
          }
        });
      }
    }
    
    // an array to add multiple particles
    let particles = [];
    let mic, fft;
    let input = null;
    let analyzer;
    // let r, g, b, a;
  
    function setup() {
      createCanvas(windowWidth, windowHeight);
      // mic = new p5.AudioIn();
      // mic.start();
      // fft = new p5.FFT();
      // fft.setInput(mic);
        // Creating an Audio input
      // input = new p5.AudioIn();
      // input.start();
      
      for(let i = 0;i<width/10;i++){
        particles.push(new Particle());
        console.log("new particle");
      }
       initAudio();
    }
    
    function draw() {
      background('#0f0f0f');
        // Get the overall volume (between 0 and 1)\
        if(input){
      let volume = input.getLevel();
      fill(255,10,30);
      rect(10, 10, 40,volume * height);
      // If the volume > 0.5,  a rect is drawn at a random location.
      // The louder the volume, the larger the rectangle.
      let threshold = 0.01;
      // console.log("volume is ", volume);
  
      
        if (particles) {
        // particles.push(new Particle());
          for(let i = 0;i<particles.length;i++) {
            if (volume > threshold) {
              // particles[i].changeSpeed();
              // particles[i].randomColor();
            }
        particles[i].draw(volume*50);
          // particles[i].circle(random(x),y*2,random(r));
          particles[i].moveParticle();
          particles[i].joinParticles(particles.slice(i));
        }
      }
      fill(255,200,10);
      text('volume: '+ volume, 10, 60); 
    }
      // else if (volume > threshold && volume < 0.2)  {
      //   for(let i = 0;i<particles.length;i++) {
      //    particles[i].moveParticle();
      //   }
      // }
      // else {
      //   for(let i = 0;i<particles.length;i++) {
      //     particles[i].joinParticles(particles.slice(i));
      //   }
      // }
      // let spectrum = fft.analyze();
    }
  
    function initAudio(){
      input = new p5.AudioIn();
      input.start();
      console.log("audioInit");
    }
  
    function mousePressed() {
      initAudio();
    }