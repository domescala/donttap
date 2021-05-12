var color = ["white_0", "black_1"];
var endgame = false
// const div = document.getElementById("tabellone");
const div0 = document.getElementById("container");
const doc_bestscore = document.getElementById("bpoints");
const doc_score = document.getElementById("points");
const doc_timer = document.getElementById("timer");

// doc_score.style["transition"] = "color 10ms ease";


var time = 60;
var set = new Set();
var points = 0;
var bestscore = 0;
var countdown;
var timeout_score;
var timeout_time;
var nextlevel = 20;
var level = 1;
var quadrato = 4;
var n_tessere = quadrato * quadrato;
var ultimo = -1;
var bomb = false;
var levelbomb = 100;

var black = "rgb(24, 24, 24)"
var white = "rgb(243, 243, 243)"
var red = "#dc4444";



// for (let index = 0; index < n_tessere; index++) {
//     const a = document.createElement("DIV");

//     a.id = "div" + index.toString();
//     a.className = "tessera white_0";


//     div.appendChild(a);

//     a.addEventListener("click", click, false)

//     a.style.backgroundColor = red
// }

const tab = document.getElementById("tabellone");
var i = 0;
for (let index = 0; index < quadrato; index++) {
    const tr = document.createElement("TR");
    for (let index = 0; index < quadrato; index++) {
        const td = document.createElement("TD");

        td.id = "td" + i.toString();
        td.className = "tessera white_0";

        tab.appendChild(tr).appendChild(td);

        td.addEventListener("click", click, false)

        td.style.backgroundColor = red

        i++;

    }

}

// for (let index = 0; index < 4; index++) {
//     rand()
// }


function click() {
    cl(this.id)
    if (this.className == "tessera white_0" && !endgame) {
        cl("gameover")
        gameover();

    }
    else if (!endgame) {
        changecolor(this)
    }

}

function changecolor(c) {


    // var  a  = eval(c.className.split("_")[1])
    // cl(a)
    // c.className = "tessera "+color[  (-a + 1)   ]
    // non è necessario lo scambio

    c.className = "tessera white_0";
    c.style.backgroundColor = white;
    set.delete(c.id.split("td")[1]);
    ultimo = c.id.split("td")[1].toString();
    rand();
    points++;
    doc_score.innerHTML = points;

    if (points >= nextlevel) {
        time += 20;
        doc_timer.innerHTML = time
        nextlevel += 20 + Math.round(nextlevel / 4);
        level++;
        document.getElementById("nextlevel").innerHTML = nextlevel;
        document.getElementById("level").innerHTML = level;
        time_an("orange", "white", "scale(2,2)", "scale(1,1)", 100, doc_timer);
        doc_score.style.color = "orange";
        score_an("orange", "white", "scale(3,3)", "scale(1,1)", 100, doc_score);


    }
    if (points >= levelbomb) {
        levelbomb += 100;
        bomb = true
        
        for (let i = 0; i < 16; i++) {
            const tes = document.getElementById("td" + i);
            tes.className = "tessera black_1";
            tes.style.backgroundColor = black;


            
        }
        bomb = false

    }

    else {

        score_an("green", "white", "scale(2,2)", "scale(1,1)", 100, doc_score)
    }

    // doc_score.style.color = "green";
}




function pulse(el, scale) {
    el.style.transform = scale;
}
function swap_color(el, c) {
    el.style.color = c;
}



function score_an(c1, c2, s1, s2, t, el) {

    window.clearTimeout(timeout_score);

    // el.style.transform = first;
    pulse(el, s1);
    swap_color(el, c1);
    el.style.fontWeight = "800"
    int();

    function int() {
        timeout_score = setTimeout(() => {


            // el.style.transform = second;
            pulse(el, s2);
            swap_color(el, c2);
            el.style.fontWeight = "unset"

        }, t);
    }

}

function time_an(c1, c2, s1, s2, t, el) {

    window.clearTimeout(timeout_time);

    // el.style.transform = first;
    pulse(el, s1);
    swap_color(el, c1);
    el.style.fontWeight = "800"
    int();

    function int() {
        timeout_time = setTimeout(() => {


            // el.style.transform = second;
            pulse(el, s2);
            swap_color(el, c2);
            el.style.fontWeight = "unset"

        }, t);
    }

}


