   
   
	import { doc, getDoc, setDoc } from 
	"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

    import { saveScore, loadTopScores } from "./firebase.js";

	let playerName = localStorage.getItem("playerName");

	if(!playerName)
	{
	playerName = prompt("Masukkan nama kamu please");
	localStorage.setItem("playerName",playerName);
	}

	async function saveScorex(score)
	{

	const playerRef = doc(db,"players",playerName);

	const snapshot = await getDoc(playerRef);

	if(!snapshot.exists())
	{

	await setDoc(playerRef,{
	name:playerName,
	bestScore:score
	});

	}
	else
	{

	let oldScore = snapshot.data().bestScore;

	if(score > oldScore)
	{

	await setDoc(playerRef,{
	name:playerName,
	bestScore:score
	});

	}

	}

	}
	
    

//let score;
//let playerName;


//================================================================================PARENT SCANE==========================================================================================




class BaseScene extends Phaser.Scene {


	init() {
    this.lastArrowFrame = -1;
	this.player;
	this.ground;
	this.obstacles;
	this.obstacles2;
	this.obstacles3;
	this.obstacles4;
	this.obstacles5;
	this.cursors;
	this.keyA;
	this.keyB;
	this.score = 0;
	this.scoreText;
	this.gameOver = false;
	this.gameStarted = false;
	this.startText;
	this.titleText;
	this.shadow;
	this.shadow2;
	this.shadow3;
	this.shadow4;
	this.shadow5;
	this.obs;
	this.obs2;
	this.obs3;
	this.obs4;
	this.obs5;
	this.arrow;
	this.leftPressed = false;
	this.rightPressed = false;
	this.upPressed = false;
	this.downPressed = false;
	this.buttonsa;
	this.buttonsb;
	this.buttonsc;
	this.buttonsd;
	this.btnsa;
	this.btnsb;
	this.btnsc;
	this.btnsd;
	this.speed=0;
	this.penguin1=0;
	this.penguin2=0;
	this.animasiplayer; 
	//score=this.schore;
	this.scoreSaved = false;
	this.obs3Scored = false;
	this.prevObs3X ;
	//PRELOAD
	
	}
	
	
	
	
	
	
	
