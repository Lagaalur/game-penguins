const config = {
    type: Phaser.AUTO,
    //width: 1200,
    //height: 600,
    //backgroundColor: '#87CEEB',

    input: {
	activePointers: 10 },
	//pixelArt: true,

scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 400
    },

    backgroundColor: '#87CEEB',



   physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900},
            debug: false
		   //  debug: true
			
        }
    },

    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

let lastArrowFrame = -1;
let player;
let ground;
let obstacles;
let obstacles2;
let obstacles3;
let obstacles4;
let obstacles5;
let cursors;
let keyA;
let keyB;
let score = 0;
let scoreText;
let gameOver = false;
let gameStarted = false;
let startText;
let titleText;
let shadow;
let shadow2;
let shadow3;
let shadow4;
let shadow5;
let obs;
let obs2;
let obs3;
let obs4;
let obs5;
let arrow;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let buttonsa;
let buttonsb;
let buttonsc;
let buttonsd;
let btnsa;
let btnsb;
let btnsc;
let btnsd;
let speed=0;
// ================= PRELOAD =================


function preload() {

    // PASTIKAN FILE ADA
    // project folder:
    // index.html
    // game.js
    // assets/player.png
	
	
	
	this.load.image('view', 'assets/view.png')

    this.load.spritesheet('player', 'assets/player.png', {
        frameWidth: 80,
        frameHeight: 80
    });
	
	
	this.load.spritesheet('obstacle2', 'assets/obstacle2.png', {
        frameWidth: 192,
        frameHeight: 192
    });
	
	this.load.spritesheet('obstacle', 'assets/obstacle.png', {
    frameWidth: 192,
    frameHeight: 192
    });

	
	 this.load.spritesheet('arrow', 'assets/arrow.png', {
        frameWidth: 288,
        frameHeight: 288
    });
	
	
	this.load.spritesheet('button', 'assets/button.png', {
        frameWidth: 128,
        frameHeight: 120
    });
	
	
	
	

}

// ================= CREATE =================


function create() {
	
	
	//let bg = this.add.image(700, 300, 'view');.setOrigin(0, 0);
	let bg = this.add.image(0, 0, 'view').setOrigin(0, 0);
	
	bg.setDisplaySize(
        this.scale.width,
        this.scale.height
    );
       

    score = 0;
    gameOver = false;
    gameStarted = false;
	
	
	
   // this.scale.width * 0.1,   // 10% dari kiri
   // this.scale.height * 0.7,  // 70% dari atas (dekat ground)
   
	

    titleText = this.add.text(this.scale.width * 0.5, this.scale.height * 0.15, "Penguins but why", {
        //fontSize: "80px",
        fill: "#66CCFF",
        //fontStyle: "bold"
		
		fontFamily: "Arial",
        fontSize: "50px",
        //fill: "#AEEFFF",
        fontStyle: "bold",
        stroke: "#003344",
        strokeThickness: 6,

    shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 4,
        fill: true
	
		    }
		
		
    }).setOrigin(0.5);

    startText = this.add.text(this.scale.width * 0.5, this.scale.height * 0.25, "Press 'A' to Start", {
        fontSize: "15px",
        //fill: "#00ffcc"
		//fill: "#66CCFF",
        //fontStyle: "bold"
		
		fontFamily: "Arial",
        fill: "#AEEFFF",
        fontStyle: "bold",
        stroke: "#003344",
        strokeThickness: 6,

    shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 4,
        fill: true
	
		    }
			
    }).setOrigin(0.5);

    // ===== GROUND =====
	
   // ground = this.physics.add.staticGroup();

    ////let floor = this.add.rectangle(400, 490, 1800, 40, 0x654321);
   // this.physics.add.existing(floor, true);
   //// ground.add(floor);
	//floor.setVisible(false);




ground = this.physics.add.staticGroup();

let floor = this.add.rectangle(
    this.scale.width / 2,          // Tengah horizontal
    this.scale.height - 100,        // Agak bawah (20 px dari bawah)
    this.scale.width,              // Full lebar layar
    10,                            // Tebal ground
    0x654321
);

this.physics.add.existing(floor, true);
ground.add(floor);

floor.setVisible(false);


   // Button