function timer() {
    time = 31;
    countdown = setInterval(() => {
        time -= 1;
        doc_timer.innerHTML = time;
        if (time < 1) {
            gameover()
        } else if (level > points) {
            if (time < 5) {
                time_an("red", "white", "scale(2,2)", "scale(1,1)", 950, doc_timer)

            } else if (time < 10) {
                time_an("red", "white", "scale(1.5,1.5)", "scale(0.1,0.1)", 950, doc_timer)
            }
            else {
                time_an("white", "white", "scale(1.2,1.2)", "scale(1,1)", 950, doc_timer)
            }
        }







    }, 1000);
}

function rand() {
    cl("rand () -----------");
    cl("-----------");
    // var ran = Math.round(Math.random() * (n_tessere - 1)).toString();
    var ran = 0;

        estrai();
    

    cl("ultimo" + ultimo);

    function estrai() {
        if (set.size <= 4) {
             cl("ultimo" + ultimo);


        ran = (Math.round(Math.random() * (n_tessere - 1))).toString();
        cl("estraggo... " + ran)
        cl("è gia presente " + set.has(ran.toString()))
        cl(set);

        if (!set.has(ran) && ran != ultimo) {
            cl("FINE: " + ran)

        set.add(ran);
        cl(set);
        const tes = document.getElementById("td" + ran);
        cl(tes);    
        tes.className = "tessera black_1";
        tes.style.backgroundColor = black;

        } else {
            cl("è già presente " + ran)
            estrai();

        }
        }
       

    }
    // while (set.has(ran) && !endgame && set.size < (n_tessere) && ran == ultimo) {
    //     ran = Math.round(Math.random() * (n_tessere - 1)).toString();
    // cl("riestraggo... ora è  "+ran);
    // }







    // var test = true
    // for (let index = 0; index < document.querySelectorAll(".tessera").length; index++) {
    //     cl("------------------------------");
    //     test = test * (document.querySelectorAll(".tessera")[index].className == "tessera black_1") == (document.querySelectorAll(".tessera")[index].style.backgroundColor == black)



    // }
    // cl(test)
    // cl(set);
    // cl("----")

}



function gameover() {
    if (bestscore < points) {
        document.getElementById("bpoints").innerHTML = points;
        bestscore = points;
        score_an("orange", "white", "scale(1.5,1.5)", "scale(1,1)", 100, doc_bestscore)
    }
    cl("gameover2")
    // window.clearInterval(inter)
    endgame = true;
    // cl(document.querySelectorAll(".tessera"))
    for (let index = 0; index < document.querySelectorAll(".tessera").length; index++) {
        document.querySelectorAll(".tessera")[index].style.backgroundColor = red;

    }
    document.getElementById("doc_reset").hidden = false;
    window.clearInterval(countdown)


}


function reset() {


    cl("ciao")
    document.getElementById("points").innerHTML = "/";

   
    cl("points. " + points)

    points = 0;
    document.getElementById("doc_reset").hidden = true;
    document.getElementById("doc_reset").innerHTML = "RESTART";


    endgame = false;
    // cl(document.querySelectorAll(".tessera"))
    for (let index = 0; index < document.querySelectorAll(".tessera").length; index++) {
        document.querySelectorAll(".tessera")[index].style.backgroundColor = white;
        document.querySelectorAll(".tessera")[index].className = "tessera white_0";

    }
    set.clear()
    // for (let index = 0; index < 4; index++) {
    //     rand()
    // }
    rand();
    rand();
    rand();
    rand();
    rand();
    rand();

    
    time = 60;
    set = new Set();
    points = 0;
    bestscore = 0;
    nextlevel = 20;
    level = 1;
    quadrato = 4;
    ultimo = -1;
    bomb = false;
    levelbomb = 100;    
    black = "rgb(24, 24, 24)"
    white = "rgb(243, 243, 243)"
    red = "#dc4444";

    document.getElementById("nextlevel").innerHTML = nextlevel;
    document.getElementById("level").innerHTML = level;

    timer();
}


