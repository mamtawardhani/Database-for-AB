var button, db, pc=0, gs=0
var input
var reset
var car1, car2, cars=[]

var allplayers;
var currentindex=0
var index,x
var canvas
var car1i, car2i

function preload(){
car1i=loadImage("images//car1.png")
car2i=loadImage("images//car2.png")
car3i=loadImage("images//car3.png")
car4i=loadImage("images//car4.png")

}

function setup(){
    canvas=createCanvas(displayWidth-20,displayHeight-30)
    db=firebase.database()

    //var dbRef=db.ref("gamestate")
    db.ref("gamestate").on("value",function(data){
        gs=data.val()
    })

    //var dbReff=db.ref("playercount")
    db.ref("playercount").on("value",function(data){
        pc=data.val()
    })


    var title=createElement("h2")
    title.html("Car racing game!")
    title.position(displayWidth/2-50,0)

     input=createInput('Name')
   
    input.position(displayWidth/2-40,displayHeight/2-80)
    //var name=input.value()

    button=createButton("SUBMIT")
    button.position(displayWidth/2+30,displayHeight/2)
    button.mousePressed(enterplayer)

    reset=createButton("RESET")
    reset.position(1100,50)
    reset.mousePressed(resetD)

    car1=createSprite(200,200,30,30)
    car1.shapeColor="red"
    car1.addImage("c1",car1i)
    car2=createSprite(200,200,30,30)
    car2.shapeColor="blue"
    car2.addImage("c2",car2i)
    cars=[car1,car2]
}

function draw(){


    if(pc==2 && gs==0){
        db.ref('/').update({
            gamestate:1
        })
    }

    if(allplayers==undefined && gs==1){

        db.ref('players').on("value",function(data){
            allplayers=data.val()
        })

    }

    if(gs==1){
        background(0)
        var index=0
        var x=250
        for(var i in allplayers){
            cars[index].x=x
            x=x+250
            cars[index].y=allplayers[i].y
            index+=1
        }

        if(keyDown("up")){
            cars[currentindex-1].y-=5

            db.ref("players/player"+(currentindex)).update({
                y:cars[currentindex-1].y
            })
        }
        drawSprites()
    }
   
}

/*function plc(data){
    pc=data.val()
}

function gsp(data){
    gs=data.val()
}*/