arrow = this.add.sprite(
this.scale.width * 0.85,
this.scale.height * 0.74,
'arrow'
);
arrow.setScale(0.6);
arrow.setFrame(1);
arrow.setDepth(1000);



	let leftZone = this.add.zone(arrow.x - 80, arrow.y-30, 58, 60).setOrigin(0,0).setInteractive();
    let rightZone = this.add.zone(arrow.x + 31, arrow.y-30, 51, 60).setOrigin(0,0).setInteractive();
    let upZone = this.add.zone(arrow.x-30, arrow.y - 80, 58, 60).setOrigin(0,0).setInteractive();
   // let downZone = this.add.zone(arrow.x, arrow.y + 50, 100, 50).setOrigin(0,0).setInteractive();


     // event untuk update flag
    leftZone.on('pointerdown', () => { leftPressed = true; });
    leftZone.on('pointerup', () => { leftPressed = false; });
	leftZone.on('pointerout', () => { leftPressed = false; });
	leftZone.on('pointercancel', () => { leftPressed = false; });

    rightZone.on('pointerdown', () => { rightPressed = true; });
    rightZone.on('pointerup', () => { rightPressed = false; });
	rightZone.on('pointerout', () => { rightPressed = false; });
	rightZone.on('pointercancel', () => { rightPressed = false; });

    upZone.on('pointerdown', () => { upPressed = true; });
    upZone.on('pointerup', () => { upPressed = false; });
	upZone.on('pointerout', () => { upPressed = false; });
	upZone.on('pointercancel', () => { upPressed = false; });

  /*downZone.on('pointerdown', () => { downPressed = true; });
    downZone.on('pointerup', () => { downPressed = false; });
	downZone.on('pointerout', () => { downPressed = false; });
	downZone.on('pointercancel', () => { downPressed = false; }); 

    // optional: enable multi-touch
    //this.input.addPointer(2);
*/

/*
buttonsa = this.add.sprite(
    this.scale.width * 0.1,
    this.scale.height * 0.75,
    'button'
);
buttonsa.setScale(0.4);
buttonsa.setFrame(3);
buttonsa.setDepth(1000);


buttonsb = this.add.sprite(
    this.scale.width * 0.18,
    this.scale.height * 0.75,
    'button'
);
buttonsb.setScale(0.4);
buttonsb.setFrame(2);
buttonsb.setDepth(4000);
*/

buttonsc = this.add.sprite(
    this.scale.width * 0.16,
    this.scale.height * 0.85,
    'button'
);
buttonsc.setScale(0.7);
buttonsc.setFrame(5);
buttonsc.setDepth(1000);


buttonsd = this.add.sprite(
    this.scale.width * 0.1,
    this.scale.height * 0.70,
    'button'
);
buttonsd.setScale(0.7);
buttonsd.setFrame(4);
buttonsd.setDepth(1000);


//buttonsa.setInteractive();
//buttonsb.setInteractive();
buttonsc.setInteractive();
buttonsd.setInteractive();
/*
buttonsa.on('pointerdown', () => {btnsa = true;});
buttonsa.on('pointerup', () => {btnsa = false;});
buttonsa.on('pointerout', () => { btnsa = false; });
buttonsa.on('pointercancel', () => { btnsa = false; });
  
  
buttonsb.on('pointerdown', () => {btnsb = true;});
buttonsb.on('pointerup', () => {btnsb = false;});
buttonsb.on('pointerout', () => { btnsb = false; });
buttonsb.on('pointercancel', () => { btnsb = false; });
//buttonsb.on('pointerover', () => { btnsb = true; });
*/

buttonsc.on('pointerdown', () => {btnsc = true;});
buttonsc.on('pointerup', () => {btnsc = false;});
buttonsc.on('pointerout', () => { btnsc = false; });
buttonsc.on('pointercancel', () => { btnsc = false; });


buttonsd.on('pointerdown', () => {btnsd = true;});
buttonsd.on('pointerup', () => {btnsd = false;});
buttonsd.on('pointerout', () => { btnsd = false; });
buttonsd.on('pointercancel', () => { btnsd = false; });



