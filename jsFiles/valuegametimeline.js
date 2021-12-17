jsPsych.data.addProperties({
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
    game.intro.r2part2,
    game.intro.r2part3,
    game.task.round2,
    game.Qs.round2,
    game.Qs.demographics
    ]
};


var exp = new MakeTimeline(valueGame);

jsPsych.init({
    timeline: exp.timeline,
   
});