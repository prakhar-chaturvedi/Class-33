class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("sprites/bird.png");
    this.image10 = loadImage("sprites/smoke.png");
    this.trajectory = [];
    this.visibility = 255 ;
    }

  display() {
    push();
    super.display();
    if(this.body.velocity.x > 10 && this.body.position.x > 260){
      var pos = [this.body.position.x, this.body.position.y];
     this.trajectory.push(pos);
    }
    for(var i = 0 ; i < this.trajectory.length ; i++ ){
      push();
      this.visibility = this.visibility-5;
      tint(255, this.visibility);
      image(this.image10, this.trajectory[i][0], this.trajectory[i][1]);
      pop();
    }
    pop();
  }
}