this.input.addPointer(10);


    // ===== PLAYER =====
	
     //player = this.physics.add.sprite(100, 200, 'player');
	 //player = this.physics.add.sprite(this.scale.height - 300, this.scale.width - 100, 'player');
	player = this.physics.add.sprite(
    this.scale.width * 0.1,   // 10% dari kiri
    this.scale.height * 0.2,  // 70% dari atas (dekat ground)
    'player'
);


	
	
	
    player.setScale(1);
	
	player.setSize(40,60);
	player.setOffset(20,20);
	
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, ground);
	
	 shadow = this.add.ellipse(player.x, ground.y +100 , 50,5, 0x000000, 0.3);

	

    // ===== ANIMATION =====
	
	
	
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('player', {
            start: 26,
            end: 29
        }),
        frameRate: 10,
        repeat: -1
    });





this.anims.create({
    key: 'obstacleMove',
    frames: this.anims.generateFrameNumbers('obstacle', {
        start: 4,
        end: 6
    }),
    frameRate: 5,
    repeat: -1
});




this.anims.create({
    key: 'rudalMove',
    frames: this.anims.generateFrameNumbers('obstacle2', {
        start: 5,
        end: 7
    }),
    frameRate: 5,
    repeat: -1
});



this.anims.create({
    key: 'rudal',
    frames: this.anims.generateFrameNumbers('obstacle2', {
        start: 8,
        end: 12
    }),
    frameRate: 5,
    repeat: 0
});




this.anims.create({
    key: 'obstacleMove2',
    frames: this.anims.generateFrameNumbers('obstacle', {
        frames : [14,15,16,17,18,0]
    }),
    frameRate: 5,
    repeat: 0
});


/*
this.anims.create({
    key: 'die',
    frames: this.anims.generateFrameNumbers('player', {
        start: 18,
        end: 18
    }),
	
    frameRate: 10,
    repeat: -1
});

*/


this.anims.create({
    key: 'die',
    frames: [{ key: 'player', frame: 18 }],
    frameRate: 10,
    repeat: -1
});








this.anims.create({
        key: 'arrow',
        frames: this.anims.generateFrameNumbers('arrow', {
            start: 0,
            end: 4
        }),
        frameRate: 10,
        repeat: -1
    });



    // ===== OBSTACLES =====//musuhh/rintangan
	
	//sample
	
   // obstacles = this.physics.add.sprite(500, 200, 'obstacle');//inii penting
   // obstacles.setScale(2);
    //obstacles.setCollideWorldBounds(true);

    //this.physics.add.collider(obstacles, ground);
	
	//
	
	
   // GROUP OBSTACLE
obstacles = this.physics.add.group();

// COLLIDER PLAYER vs OBSTACLE
this.physics.add.collider(player, obstacles, (playerObj, obstacleObj) => {

    if (obstacleObj.hitTriggered) return;

    obstacleObj.hitTriggered = true;

    obstacleObj.setVelocity(0, 0);
    obstacleObj.body.enable = false;

    obstacleObj.anims.play('obstacleMove2', true);
	obstacleObj.scene.time.delayedCall(300, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj.destroy();

    });

    //gameOver = true;
    //scoreText.setText("He died - Score: " + score + " (Press R)");

});

// COLLIDER OBSTACLE vs GROUND
this.physics.add.collider(obstacles, ground, (obstacleObj) => {

    if (obstacleObj.hitTriggered) return;

    obstacleObj.hitTriggered = true;

    obstacleObj.setVelocity(0, 0);
    obstacleObj.body.enable = false;

    obstacleObj.anims.play('obstacleMove2', true);
	
	
	obstacleObj.scene.time.delayedCall(300, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj.destroy();

    });

});







obstacles2 = this.physics.add.group();

// COLLIDER PLAYER vs OBSTACLE
this.physics.add.collider(player, obstacles2, (playerObj2, obstacleObj2) => {

    if (obstacleObj2.hitTriggered) return;

    obstacleObj2.hitTriggered = true;

    obstacleObj2.setVelocity(0, 0);
    obstacleObj2.body.enable = false;

    obstacleObj2.anims.play('obstacleMove2', true);
	
	obstacleObj2.scene.time.delayedCall(300, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj2.destroy();

    });

    //gameOver = true;
    //scoreText.setText("He died - Score: " + score + " (Press R!)");

});

