function enterplayer(){

    var hello=createElement('h1')
    hello.position(displayWidth/2-70,displayHeight/4)
    var name=input.value()
  
   hello.html("Welcome " + name + "! Wait for the other players to join!");

    button.hide()
    input.hide()
    reset.hide()
    pc=pc+1;

    db.ref('/').update({
        playercount: pc
    })

    db.ref("players/player"+pc).set({
        y:590,
        index:pc
    })

    currentindex=pc
   
}

function resetD(){
    db.ref('/').update({
        gamestate:0,
        playercount:0
    })
    db.ref('players').remove()
}