	//preloadGame
	
	
	preloadGame() {

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
	
	
	

	
	//=============CRATEGAME==============


	createGame() {
	
	
	//let bg = this.add.image(700, 300, 'view');.setOrigin(0, 0);
	let bg = this.add.image(0, 0, 'view').setOrigin(0, 0);
	
	bg.setDisplaySize(
        this.scale.width,
        this.scale.height
    );
       

    this.score = 0;
    this.gameOver = false;
    this.gameStarted = false;
	
	
	
   // this.scale.width * 0.1,   // 10% dari kiri
   // this.scale.height * 0.7,  // 70% dari atas (dekat ground)
   
	

    this.titleText = this.add.text(this.scale.width * 0.5, this.scale.height * 0.15, "Penguins X.Y", {
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

   

    // ===== GROUND =====
	
   /*ground = this.physics.add.staticGroup();

	let floor = this.add.rectangle(400, 490, 1800, 40, 0x654321);
	this.physics.add.existing(floor, true);
	ground.add(floor);
	floor.setVisible(false);

	*/


	this.ground = this.physics.add.staticGroup();

	let floor = this.add.rectangle(
    this.scale.width / 2,          // Tengah horizontal
    this.scale.height - 100,       // Agak bawah (20 px dari bawah)
    this.scale.width,              // Full lebar layar
    10,                            // Tebal ground
    0x654321
	);

	this.physics.add.existing(floor, true);
	this.ground.add(floor);

	floor.setVisible(false);


   


    // ===== PLAYER =====
	
    //player = this.physics.add.sprite(100, 200, 'player');
	//player = this.physics.add.sprite(this.scale.height - 300, this.scale.width - 100, 'player');
	this.player = this.physics.add.sprite(
    this.scale.width * 0.39,   // 10% dari kiri
    this.scale.height * 0.5,  // 70% dari atas (dekat ground)
    'player'
	);


	
	
	
    this.player.setScale(1);
	
	this.player.setSize(40,60);
	this.player.setOffset(20,20);
	
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.ground);
	
	this.shadow = this.add.ellipse(this.player.x, this.ground.y +100 , 50,5, 0x000000, 0.3);

	

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
	
    /*obstacles = this.physics.add.sprite(500, 200, 'obstacle');//inii penting
      obstacles.setScale(2);
      obstacles.setCollideWorldBounds(true);
	  this.physics.add.collider(obstacles, ground);
	
	*/
	
	
    // GROUP OBSTACLE
	this.obstacles = this.physics.add.group();

	// COLLIDER PLAYER vs OBSTACLE
	this.physics.add.collider(this.player, this.obstacles, (playerObj, obstacleObj) => {

    if (obstacleObj.hitTriggered) return;

    obstacleObj.hitTriggered = true;

    obstacleObj.setVelocity(0, 0);
    obstacleObj.body.enable = false;

    obstacleObj.anims.play('obstacleMove2', true);
	obstacleObj.scene.time.delayedCall(300, () => {

    //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

    obstacleObj.destroy();

    });

    this.gameOver = true;
    this.scoreText.setText("He died - Score: " + this.score + " ( Back to menu )");

	});

	// COLLIDER OBSTACLE vs GROUND
	this.physics.add.collider(this.obstacles, this.ground, (obstacleObj) => {

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



	this.obstacles2 = this.physics.add.group();

	// COLLIDER PLAYER vs OBSTACLE
	this.physics.add.collider(this.player, this.obstacles2, (playerObj2, obstacleObj2) => {

    if (obstacleObj2.hitTriggered) return;

    obstacleObj2.hitTriggered = true;

    obstacleObj2.setVelocity(0, 0);
    obstacleObj2.body.enable = false;

    obstacleObj2.anims.play('obstacleMove2', true);
	
	obstacleObj2.scene.time.delayedCall(300, () => {

    //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

    obstacleObj2.destroy();

    });

    this.gameOver = true;
    this.scoreText.setText("He died - Score: " + this.score + " ( Back to menu )");

	});

	// COLLIDER OBSTACLE vs GROUND
	this.physics.add.collider(this.obstacles2, this.ground, (obstacleObj2) => {

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
	this.obstacles4 = this.physics.add.group();

	// COLLIDER PLAYER vs OBSTACLE
	this.physics.add.collider(this.player, this.obstacles4, (playerObj4, obstacleObj4) => {

    if (obstacleObj4.hitTriggered) return;

    obstacleObj4.hitTriggered = true;

    obstacleObj4.setVelocity(0, 0);
    obstacleObj4.body.enable = false;

    obstacleObj4.anims.play('rudal', true);
	
	obstacleObj4.scene.time.delayedCall(300, () => {

    //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

    obstacleObj4.destroy();

    });

    this.gameOver = true;
    this.scoreText.setText("He died - Score: " + this.score + " ( Back to menu )");

	});

	// COLLIDER OBSTACLE vs GROUND
	this.physics.add.collider(this.obstacles4, this.ground, (obstacleObj4a) => {

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
	this.obstacles5 = this.physics.add.group();

	// COLLIDER PLAYER vs OBSTACLE
	this.physics.add.collider(this.player, this.obstacles5, (playerObj5, obstacleObj5) => {

    if (obstacleObj5.hitTriggered) return;

    obstacleObj5.hitTriggered = true;

    obstacleObj5.setVelocity(0, 0);
    obstacleObj5.body.enable = false;

    obstacleObj5.anims.play('rudal', true);
	
	obstacleObj5.scene.time.delayedCall(300, () => {

    //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

    obstacleObj5.destroy();

    });

    this.gameOver = true;
    this.scoreText.setText("He died - Score: " + this.score + " ( Back to menu )");

	});

	// COLLIDER OBSTACLE vs GROUND
	this.physics.add.collider(this.obstacles5, this.ground, (obstacleObj5a) => {

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

	//penguin kecil

	this.obstacles3 = this.physics.add.group();
  
	//shadow2 = this.add.ellipse(obstacles, ground.y +30 , 50,5, 0x000000, 0.3); 
	
    this.physics.add.collider(this.obstacles2, this.obstacles3, (Obj2, obstacleObj3) => {
		
		
	if (obstacleObj3.hitTriggered) return;

    obstacleObj3.hitTriggered = true;

    obstacleObj3.setVelocity(0, 0);
    obstacleObj3.body.enable = false;

    obstacleObj3.anims.play('die', true);
	//obstacleObj3.setFrame(18);
    obstacleObj3.setCrop(2, 0, 78, 80); 

	obstacleObj3.scene.time.delayedCall(6000, () => {

    //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

    // obstacleObj3.destroy();
	obstacleObj3.destroy();
	this.penguin2=0;
	//if (obstacleObj.shadow) obstacleObj.shadow.destroy();
      
    });
		

	/*obstacleObj.setSize(50,50);
	obstacleObj.setOffset(70,90);
	obstacleObj3.setScale(1);
	shadow2 = this.add.ellipse(); 
    gameOver = true;
		
	player.setVelocityX(-700);
	obstacleObj.setVelocityX(0);
	obstacleObj.anims.play('obstacleMove2', false);
	scoreText.setText("He died - Score: " + score + " (Press R)");
	this.physics.pause();
	*/	
		
    });




	this.physics.add.collider(this.obstacles, this.obstacles3, (Obj, obstacleObj3b) => {
		
		
	if (obstacleObj3b.hitTriggered) return;
	obstacleObj3b.hitTriggered = true;

    obstacleObj3b.setVelocity(0, 0);
    obstacleObj3b.body.enable = false;

    obstacleObj3b.anims.play('die', true);
	//obstacleObj3b.setFrame(18);
    obstacleObj3b.setCrop(2, 0, 78, 80);  

	obstacleObj3b.scene.time.delayedCall(6000, () => {

    //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

    //obstacleObj3b.destroy();
		
		
		

    //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

    obstacleObj3b.destroy();
	this.penguin2=0;
		
		
	});
		
	});
		

	/*obstacleObj.setSize(50,50);
	obstacleObj.setOffset(70,90);
	obstacleObj3.setScale(1);
	shadow2 = this.add.ellipse(); 
    gameOver = true;
		
	player.setVelocityX(-700);
	obstacleObj.setVelocityX(0);
	obstacleObj.anims.play('obstacleMove2', false);
	scoreText.setText("He died - Score: " + score + " (Press B)");
	this.physics.pause();
		
	*/	
   


	this.physics.add.collider(this.obstacles4, this.obstacles3, (Objj, obstacleObj3c) => {
		
		
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
    // obstacleObj3c.destroy();
	this.penguin2=0;
		
	//spawnObstacle3.call(this);
       
			
	});

	});			
		
   



	this.physics.add.collider(this.obstacles5, this.obstacles3, (Objja, obstacleObj3d) => {
		
		
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
    // obstacleObj3d.destroy();
	this.penguin2=0;
		
		

    //if (obstacleObj.shadow) obstacleObj.shadow.destroy();

 
    });
		
	});			
		
  
   



    // ===== SCORE =====
	
	
	//this.scoreText = this.add.text(this.scale.width * 0.01, this.scale.height * 0.005, "he save " + this.score + " penguin", {
	this.scoreText = this.add.text(this.scale.width * 0.01, this.scale.height * 0.005, " ", {
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
    if (!this.gameOver && this.gameStarted) {
                
    this.scoreText.setText("he save " + this.score + " penguin");}
				        
    },
    loop: true
    });

    // ===== KEYBOARD =====
	
	
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	this.input.keyboard.removeAllListeners();
    this.input.keyboard.disableGlobalCapture();
	}


    

    
	//========================================================SPAWN OBTACLES========================================================================
	
	
	
	
	
	spawnObstacle() {

    if (this.gameOver) return;

    let obs = this.obstacles.create(
        secureBetween(0, this.scale.width),   // random selebar layar
        secureBetween(-120, -40),             // muncul dari atas layar
        'obstacle'
    );

    // FLAG HIT
    obs.hitTriggered = false;

    // PHYSICS
    obs.body.setAllowGravity(true);

    // TRAJECTORY
    let angle = Phaser.Math.DegToRad(secureBetween(-30, 30)); // sedikit miring kiri kanan
    let speed = secureBetween(5, 15);

    obs.setVelocity(
        Math.sin(angle) * speed,   // gerakan kiri kanan
        speed                      // jatuh ke bawah
    );

    // VISUAL
    obs.setScale(0.5);
    obs.setOrigin(0.5, 0.5);
    obs.setSize(30,30);

    // ANIM
    obs.anims.play('obstacleMove', true);

    // SHADOW
    let shadowobs = this.add.ellipse(obs.x, this.ground.y + 30, 34, 5, 0x000000, 0.3);
    obs.shadowobs = shadowobs;
	}




	spawnObstacle2() {

    if (this.gameOver) return;

	/*   let obs2 = obstacles2.create(
    this.scale.width + Phaser.Math.Between(80, 200),
    Phaser.Math.Between(-150, -50),
    'obstacle'
	); */

	let obs2 = this.obstacles2.create(
    secureBetween(0, this.scale.width),   // random selebar layar
    secureBetween(-120, -40),             // muncul dari atas layar
    'obstacle'
    );

    // FLAG HIT
    obs2.hitTriggered = false;

    // PHYSICS
    obs2.body.setAllowGravity(true);

    // TRAJECTORY PARABOLA RANDOM
    // let angle = Phaser.Math.DegToRad(Phaser.Math.Between(60, 70));
    // let speed = Phaser.Math.Between(100, 1000);
	
	// TRAJECTORY
    let angle = Phaser.Math.DegToRad(secureBetween(-30, 30)); // sedikit miring kiri kanan
    let speed = secureBetween(5, 15);

    obs2.setVelocity(
    Math.sin(angle) * speed,   // gerakan kiri kanan
    speed                      // jatuh ke bawah
    );

    // VISUAL
	
    obs2.setScale(0.5);
    obs2.setOrigin(0.5, 0.5);
    obs2.setSize(30,30);
    // ANIM TERBANG
    obs2.anims.play('obstacleMove', true);

    // SHADOW
    let shadowobs = this.add.ellipse(obs2.x, this.ground.y + 30, 34, 5, 0x000000, 0.3);
    obs2.shadowobs = shadowobs;
	}


	spawnObstacle3() {

    

    if(this.gameOver) 
	{ 
     
     return;
	}
	
	this.obs3 = this.physics.add.sprite(this.scale.width * 0.95, this.scale.height * 0.6, 'player');
	
	
    this.obs3.setFrame(11);
    //shadow2 = this.add.ellipse(obs.x, obs.y +30 , 34,5, 0x000000, 0.3);
	
	//obs3.shadow2=shadow2;
    //obs.setOrigin(4, 3);

    //obs.setScale(0.5);
	this.obs3.setSize(50,87);
	this.obs3.setOffset(0,0);
	this.obs3.setScale(0.5);

	this.physics.add.collider(this.obs3, this.ground);

    
    this.obs3.body.setAllowGravity(true);
	

    // obs3.anims.play('run', true);
    //obs3.setFrame(11);
    this.obstacles3.add(this.obs3);
	this.penguin2= this.penguin2+1;
	//obstacles3.setVelocityX(-100); 
	
	
	}






	spawnObstacle4() {

    if (this.gameOver) return;

	/*  let obs4 = obstacles4.create(
    this.scale.width + Phaser.Math.Between(-100, -500),
    Phaser.Math.Between(0, 0),
    'obstacle2'
	);*/

	let obs4 = this.obstacles4.create(
    secureBetween(0, this.scale.width),   // random selebar layar
    secureBetween(-120, -40),             // muncul dari atas layar
    'obstacle2'
    );

    // FLAG HIT
    obs4.hitTriggered = false;

    // PHYSICS
    obs4.body.setAllowGravity(true);

    // TRAJECTORY PARABOLA RANDOM
    // let angle = Phaser.Math.DegToRad(Phaser.Math.Between(-0.10, -70));
    //let speed = Phaser.Math.Between(-50, -1);
	// ANGLE PARABOLA
    // TRAJECTORY
    let angle = Phaser.Math.DegToRad(secureBetween(-30, 30)); // sedikit miring kiri kanan
    let speed = secureBetween(5, 15);

    obs4.setVelocity(
        Math.sin(angle) * speed,   // gerakan kiri kanan
        speed                      // jatuh ke bawah
    );

    // VISUAL
	
    obs4.setScale(0.5);
    obs4.setOrigin(0.5, 0.5);
    obs4.setSize(30,30);
    // ANIM TERBANG
    obs4.anims.play('rudalMove', true);

    // SHADOW
    let shadowobs4 = this.add.ellipse(obs4.x, this.ground.y + 30, 34, 5, 0x000000, 0.3);
    obs4.shadowobs4 = shadowobs4;
	}


	spawnObstacle5() {

    if (this.gameOver) return;

	/*  let obs5 = obstacles5.create(
    this.scale.width + Phaser.Math.Between(50, -100),
    Phaser.Math.Between(-100, 0),
    'obstacle2'
	); */

	let obs5 = this.obstacles5.create(
    secureBetween(0, this.scale.width),   // random selebar layar
    secureBetween(-120, -40),             // muncul dari atas layar
        'obstacle2'
    );


    // FLAG HIT
    obs5.hitTriggered = false;

    // PHYSICS
    obs5.body.setAllowGravity(true);

    // TRAJECTORY PARABOLA RANDOM
    // let angle = Phaser.Math.DegToRad(Phaser.Math.Between(-0.10, -70));
    // let speed = Phaser.Math.Between(-50, -1);
	
	// TRAJECTORY
    let angle = Phaser.Math.DegToRad(secureBetween(-30, 30)); // sedikit miring kiri kanan
    let speed = secureBetween(5, 15);

    obs5.setVelocity(
        Math.sin(angle) * speed,   // gerakan kiri kanan
        speed                      // jatuh ke bawah
    );

    // VISUAL
	
    obs5.setScale(0.5);
    obs5.setOrigin(0.5, 0.5);
    obs5.setSize(30,30);
    // ANIM TERBANG
    obs5.anims.play('rudalMove', true);

    // SHADOW
    let shadowobs5 = this.add.ellipse(obs5.x, this.ground.y + 30, 34, 5, 0x000000, 0.3);
    obs5.shadowobs5 = shadowobs5;
}

}
	
	//===============================================================MAIN MENU SCANE=======================================================================
	
     class MainMenuScene extends BaseScene {
    constructor() {
        super('MainMenuScene');
    }

    preload() {this.preloadGame();}


    create() {
    
	this.createGame();
	
	
	
	//==================================== TOMBOL START (pakai variabel)
	const boxX2 = 350;       // posisi X kotak (sama dengan CREDIT & HOW TO PLAY)
	const boxY2 = 150;       // posisi Y kotak
	const boxW2 = 100;       // lebar kotak (sama dengan CREDIT & HOW TO PLAY)
	const boxH2 = 25;        // tinggi kotak (sama dengan CREDIT & HOW TO PLAY)
	const radius2 = 8;       // radius sudut

	// bikin graphics kotak
	const box = this.add.graphics();
	box.lineStyle(3, 0x000000, 1); // border hitam
	box.fillStyle(0x1e90ff, 1);    // isi biru
	box.fillRoundedRect(boxX2, boxY2, boxW2, boxH2, radius2);
    box.strokeRoundedRect(boxX2, boxY2, boxW2, boxH2, radius2);

	// bikin teks di tengah kotak
	const label = this.add.text(
    boxX2 + boxW2/2,       // tengah X
    boxY2 + boxH2/2,       // tengah Y
    'START',
    {
        fontSize: '18px',
        fill: '#ffffff'
    }
	).setOrigin(0.5).setInteractive();

	// efek hover
	label.on('pointerover', () => {
    box.clear();
    box.lineStyle(3, 0xffffff, 1); // border putih
    box.fillStyle(0x00bfff, 1);    // isi biru muda
    box.fillRoundedRect(boxX2, boxY2, boxW2, boxH2, radius2);
    box.strokeRoundedRect(boxX2, boxY2, boxW2, boxH2, radius2);

    this.tweens.add({
        targets: label,
        scale: 1.1,
        duration: 200,
        yoyo: true
    });
	});

	label.on('pointerout', () => {
    box.clear();
    box.lineStyle(3, 0x000000, 1); // border hitam lagi
    box.fillStyle(0x1e90ff, 1);    // isi biru normal
    box.fillRoundedRect(boxX2, boxY2, boxW2, boxH2, radius2);
    box.strokeRoundedRect(boxX2, boxY2, boxW2, boxH2, radius2);

    label.setScale(1);
	});

	// klik
	label.on('pointerdown', () => {
    this.scene.start('GameScene');
	});
	
	
	
	//==================================== TOMBOL CREDIT (pakai variabel)
	const boxX = 350;       // posisi X kotak
	const boxY = 190;       // posisi Y kotak
	const boxW = 100;       // lebar kotak
	const boxH = 25;        // tinggi kotak
	const radius = 8;       // radius sudut

	// gambar kotak dengan border hitam
	const graphics = this.add.graphics();
	graphics.lineStyle(3, 0x000000, 1); // border hitam
	graphics.fillStyle(0x1e90ff, 1);    // isi biru
	graphics.fillRoundedRect(boxX, boxY, boxW, boxH, radius);
	graphics.strokeRoundedRect(boxX, boxY, boxW, boxH, radius);

	// teks otomatis di tengah kotak
	const creditBtn = this.add.text(
    boxX + boxW/2,       // tengah X
    boxY + boxH/2,       // tengah Y
    'CREDITS',
    {
        fontSize: '18px',
        fill: '#ffffff'
    }
	).setOrigin(0.5).setInteractive();

	// efek hover
	creditBtn.on('pointerover', () => {
    graphics.clear();
    graphics.lineStyle(3, 0xffffff, 1); // border putih saat hover
    graphics.fillStyle(0x00bfff, 1);    // isi biru muda
    graphics.fillRoundedRect(boxX, boxY, boxW, boxH, radius);
    graphics.strokeRoundedRect(boxX, boxY, boxW, boxH, radius);

    this.tweens.add({
        targets: creditBtn,
        scale: 1.1,
        duration: 200,
        yoyo: true
    });
	});

	creditBtn.on('pointerout', () => {
    graphics.clear();
    graphics.lineStyle(3, 0x000000, 1); // kembali border hitam
    graphics.fillStyle(0x1e90ff, 1);    // isi biru normal
    graphics.fillRoundedRect(boxX, boxY, boxW, boxH, radius);
    graphics.strokeRoundedRect(boxX, boxY, boxW, boxH, radius);

    creditBtn.setScale(1); // reset scale
	});

	// klik
	creditBtn.on('pointerdown', () => {
    this.scene.start('CreditScene');
	});
	
	
	
	
	
	//==================================== TOMBOL HOW TO PLAY (pakai variabel)
	const boxX1 = 350;       // posisi X kotak (sama dengan tombol CREDIT)
	const boxY1 = 230;       // posisi Y kotak
	const boxW1 = 100;       // lebar kotak (sama dengan tombol CREDIT)
	const boxH1 = 25;        // tinggi kotak (sama dengan tombol CREDIT)
	const radius1 = 8;       // radius sudut

	// gambar kotak dengan border hitam
	const graphicsHow = this.add.graphics();
	graphicsHow.lineStyle(3, 0x000000, 1); // border hitam
	graphicsHow.fillStyle(0x1e90ff, 1);    // isi biru
	graphicsHow.fillRoundedRect(boxX1, boxY1, boxW1, boxH1, radius1);
	graphicsHow.strokeRoundedRect(boxX1, boxY1, boxW1, boxH1, radius1);

	// teks otomatis di tengah kotak
	const howBtn = this.add.text(
    boxX1 + boxW1/2,       // tengah X
    boxY1 + boxH1/2,       // tengah Y
    'RULES',
    {
        fontSize: '18px',
        fill: '#ffffff'
    }
	).setOrigin(0.5).setInteractive();

	// efek hover
	howBtn.on('pointerover', () => {
    graphicsHow.clear();
    graphicsHow.lineStyle(3, 0xffffff, 1); // border putih saat hover
    graphicsHow.fillStyle(0x00bfff, 1);    // isi biru muda
    graphicsHow.fillRoundedRect(boxX1, boxY1, boxW1, boxH1, radius1);
	graphicsHow.strokeRoundedRect(boxX1, boxY1, boxW1, boxH1, radius1);

    this.tweens.add({
        targets: howBtn,
        scale: 1.1,
        duration: 200,
        yoyo: true
    });
	});

	howBtn.on('pointerout', () => {
    graphicsHow.clear();
    graphicsHow.lineStyle(3, 0x000000, 1); // kembali border hitam
    graphicsHow.fillStyle(0x1e90ff, 1);    // isi biru normal
	graphicsHow.fillRoundedRect(boxX1, boxY1, boxW1, boxH1, radius1);
	graphicsHow.strokeRoundedRect(boxX1, boxY1, boxW1, boxH1, radius1);
    howBtn.setScale(1); // reset scale
	});

	// klik
	howBtn.on('pointerdown', () => {
    this.scene.start('RulesScane'); // nama scene HOW TO PLAY 
	});
	
	
	
	//==================================== TOMBOL SCORE 
	
	
	
	
	
	const boxX3 = 350;       // posisi X kotak (sama dengan tombol HOW TO PLAY)
	const boxY3 = 270;       // posisi Y kotak (dibawah HOW TO PLAY)
	const boxW3 = 100;       // lebar kotak (sama dengan tombol CREDIT & HOW TO PLAY)
	const boxH3 = 25;        // tinggi kotak (sama dengan tombol CREDIT & HOW TO PLAY)
	const radius3 = 8;       // radius sudut

	// gambar kotak dengan border hitam
	const graphicsScore = this.add.graphics();
	graphicsScore.lineStyle(3, 0x000000, 1); // border hitam
	graphicsScore.fillStyle(0x1e90ff, 1);    // isi biru
	graphicsScore.fillRoundedRect(boxX3, boxY3, boxW3, boxH3, radius3);
    graphicsScore.strokeRoundedRect(boxX3, boxY3, boxW3, boxH3, radius3);

	// teks otomatis di tengah kotak
	const scoreBtn = this.add.text(
    boxX3 + boxW3/2,       // tengah X
    boxY3 + boxH3/2,       // tengah Y
    'SCORE',
    {
        fontSize: '18px',
        fill: '#ffffff'
    }
	).setOrigin(0.5).setInteractive();

	// efek hover
	scoreBtn.on('pointerover', () => {
    graphicsScore.clear();
    graphicsScore.lineStyle(3, 0xffffff, 1); // border putih saat hover
    graphicsScore.fillStyle(0x00bfff, 1);    // isi biru muda
    graphicsScore.fillRoundedRect(boxX3, boxY3, boxW3, boxH3, radius3);
    graphicsScore.strokeRoundedRect(boxX3, boxY3, boxW3, boxH3, radius3);

    this.tweens.add({
        targets: scoreBtn,
        scale: 1.1,
        duration: 200,
        yoyo: true
    });
	});

	scoreBtn.on('pointerout', () => {
    graphicsScore.clear();
    graphicsScore.lineStyle(3, 0x000000, 1); // kembali border hitam
    graphicsScore.fillStyle(0x1e90ff, 1);    // isi biru normal
    graphicsScore.fillRoundedRect(boxX3, boxY3, boxW3, boxH3, radius3);
    graphicsScore.strokeRoundedRect(boxX3, boxY3, boxW3, boxH3, radius3);

    scoreBtn.setScale(1); // reset scale
	});

	// klik
	scoreBtn.on('pointerdown', () => {
	this.scene.start('ScoreScene'); 
	});
	
	
	}
	
	update()
	{}
	}
   
   //================================================================CREDIT SCANE =================================================================================




   class CreditScene extends BaseScene {

    constructor() {
        super('CreditScene');
    }


    preload() {this.preloadGame();}


    create() {
             
        //  background gelap transparan (biar kayak dialog)
        // const bg = this.add.rectangle(400, 200, 500, 250, 0x000000, 0.8);
		this.createGame();
        //  teks credit
		const bg = this.add.rectangle(400, 200, 500, 250, 0x000000, 0.8);
        const text = this.add.text(400, 150,
		`
		 
		 Programmer & Design Game
		 Laga alur
		
		 Design Art  
		 free sources from the internet
		
		 Background
		 AI generated images`,
		
        {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'		
        })
        .setOrigin(0.5);

        //  tombol BACK
        const backBtn = this.add.text(400, 280, 'BACK', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000'
        })
        .setOrigin(0.5)
        .setInteractive();

        backBtn.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });

    }
}


//===================================================================SCANE RULES===============================================================================



   class RulesScane extends BaseScene {

    constructor() {
        super('RulesScane');
    }


    preload() {this.preloadGame();}


    create() {
             
        //  background gelap transparan (biar kayak dialog)
        // const bg = this.add.rectangle(400, 200, 500, 250, 0x000000, 0.8);
		this.createGame();
        //  teks credit
		const bg = this.add.rectangle(400, 200, 800, 350, 0x000000, 0.8);
        const text = this.add.text(400, 150,
		`
		 
Cara Main
Gerakkan penguin menuju anak penguin di sisi kanan layar, 
lalu bawa mereka ke sisi kiri layar sambil menghindari rintangan yang jatuh dari langit. 
Selamatkan sebanyak mungkin anak penguin untuk mendapatkan skor tertinggi.

						Kontrol
						- Tombol A → Melompat
						- Tombol B → Meningkatkan kecepatan
						Selamat Bermain!🎮🐧

Rules
Move the penguin toward the baby penguins on the right side of the screen,
then carry them back to the left side while avoiding obstacles falling from the sky.
Rescue as many baby penguins as possible to achieve the highest score.

						Controls
						- Press A → Jump
						- Press B → Increase speed
						Have fun playing!🎮🐧`,
		
        {
            fontSize: '12px',
            fill: '#ffffff',
            align: 'left'		
        })
        .setOrigin(0.5);
		  // pastikan tombol MENU di atas elemen lain
        //  tombol BACK
        const backBtn = this.add.text(400, 280, 'BACK', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000'
        })
        .setOrigin(0.5)
        .setInteractive();
		//backBtn.setDepth(9000000); 
         backBtn.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });

    }
}