// COLLIDER OBSTACLE vs GROUND
this.physics.add.collider(obstacles2, ground, (obstacleObj2) => {

    if (obstacleObj2.hitTriggered) return;

    obstacleObj2.hitTriggered = true;

    obstacleObj2.setVelocity(0, 0);
    obstacleObj2.body.enable = false;

    obstacleObj2.anims.play('obstacleMove2', true);
	
	obstacleObj2.scene.time.delayedCall(300, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj2.destroy();

    });

});




 // GROUP OBSTACLE
obstacles4 = this.physics.add.group();

// COLLIDER PLAYER vs OBSTACLE
this.physics.add.collider(player, obstacles4, (playerObj4, obstacleObj4) => {

    if (obstacleObj4.hitTriggered) return;

    obstacleObj4.hitTriggered = true;

    obstacleObj4.setVelocity(0, 0);
    obstacleObj4.body.enable = false;

    obstacleObj4.anims.play('rudal', true);
	
	 obstacleObj4.scene.time.delayedCall(300, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj4.destroy();

    });

    //gameOver = true;
    //scoreText.setText("He died - Score: " + score + " (Press R)");

});

// COLLIDER OBSTACLE vs GROUND
this.physics.add.collider(obstacles4, ground, (obstacleObj4a) => {

    if (obstacleObj4a.hitTriggered) return;

    obstacleObj4a.hitTriggered = true;

    obstacleObj4a.setVelocity(0, 0);
    obstacleObj4a.body.enable = false;

    obstacleObj4a.anims.play('rudal', true);
	
	
	obstacleObj4a.scene.time.delayedCall(300, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj4a.destroy();

    });
	
	

});


// GROUP OBSTACLE
obstacles5 = this.physics.add.group();

// COLLIDER PLAYER vs OBSTACLE
this.physics.add.collider(player, obstacles5, (playerObj5, obstacleObj5) => {

    if (obstacleObj5.hitTriggered) return;

    obstacleObj5.hitTriggered = true;

    obstacleObj5.setVelocity(0, 0);
    obstacleObj5.body.enable = false;

    obstacleObj5.anims.play('rudal', true);
	
	 obstacleObj5.scene.time.delayedCall(300, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj5.destroy();

    });

    //gameOver = true;
    //scoreText.setText("He died - Score: " + score + " (Press O)");

});

// COLLIDER OBSTACLE vs GROUND
this.physics.add.collider(obstacles5, ground, (obstacleObj5a) => {

    if (obstacleObj5a.hitTriggered) return;

    obstacleObj5a.hitTriggered = true;

    obstacleObj5a.setVelocity(0, 0);
    obstacleObj5a.body.enable = false;

    obstacleObj5a.anims.play('rudal', true);
	
	
	obstacleObj5a.scene.time.delayedCall(300, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj5a.destroy();
		
		 });

});









obstacles3 = this.physics.add.group();
  
	//shadow2 = this.add.ellipse(obstacles, ground.y +30 , 50,5, 0x000000, 0.3); 
	
    this.physics.add.collider(obstacles2, obstacles3, (Obj2, obstacleObj3) => {
		
		
		if (obstacleObj3.hitTriggered) return;

        obstacleObj3.hitTriggered = true;

        obstacleObj3.setVelocity(0, 0);
        obstacleObj3.body.enable = false;

        obstacleObj3.anims.play('die', true);
		//obstacleObj3.setFrame(18);
        obstacleObj3.setCrop(2, 0, 78, 80); 

		obstacleObj3.scene.time.delayedCall(6000, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj3.destroy();
		
		});
		

		//obstacleObj.setSize(50,50);
	    //obstacleObj.setOffset(70,90);
	    //obstacleObj3.setScale(1);
		//shadow2 = this.add.ellipse(); 
        //gameOver = true;
		
		//player.setVelocityX(-700);
		//obstacleObj.setVelocityX(0);
		//obstacleObj.anims.play('obstacleMove2', false);
		//scoreText.setText("He died - Score: " + score + " (Press R)");
		//this.physics.pause();
		
		
    });




     this.physics.add.collider(obstacles, obstacles3, (Obj, obstacleObj3b) => {
		
		
		if (obstacleObj3b.hitTriggered) return;

        obstacleObj3b.hitTriggered = true;

        obstacleObj3b.setVelocity(0, 0);
        obstacleObj3b.body.enable = false;

        obstacleObj3b.anims.play('die', true);
		//obstacleObj3b.setFrame(18);
         obstacleObj3b.setCrop(2, 0, 78, 80);  

		obstacleObj3b.scene.time.delayedCall(6000, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj3b.destroy();
		
		});
		
		
		

		//obstacleObj.setSize(50,50);
	    //obstacleObj.setOffset(70,90);
	    //obstacleObj3.setScale(1);
		//shadow2 = this.add.ellipse(); 
        //gameOver = true;
		
		//player.setVelocityX(-700);
		//obstacleObj.setVelocityX(0);
		//obstacleObj.anims.play('obstacleMove2', false);
		//scoreText.setText("He died - Score: " + score + " (Press B)");
		//this.physics.pause();
		
		
    });





