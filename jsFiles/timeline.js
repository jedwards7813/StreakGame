
var condition = Math.floor(Math.random()*2);

jsPsych.data.addProperties({
    streakCondition: condition,
    date: new Date(),
    PROLIFIC_PID: jsPsych.data.getURLVariable('subject'),
});

function MakeTimeline(game) {
    this.timeline = [
    game.intro.r1part1, 
    game.intro.r1part2, 
    game.intro.r1part3,
    game.task.round1,
    game.Qs.round1,
    game.intro.r2part1,
//    game.intro.r2part2,
//    game.intro.r2part3,
    game.task.round2,
    game.Qs.round2,
    game.Qs.demographics
    ]
};

if (condition == 1) {
    var exp = new MakeTimeline(streakGame);
} else if (condition == 0 ) {
    var exp = new MakeTimeline(nonStreakGame);
};

//jsPsych.init({
//    timeline: exp.timeline,
//    
//});
//

// initiate timeline
jsPsych.init({
   timeline: exp.timeline,
   on_finish: function() {
       firebase.database().ref(firebase.auth().currentUser.uid).set({
           data: jsPsych.data.get().values()
        });
        document.body.innerHTML = '<p><p><p align="center">Thank you for participating in the study!<p align="center"><b>You will be automatically re-directed to Prolific in a few moments.</b></p>';
        setTimeout(function () { location.href = "https://app.prolific.co/submissions/complete?cc=865BE374" }, 5000);
   }
});