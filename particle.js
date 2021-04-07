function createParticle(px, py, vx, vy, m) {
  let particle = {
    pos: createVector(px, py),
    vel: createVector(vx, vy),
    r: radius,
    mass: m,
    draw: function() {
      push();
      let h = map(this.mass, min(pM), max(pM), 0, 180);
      //map mass to hue
      fill(h, 100, 100);
      translate(this.pos);
      circle(0, 0, 2 * this.r);
      //draw the particle
      if (debug) {
        line(0, 0, this.vel.x, this.vel.y);
        // draw velocity from position
      }
      pop();
    },
    update: function() {
      this.vel.y += g / fr;
      //update vel with gravity and euler integration
      if ((this.pos.x < radius && this.vel.x < 0) || (width - radius < this.pos.x && 0 < this.vel.x)) {
        this.vel.x *= -1
      }
      if ((this.pos.y < radius && this.vel.y < 0) || (height - radius < this.pos.y && 0 < this.vel.y)) {
        this.vel.y *= -1
      }
      //keeps the particle on screen
      
      this.pos.add(p5.Vector.div(this.vel, fr));
      //update pos with vel and euler integration
    }
  }
  return particle;
}

function collisionHandler() {
  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      //for each pair of particles
      let cDir = p5.Vector.sub(particles[j].pos, particles[i].pos);
      
      //check if the pair aren't intersecting or on top of eachother,
      if (cDir.magSq() >= 4 * (radius ** 2) || cDir.magSq() == 0) {
        //if this is true, ignore this pair
        continue;
      }
      cDir.setMag(1);
      let cSpeed = p5.Vector.dot(cDir, p5.Vector.sub(particles[i].vel, particles[j].vel));
      //if the particles will naturally seperate, ignore them.
      if (cSpeed < 0) {
        continue;
      }
      let impulse = 2 *
        cSpeed / (particles[i].mass + particles[j].mass);
      //calculate the new impact on the particles
      particles[i].vel.sub(cDir.setMag(impulse * particles[j].mass));
      particles[j].vel.add(cDir.setMag(impulse * particles[i].mass));
    }
  }
}