this.physics.add.collider(obstacles4, obstacles3, (Objj, obstacleObj3c) => {
		
		
		if (obstacleObj3c.hitTriggered) return;

        obstacleObj3c.hitTriggered = true;

        obstacleObj3c.setVelocity(0, 0);
        obstacleObj3c.body.enable = false;

        obstacleObj3c.anims.play('die', true);
		 //obstacleObj3c.setFrame(18);
         obstacleObj3c.setCrop(2, 0, 78, 80); 
		
		obstacleObj3c.scene.time.delayedCall(6000, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj3c.destroy();
		
		});

					
		
    });



this.physics.add.collider(obstacles5, obstacles3, (Objja, obstacleObj3d) => {
		
		
		if (obstacleObj3d.hitTriggered) return;

        obstacleObj3d.hitTriggered = true;

        obstacleObj3d.setVelocity(0, 0);
        obstacleObj3d.body.enable = false;

        obstacleObj3d.anims.play('die', true);
		//obstacleObj3d.setFrame(18);
         obstacleObj3d.setCrop(2, 0, 78, 80);  

		obstacleObj3d.scene.time.delayedCall(6000, () => {

        //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

        obstacleObj3d.destroy();
		
		});			
		
    });





    // ===== SCORE =====
	
	
	
	
    scoreText = this.add.text(this.scale.width * 0.01, this.scale.height * 0.005, "Score =  0", {
        fontSize: "20px",
        //fontSize: "22px",
        //fill: "#00ffcc"
		//fill: "#66CCFF",
        //fontStyle: "bold"
		
		fontFamily: "Arial",
        fill: "#AEEFFF",
        fontStyle: "bold",
        stroke: "#003344",
        strokeThickness: 6,

    shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 4,
        fill: true }
    });

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            if (!gameOver && gameStarted) {
                score++;
                scoreText.setText("Score: " + score);
            }
        },
        loop: true
    });

    // ===== KEYBOARD =====
	
	
    cursors = this.input.keyboard.createCursorKeys();
    keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	 
	
	this.input.keyboard.removeAllListeners();
    this.input.keyboard.disableGlobalCapture();
}

// ================= SPAWN OBSTACLE =================


function spawnObstacle() {

    if (gameOver) return;

    let obs = obstacles.create(
    this.scale.width + Phaser.Math.Between(0, 50),
    Phaser.Math.Between(-150, -50),
    'obstacle'
);

    // FLAG HIT
    obs.hitTriggered = false;

    // PHYSICS
    obs.body.setAllowGravity(true);

    // TRAJECTORY PARABOLA RANDOM
    let angle = Phaser.Math.DegToRad(Phaser.Math.Between(-0.10, -70));
    let speed = Phaser.Math.Between(-50, -1);

    obs.setVelocity(
        -Math.cos(angle) * speed,
        -Math.sin(angle) * speed
    );

    // VISUAL
	
    obs.setScale(0.5);
    obs.setOrigin(0.5, 0.5);
    obs.setSize(30,30);
    // ANIM TERBANG
    obs.anims.play('obstacleMove', true);

    // SHADOW
    let shadowobs = this.add.ellipse(obs.x, ground.y + 30, 34, 5, 0x000000, 0.3);
    obs.shadowobs = shadowobs;
}