//=====================================SCANE SCORE======================================================



// 🔥 IMPORT HARUS DI ATAS
//import { loadTopScores } from "./firebase.js";

class ScoreScene extends BaseScene {

    constructor() {
        super('ScoreScene');
    }

    preload() {
        this.preloadGame();
    }

    async create() {

        this.createGame();

        // background
        const bg = this.add.rectangle(400, 250, 600, 400, 0x000000, 0.8);

        // judul
        this.add.text(400, 80, "TOP 10 PLAYERS", {
            fontSize: '28px',
            fill: '#ffffff',
			align: 'left'
        }).setOrigin(0.5);

        // loading text
        const loadingText = this.add.text(400, 200, "Loading...", {
            fontSize: '20px',
            fill: '#ffffff',
			align: 'left'
        }).setOrigin(0.5);

        try {
            const scores = await loadTopScores();

            // hapus loading
            loadingText.destroy();

            let y = 120;

            if (scores.length === 0) {
                this.add.text(400, 200, "Belum ada data score", {
                    fontSize: '20px',
                    fill: '#ffffff',
					align: 'left'
                }).setOrigin(0.5);
            }

            scores.forEach((player, index) => {

                this.add.text(400, y,
                    `${index + 1}. ${player.name} - ${player.bestScore}`,
                    {
                        fontSize: '20px',
                        fill: '#ffffff',
						align: 'left'
                    }
                ).setOrigin(0.5);

                y += 25;

            });

        } catch (error) {

            console.error(error);

            loadingText.setText("Gagal load score");

        }

    // tombol BACK
    const backBtn = this.add.text(400, 360, 'BACK', {
    fontSize: '24px',
    fill: '#ffffff',
    backgroundColor: '#000'
	})
	.setOrigin(0.5)
	.setInteractive()
	.setDepth(999); //  Biar paling atas

     backBtn.on('pointerdown', () => {
     this.scene.start('MainMenuScene');
     });

    }
	}

	export default ScoreScene;
























   //=================================================================SCANE GAME===========================================================================


	class GameScene extends BaseScene {

    constructor() {
    super('GameScene');
    }
	// ================= PRELOAD =================


	preload() {this.preloadGame();}


	// ================= CREATE =================


	create() {this.createGame();
	
	//this.prevObs3X = this.obs3.x;
	
	
	 // ===== BUTTON =====

	this.arrow = this.add.sprite(
	this.scale.width * 0.85,
	this.scale.height * 0.74,
	'arrow'
	);
	this.arrow.setScale(0.6);
	this.arrow.setFrame(1);
	this.arrow.setDepth(1000);



	let leftZone = this.add.zone(this.arrow.x - 80, this.arrow.y-30, 58, 60).setOrigin(0,0).setInteractive();
    let rightZone = this.add.zone(this.arrow.x + 31, this.arrow.y-30, 51, 60).setOrigin(0,0).setInteractive();
    let upZone = this.add.zone(this.arrow.x-30, this.arrow.y - 80, 58, 60).setOrigin(0,0).setInteractive();
    // let downZone = this.add.zone(arrow.x, arrow.y + 50, 100, 50).setOrigin(0,0).setInteractive();


    // event untuk update flag
    leftZone.on('pointerdown', () => { this.leftPressed = true; });
    leftZone.on('pointerup', () => { this.leftPressed = false; });
	leftZone.on('pointerout', () => { this.leftPressed = false; });
	leftZone.on('pointercancel', () => { this.leftPressed = false; });

    rightZone.on('pointerdown', () => { this.rightPressed = true; });
    rightZone.on('pointerup', () => { this.rightPressed = false; });
	rightZone.on('pointerout', () => { this.rightPressed = false; });
	rightZone.on('pointercancel', () => { this.rightPressed = false; });

    upZone.on('pointerdown', () => { this.upPressed = true; });
    upZone.on('pointerup', () => { this.upPressed = false; });
	upZone.on('pointerout', () => { this.upPressed = false; });
	upZone.on('pointercancel', () => { this.upPressed = false; });

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

	this.buttonsc = this.add.sprite(
    this.scale.width * 0.16,
    this.scale.height * 0.85,
    'button'
	);
	this.buttonsc.setScale(0.7);
	this.buttonsc.setFrame(5);
	this.buttonsc.setDepth(1000);


	this.buttonsd = this.add.sprite(
    this.scale.width * 0.1,
    this.scale.height * 0.70,
    'button'
	);
	this.buttonsd.setScale(0.7);
	this.buttonsd.setFrame(4);
	this.buttonsd.setDepth(1000);


	//buttonsa.setInteractive();
	//buttonsb.setInteractive();
	this.buttonsc.setInteractive();
	this.buttonsd.setInteractive();
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

	this.buttonsc.on('pointerdown', () => {this.btnsc = true;});
	this.buttonsc.on('pointerup', () => {this.btnsc = false;});
	this.buttonsc.on('pointerout', () => { this.btnsc = false; });
	this.buttonsc.on('pointercancel', () => { this.btnsc = false; });


	this.buttonsd.on('pointerdown', () => {this.btnsd = true;});
	this.buttonsd.on('pointerup', () => {this.btnsd = false;});
	this.buttonsd.on('pointerout', () => { this.btnsd = false; });
	this.buttonsd.on('pointercancel', () => { this.btnsd = false; });



	this.input.addPointer(10);
	
	

	 this.startText = this.add.text(this.scale.width * 0.5, this.scale.height * 0.49, "Press ' A ' to Start!!", {
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
	
	
	
	
	
	//==================================== TOMBOL MENU
	//==================================== TOMBOL MENU (versi rapi)
	//==================================== TOMBOL MENU (hitbox pas dengan kotak)
	//==================================== TOMBOL MENU (hitbox pas)
	//==================================== TOMBOL MENU (hitbox akurat)
	//==================================== TOMBOL MENU (hitbox akurat)
	const btnW = 80;   // lebar kotak
	const btnH = 30;   // tinggi kotak
	const margin = 10; // jarak dari tepi

	// posisi kanan atas
	const posX = this.sys.game.config.width - btnW - margin;
	const posY = margin;

	// gambar kotak mulai dari (0,0)
	const backBox = this.add.graphics();
	backBox.lineStyle(2, 0x000000, 1);
	backBox.fillStyle(0xaeefff, 1);
	backBox.fillRoundedRect(0, 0, btnW, btnH, 6);
	backBox.strokeRoundedRect(0, 0, btnW, btnH, 6);

	// teks di tengah kotak
	const backLabel = this.add.text(btnW/2, btnH/2, 'MENU', {
    fontSize: '18px',
    fill: '#000000'
	}).setOrigin(0.5);

	// container di kanan atas
	const backBtn = this.add.container(posX, posY, [backBox, backLabel])
    .setSize(btnW, btnH)
    .setInteractive(new Phaser.Geom.Rectangle(35, 10, 80, 30), Phaser.Geom.Rectangle.Contains);

	// efek hover
	backBtn.on('pointerover', () => {
    backBox.clear();
    backBox.lineStyle(2, 0xffffff, 1);
    backBox.fillStyle(0x00bfff, 1);
    backBox.fillRoundedRect(0, 0, btnW, btnH, 6);
    backBox.strokeRoundedRect(0, 0, btnW, btnH, 6);

    this.tweens.add({
        targets: backBtn,
        scale: 1.05,
        duration: 150,
        yoyo: true
    });
	});

	backBtn.on('pointerout', () => {
    backBox.clear();
    backBox.lineStyle(2, 0x000000, 1);
    backBox.fillStyle(0xaeefff, 1);
    backBox.fillRoundedRect(0, 0, btnW, btnH, 6);
    backBox.strokeRoundedRect(0, 0, btnW, btnH, 6);

    backBtn.setScale(1);
	});

	// klik
	backBtn.on('pointerdown', () => {
    this.scene.start('MainMenuScene');
	});


    }  
	
	
	
	
	
	
	
	//===============UPDATE============
	
	update() {
 	
    this.shadow.x=this.player.x;
	this.shadow.y=this.scale.height - 107;
	//obs.shadow2.x=obs.x;
	//obs.shadow2.y=obs.y +20 ;
				
	 /*	obstacles.children.iterate(function(ob){
     if(ob && ob.shadow2){
     ob.shadow2.x = ob.x;
     ob.shadow2.y = ob.y + 20;
     }
     });*/
		
		
 
    if (!this.gameStarted) {
    if (Phaser.Input.Keyboard.JustDown(this.keyA)||this.btnsd) {

    this.gameStarted = true;
    this.titleText.setVisible(false);
    this.startText.setVisible(false);
			
 

    this.time.addEvent({
    delay:  secureBetween(1500, 4000),
    callback: this.spawnObstacle,
    callbackScope: this,
    loop: true
    });
			
			
			
	this.time.addEvent({
    delay:  secureBetween(500, 4000),
    callback: this.spawnObstacle2,
    callbackScope: this,
    loop: true
    });
			
			
	this.time.addEvent({
    delay:  secureBetween(1500, 4000),
    callback: this.spawnObstacle4,
	callbackScope: this,
    loop: true
    });
			
	/*	if(penguin2<1) {
	this.time.addEvent({
    delay: 1500,
    callback: spawnObstacle3,
    callbackScope: this,
    loop: true
    });penguin2+=1;
	} */
			
	this.time.addEvent({
    delay:  secureBetween(1500, 4000),
    callback: this.spawnObstacle5,
    callbackScope: this,
    loop: true
    });
					
    }
        return;
    }
	
	///// panggil anak penguin
	
	if (this.penguin2==0) {
	this.obs3Scored = false;
	
    this.spawnObstacle3.call(this);
    this.spawn3Done = true; // pastikan hanya sekali
	this.obs3.timerStarted = false;
	this.prevObs3X = this.obs3.x;
    }
	
	
	//const groundY = 500; // ganti sesuai posisi ground

	//let groundY = 500; // ground level, sesuaikan

	const groundY = 500; // ground level, sesuaikan

	if (this.obs3) {

    // trigger follow saat disentuh player
    if (!this.obs3.following && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.obs3.getBounds())) {
       
    if(this.penguin1==0){
	this.obs3.following = true;}
    }

    if (this.obs3.following) {

    // horizontal velocity ikut player
    this.obs3.body.velocity.x = this.player.body.velocity.x;

    // vertical velocity ikut player saat lompat
    if (this.player.y < groundY) {
    this.obs3.body.velocity.y = this.player.body.velocity.y;
    }

    // koreksi X supaya menempel persis
    this.obs3.x = this.player.x;

    // koreksi Y saat player di ground, obs3 gravity handle landing
    if (this.player.y >= groundY) {
    this.obs3.y = groundY - this.obs3.height/2;
    }
    }
	}
   
    //Tambah score
    //if (this.obs3.x <= 50 && !this.obs3.timerStarted)
	if (this.prevObs3X > 50 && this.obs3.x <= 50 && !this.obs3Scored)
	{     
    // Set kecepatan dan state
	this.obs3Scored = true;
    this.obs3.body.velocity.x = -100;
    this.penguin2 = 0;
    this.obs3.following = false;
    this.penguin1 = 1;
	if (!this.gameOver) {
    this.score++; }
    // Tandai bahwa timer sudah dimulai supaya tidak terulang tiap frame
    this.obs3.timerStarted = true;

    // Timer delay 6000ms (6 detik)
    this.time.delayedCall(200, () => {
       // obs3.destroy();
	    
        this.penguin1 = 0;
    }, [], this);
	}

     this.prevObs3X = this.obs3.x;

    if (this.gameOver) {
		
	this.player.anims.play('run', false);
	this.player.anims.play('die', true);
	this.obs3.anims.play('run', false);
	this.obs3.anims.play('die', true);
	this.player.setCrop(2, 2, 76, 80); 
	this.obs3.setCrop(2, 2, 76, 80); 
	//this.player.setCrop(2, 0, 78, 80); 
	//shadow.y=player.y+300;
	//shadow2 = false;
	//delay: 1500;
	
	if(!this.scoreSaved){
	saveScorex(this.score);
	this.scoreSaved = true;
	}
	
	
 //   if (Phaser.Input.Keyboard.JustDown(this.keyB)||this.btnsc) {
    this.speed=0;
	this.penguin1=0;
	this.penguin2=0;
	this.obs3Scored = false;
	this.prevObs3X = this.obs3.x;		
			
//	this.scene.restart();
			
//	}
    return;
    }

    this.player.setVelocityX(0);

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
	if(this.btnsc==true||this.keyB.isDown)//SPEED EXTRA
	{this.speed = 700;
	this.buttonsc.setFrame(9);

	}
	else{this.buttonsc.setFrame(5);
	this.speed = 200;

	}


	//speed = btnsb ? 700 : 200; // cek tombol B sekali saja

	let arah=0;

	if (this.cursors.left.isDown || this.leftPressed) {
    arah=-1;
    this.player.anims.play('run', true);
    this.player.flipX = false;
    arrowFrame = 0;
	}
	if (this.cursors.right.isDown || this.rightPressed) {
    arah=1;
    this.player.anims.play('run', true);
    this.player.flipX = true;
    arrowFrame = 2;
	}
	if (
	!(this.cursors.left.isDown || this.leftPressed) && 
	!(this.cursors.right.isDown || this.rightPressed)
	) 
	{
    arah=0; // diam kalau tidak ada input
    this.player.anims.play('run', false);
    this.player.setFrame(11);
	}



	this.player.setVelocityX(arah*this.speed); 


	// ===== JUMP =====



	if ((this.player.body.blocked.down && this.cursors.space.isDown) || (this.player.body.blocked.down && this.upPressed)||(this.player.body.blocked.down&&this.btnsd)||
		(this.keyA.isDown&&this.player.body.blocked.down )) {
    this.player.setVelocityY(-500);  
	//arrow.setFrame(3);
    //  arrowFrame = 3;	
	}
	if(!(this.btnsd) && !(this.cursors.space.isDown)  &&!(this.keyA.isDown)) { this.buttonsd.setFrame(4);    }                
	else{this.buttonsd.setFrame(8);}

	if(this.upPressed ) {arrowFrame=3;}

	// ===== APPLY FRAME + SAFE TWEEN =====
	if (arrowFrame !== this.lastArrowFrame){

    this.arrow.setFrame(arrowFrame);
	//if(arrowFrame!==0&&arrowFrame!==2&&arrowFrame!==2)

    // Stop tween lama biar gak numpuk
    this.tweens.killTweensOf(this.arrow);

    this.tweens.add({
    targets: this.arrow ,
    scale: 0.6,
    duration: 60,
    yoyo: true,
    ease: 'Quad.easeOut'
    });

    this.lastArrowFrame = arrowFrame;
	console.log("SCORE:", this.score);
	
	}}}


	/*if (!this.input.activePointer.isDown) {
	btnsc = false;
	btnsa=false;
	btnsb=false;
	btnsd=false;
	leftPressed=false;
	rightPressed=false;
	upPressed=false;
  
	}*/
	


	
	
	


	
	
	
//====================================================================================================================================================================================	
	
	
//====================================================================================================================================================================================	


//==============================================================================CONFIG================================================================================================

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

    scene: [
    MainMenuScene,
	GameScene, 
	CreditScene,
	RulesScane,
	ScoreScene
    
	//GameScene 
    //MainMenuScene
    ]
	};

	const game = new Phaser.Game(config);



//===========================================================================================================================================================================	

//===========================================================================FUNCTION=========================================================================================



// ================= RNG ================= Randomnes mendekati TRNG


	function secureBetween(min, max) {
    const range = max - min + 1;
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return min + (array[0] % range);
	}
	
     