function spawnObstacle2() {

    if (gameOver) return;

    let obs2 = obstacles2.create(
    this.scale.width + Phaser.Math.Between(80, 200),
    Phaser.Math.Between(-150, -50),
    'obstacle'
);

    // FLAG HIT
    obs2.hitTriggered = false;

    // PHYSICS
    obs2.body.setAllowGravity(true);

    // TRAJECTORY PARABOLA RANDOM
    let angle = Phaser.Math.DegToRad(Phaser.Math.Between(60, 70));
    let speed = Phaser.Math.Between(100, 1000);

    obs2.setVelocity(
        -Math.cos(angle) * speed,
        -Math.sin(angle) * speed
    );

    // VISUAL
	
    obs2.setScale(0.5);
    obs2.setOrigin(0.5, 0.5);
    obs2.setSize(30,30);
    // ANIM TERBANG
    obs2.anims.play('obstacleMove', true);

    // SHADOW
    let shadowobs = this.add.ellipse(obs2.x, ground.y + 30, 34, 5, 0x000000, 0.3);
    obs2.shadowobs = shadowobs;
}


function spawnObstacle3() {

    

    if(gameOver) 
	{ 
     
     return;
	}
	
	let obs3 = this.physics.add.sprite(this.scale.width * 0.95, this.scale.height * 0.6, 'player');
	
     
    //shadow2 = this.add.ellipse(obs.x, obs.y +30 , 34,5, 0x000000, 0.3);
	
	//obs3.shadow2=shadow2;
    //obs.setOrigin(4, 3);

    //obs.setScale(0.5);
	obs3.setSize(50,87);
	obs3.setOffset(0,0);
	obs3.setScale(0.5);

	this.physics.add.collider(obs3, ground);

    
    obs3.body.setAllowGravity(false);
	

    obs3.anims.play('run', true);

    obstacles3.add(obs3);
			
	obstacles3.setVelocityX(-100); 
	
}






function spawnObstacle4() {

    if (gameOver) return;

    let obs4 = obstacles4.create(
    this.scale.width + Phaser.Math.Between(-100, -500),
    Phaser.Math.Between(0, 0),
    'obstacle2'
);

    // FLAG HIT
    obs4.hitTriggered = false;

    // PHYSICS
    obs4.body.setAllowGravity(true);

    // TRAJECTORY PARABOLA RANDOM
    let angle = Phaser.Math.DegToRad(Phaser.Math.Between(-0.10, -70));
    let speed = Phaser.Math.Between(-50, -1);

    obs4.setVelocity(
        -Math.cos(angle) * 1,
        -Math.sin(angle) * 1
    );

    // VISUAL
	
    obs4.setScale(0.5);
    obs4.setOrigin(0.5, 0.5);
    obs4.setSize(30,30);
    // ANIM TERBANG
    obs4.anims.play('rudalMove', true);

    // SHADOW
    let shadowobs4 = this.add.ellipse(obs4.x, ground.y + 30, 34, 5, 0x000000, 0.3);
    obs4.shadowobs4 = shadowobs4;
}









function spawnObstacle5() {

    if (gameOver) return;

    let obs5 = obstacles5.create(
    this.scale.width + Phaser.Math.Between(50, -100),
    Phaser.Math.Between(-100, 0),
    'obstacle2'
);

    // FLAG HIT
    obs5.hitTriggered = false;

    // PHYSICS
    obs5.body.setAllowGravity(true);

    // TRAJECTORY PARABOLA RANDOM
    let angle = Phaser.Math.DegToRad(Phaser.Math.Between(-0.10, -70));
    let speed = Phaser.Math.Between(-50, -1);

    obs5.setVelocity(
        -Math.cos(angle) * 1,
        -Math.sin(angle) * 1
		
    );

    // VISUAL
	
    obs5.setScale(0.5);
    obs5.setOrigin(0.5, 0.5);
    obs5.setSize(30,30);
    // ANIM TERBANG
    obs5.anims.play('rudalMove', true);

    // SHADOW
    let shadowobs5 = this.add.ellipse(obs5.x, ground.y + 30, 34, 5, 0x000000, 0.3);
    obs5.shadowobs5 = shadowobs5;
}















// ================= UPDATE =================


function update() {
 
 
		
        shadow.x=player.x;
		shadow.y=this.scale.height - 107;
		//obs.shadow2.x=obs.x;
		//obs.shadow2.y=obs.y +20 ;
		
		
		
		
		
	//	obstacles.children.iterate(function(ob){
     //   if(ob && ob.shadow2){
      //      ob.shadow2.x = ob.x;
     //       ob.shadow2.y = ob.y + 20;
     //   }
   // });
		
		
 
    if (!gameStarted) {
        if (Phaser.Input.Keyboard.JustDown(keyA)||btnsd) {

            gameStarted = true;
            titleText.setVisible(false);
            startText.setVisible(false);
			
 

            this.time.addEvent({
                delay: 1500,
                callback: spawnObstacle,
                callbackScope: this,
                loop: true
            });
			
			
			
			this.time.addEvent({
                delay: 1500,
                callback: spawnObstacle2,
                callbackScope: this,
                loop: true
            });
			
			
			this.time.addEvent({
                delay: 1500,
                callback: spawnObstacle3,
                callbackScope: this,
                loop: true
            });
			
			
			this.time.addEvent({
                delay: 1500,
                callback: spawnObstacle4,
                callbackScope: this,
                loop: true
            });
			
			
			this.time.addEvent({
                delay: 1500,
                callback: spawnObstacle5,
                callbackScope: this,
                loop: true
            });
			
			
			
			
			
			
			
        }
        return;
    }

    if (gameOver) {
				
		player.anims.play('run', false);
		player.anims.play('die', true);
		player.setCrop(2, 0, 78, 80); 
		shadow.y=player.y+300;
		//adow2 = false;
		delay: 1500;
        if (Phaser.Input.Keyboard.JustDown(keyB)||btnsc) {
         
			this.scene.restart();
			
	    }
        return;
    }

    player.setVelocityX(0);

let arrowFrame = 1; // default idle

// ===== GERAK =====

//if(btnsb==HiGH



//speed = buttonsb.input.pointerDown() ? 700 : 200;





/*
if (buttonsb.input && this.input.activePointer.isDown &&
    buttonsb.getBounds().contains(
        this.input.activePointer.x,
        this.input.activePointer.y
    )) {
    speed = 700;
} */
if(btnsc==true)
{speed = 700;
buttonsc.setFrame(9);

}
else{buttonsc.setFrame(5);
speed = 200;

}


//speed = btnsb ? 700 : 200; // cek tombol B sekali saja

let arah=0;

if (cursors.left.isDown || leftPressed) {
    arah=-1;
    player.anims.play('run', true);
    player.flipX = false;
    arrowFrame = 0;
}
if (cursors.right.isDown || rightPressed) {
    arah=1;
    player.anims.play('run', true);
    player.flipX = true;
    arrowFrame = 2;
}
if (
  !(cursors.left.isDown || leftPressed) && 
  !(cursors.right.isDown || rightPressed)
   ) 
   {
    arah=0; // diam kalau tidak ada input
    player.anims.play('run', false);
    player.setFrame(11);
}



 player.setVelocityX(arah*speed); 


// ===== JUMP =====



if ((player.body.blocked.down && cursors.space.isDown) || (player.body.blocked.down && upPressed)||(player.body.blocked.down&&btnsd)) {
    player.setVelocityY(-500);  
	//arrow.setFrame(3);
    //  arrowFrame = 3;	
}
if(!(btnsd) && !(cursors.space.isDown) ) {    buttonsd.setFrame(4);    }                
else{buttonsd.setFrame(8);}

if(upPressed ) {arrowFrame=3;}

// ===== APPLY FRAME + SAFE TWEEN =====
if (arrowFrame !== lastArrowFrame){

    arrow.setFrame(arrowFrame);
	//if(arrowFrame!==0&&arrowFrame!==2&&arrowFrame!==2)

    // Stop tween lama biar gak numpuk
    this.tweens.killTweensOf(arrow);

    this.tweens.add({
        targets: arrow ,
        scale: 0.6,
        duration: 60,
        yoyo: true,
        ease: 'Quad.easeOut'
    });

    lastArrowFrame = arrowFrame;
	
}



/*if (!this.input.activePointer.isDown) {
  btnsc = false;
  btnsa=false;
  btnsb=false;
  btnsd=false;
  leftPressed=false;
  rightPressed=false;
  upPressed=false;
  
}*/










}
