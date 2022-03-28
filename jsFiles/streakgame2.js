// Define Stimuli


var streakGame2 = (function() {

    var p = {};

    // randomly assign to conditions
    var settings = {
        colorOrder: Math.floor(Math.random()*2),
        pM: Array(1, 5, 9)[Math.floor(Math.random()*3)],
        pEM: [10, 10],
        streakOrder: Math.floor(Math.random()*2),
        val: 1,
        nTrials: 50
    };
console.log(settings.pM);
    // create text variables for instructions
    
    var text = {
        game1: settings.colorOrder == 1 ? 'Green Game' : 'Blue Game',
        color1: settings.colorOrder == 1 ? 'green' : 'blue',
        hex1: settings.colorOrder == 1 ? '#00aa00' : '#1067e8',
        span1: settings.colorOrder == 1 ? 'a-span' : 'b-span',
        bestOdds1: `${ settings.pEM[0]*10 }%`,
        worstOdds1:  `${ (10-settings.pEM[0])*10 }%`,
        game2: settings.colorOrder == 0 ? 'Green Game' : 'Blue Game',
        color2: settings.colorOrder == 0 ? 'green' : 'blue',
        hex2: settings.colorOrder == 0 ? '#00aa00' : '#1067e8',
        span2: settings.colorOrder == 0 ? 'a-span' : 'b-span',
        bestOdds2: `${ settings.pEM[1]*10 }%`,
        worstOdds2:  `${ (10-settings.pEM[1])*10 }%`,
        speedChange1: settings.pM[0] < settings.pM[1] ? 'more' : 'less',
        speedChange2: settings.pM[0] < settings.pM[1] ? "you won't have to respond as fast" : "you'll have to respond faster",
        value: settings.val.toString(),
        plural: settings.val == 1 ? '' : 's', 
    };

    var stim = {
        r1: {
            m1: `<div class="box" style="background-color:${text.hex1}"> </div>`,
            m0: `<div class="box" style="background-color:white"> </div>`,
            e1: `success`,
            e0: `failure`
        },
        r2: {
            m1: `<div class="box" style="background-color:${text.hex2}"> </div>`,
            m0: `<div class="box" style="background-color:white"> </div>`,
            e1: `success`,
            e0: `failure`
        }
    }

    // save condition and URL data
    jsPsych.data.addProperties({
        pM_Streak: settings.pM,
        pEM_Streak: settings.pEM,
        colorOrder_Streak: settings.colorOrder,
    });

   /*
    *
    *   INSTRUCTIONS
    *
    */


    p.intro = {}

    // temporary data
    var compAns1,
        compAns2,
        pages = {
            r1: {
                part1: [`<div class='parent' style='text-align: left'>
                <p>Thank you.</p>
                <p>Next, we will introduce you to the survey.</p>
                <p>When you are ready, please continue.</p></div>`,

                `<div class='parent' style='text-align: left'>
                <p>We are designing games that scientists can use to study visual attention. 
                Our goal is to make the games as immersive and engaging as possible.
                To make the games as immersive and engaging as possible, we are getting feedback from people like you.</p>
                <p>You will play two different games: the <span class='${text.span1}'>${text.game1}</span> and the 
                <span class='${text.span2}'>${text.game2}</span>. After each game, you will report how immersed and engaged you felt.</p>
                <p>The games are very similar, but their color schemes will help you tell them apart.</p>
                <p>Continue to learn about and play the <span class='${text.span1}'>${text.game1}</span>.</p>
                <p>After you finish, you will learn about and play the <span class='${text.span2}'>${text.game2}</span>.</p>
                </div>`,

                `<div class='parent'>
                <p>The goal of the <span class='${text.span1}'>${text.game1}</span> is to win as much money as possible.</p>
                <p>All of the money you win during the <span class='${text.span1}'>${text.game1}</span> will be added to
                a "bonus fund,"<br>which you'll receive at the end of the study.</p>
                <p>Your total payment will be $1.50 for your participation, plus all of the money in your bonus fund.</p>
                </div>`],

                part2Strk: [`<div class='parent'>
                <p>To win money in the <span class='${text.span1}'>${text.game1}</span>, you must build "winning streaks."</p>
                <p>A winning streak is a series of consecutive successes.</p>
                <p>The more winning streaks you build, and the longer they last, the more money you'll win.</p>
                </div>`,

                `<div class='parent'>
                <p>To build winning streaks, you'll try to "activate" tiles like this one.</p>
                <p>Activating one or more tiles in a row creates a winning streak.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Winning streaks are worth money. The longer the streak, the more money it's worth.</p>
                <p>Specifically, 1 cent will be added to your bonus fund for each consecutive tile you activate.</p>               
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Tiles will appear on your screen, then disappear very quickly. To activate a tile, you must press your SPACE BAR 
                before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>In the <span class='${text.span1}'>${text.game1}</span>, tiles turn <span class='${text.span1}'>${text.color1}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex1}'></div>
                </div>`,

                `<div class='parent'>
                <p>If you activate a tile, you'll see how many tiles you've activated in a row.</p>
                <p>For instance, if you activate 3 tiles in a row, you'll see the following information:</p>
                <div style='font-size:35px'><p>Current Streak:</p></div><div style='font-size:50px'><p>3</p></div>
                </div>`,

                `<div class='parent'>
                <p>If you miss a tile, your current streak will end, and you'll see how much money the streak was worth.
                <br>This money gets added to your bonus fund.</p>
                <div style='font-size:35px'><p>Your streak was 3</p></div><div style='font-size:50px'><p>+3 cents</p></div>
                </div>`],

                part2Bern: [`<div class='parent'>
                <p>To win money in the <span class='${text.span1}'>${text.game1}</span>, you must achieve "successes."</p>
                <p>The more successes you achieve, the more money you'll win.</p>
                </div>`,

                `<div class='parent'>
                <p>To achieve successes, you'll try to "activate" tiles like this one.</p>
                <p>Activating a tile results in a success.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Successes are worth money. The more tiles you activate, the more money you'll win.</p>
                <p>Specifically, 1 cent will be added to your bonus fund for each tile you activate.</p>               
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Tiles will appear on your screen, then disappear very quickly. To activate a tile, you must press your SPACE BAR 
                before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>In the <span class='${text.span1}'>${text.game1}</span>, tiles turn <span class='${text.span1}'>${text.color1}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex1}'></div>
                </div>`,

                `<div class='parent'>
                <p>If you activate a tile, you'll see that ${text.value} cent${text.plural} was added to your bonus fund:</p>
                <div style='font-size:50px'><p>+${settings.val} cent${text.plural}</p></div>
                </div>`,

                `<div class='parent'>
                <p>If you miss a tile, you'll see that no money was added to your bonus fund.</p>
                <div style='font-size:50px'><p>+0 cents</p></div>
                </div>`],

                part3: [`<div class='parent'>
                <p>You are now ready to play the <span class='${text.span1}'>${text.game1}</span>.</p>
                <p>Once you proceed, the <span class='${text.span1}'>${text.game1}</span> will start immediately, 
                so get ready to press your SPACEBAR.</p>
                <p>Continue to the next screen to begin.</p>
                </div>`]
            },
            r2: {
                part1: [`<div class='parent'>
                <p>Thank you for playing the <span class='${text.span1}'>${text.game1}</span>!</p>
                When you're ready, continue to learn about and play the <span class='${text.span2}'>${text.game2}</span>.</p>
                </div>`,

                `<div class='parent'>
                <p>The <span class='${text.span2}'>${text.game2}</span> is identical to the 
                <span class='${text.span1}'>${text.game1}</span> with two exceptions.</p>
                </div>`],

                part2Strk: [`<div class='parent'>
                <p>First, in the <span class='${text.span2}'>${text.game2}</span>, tiles turn <span class='${text.span2}'>${text.color2}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex2}'></div>
                </div>`,

                `<div class='parent'>
                <p>Second, in the <span class='${text.span2}'>${text.game2}</span>, you'll see how many
                tiles you've activated in a row.</p>
                <p>Thus, in the <span class='${text.span2}'>${text.game2}</span>, 
                you'll be focusing on achieving strings of consecutive successes. In other words, you'll be focusing 
                on building "winning streaks."</p>
                <p>The more winning streaks you build, and the longer they last, the more money you'll win.</p>
                </div>`,

                `<div class='parent'>
                <p>Winning streaks are worth money. The longer the streak, the more money it's worth.</p>
                <p>Specifically, 1 cent will be added to your bonus fund for each consecutive tile you activate.</p>               
                </div>`,

                `<div class='parent'>
                <p>If you activate a tile, you'll see how many tiles you've activated in a row.</p>
                <p>For instance, if you activate 3 tiles in a row, you'll see the following information:</p>
                <div style='font-size:35px'><p>Current Streak:</p></div><div style='font-size:50px'><p>3</p></div>
                </div>`,

                `<div class='parent'>
                <p>If you miss a tile, your current streak will end, and you'll see how much money the streak was worth.
                <br>This money gets added to your bonus fund.</p>
                <div style='font-size:35px'><p>Your streak was 3</p></div><div style='font-size:50px'><p>+3 cents</p></div>
                </div>`],

                part2Bern: [`<div class='parent'>
                <p>First, in the <span class='${text.span2}'>${text.game2}</span>, tiles turn <span class='${text.span2}'>${text.color2}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex2}'></div>
                </div>`,

                `<div class='parent'>
                <p>Second, in the <span class='${text.span2}'>${text.game2}</span>, you won't see the number
                of tiles you've activated in a row.</p>
                <p>Thus, in the <span class='${text.span2}'>${text.game2}</span>,
                you won't be focusing on building winning streaks.<br>
                Instead, you'll be focusing on achieving individual successes.</p>
                <p>The more individual successes you achieve, the more money you'll win.</p>
                </div>`,

                `<div class='parent'>
                <p>Individual successes are worth money. The more tiles you successfully activate, the more money you'll win.</p>
                <p>Specifically, 1 cent will be added to your bonus fund for each tile you activate.</p>               
                </div>`,

                `<div class='parent'>
                <p>If you activate a tile, you'll see that ${text.value} cent${text.plural} was added to your bonus fund:</p>
                <div style='font-size:50px'><p>+${settings.val} cent${text.plural}</p></div>
                </div>`,

                `<div class='parent'>
                <p>If you miss a tile, you'll see that no money was added to your bonus fund.</p>
                <div style='font-size:50px'><p>+0 cents</p></div>
                </div>`],

                part3: [`<div class='parent'>
                <p>You are now ready to play the <span class='${text.span2}'>${text.game2}</span>.</p>
                <p>Once you proceed, the <span class='${text.span2}'>${text.game2}</span> will start immediately, 
                so get ready to press your SPACEBAR.</p>
                <p>Continue to the next screen to begin.</p>
                </div>`]
            }
        };

    // constructor function for round 1 comprehension check loop
    function MakeLoop(span, game, color, round) {

        if (round == 'R1') {
            var attnChkAns = `${text.value} cent${text.plural}`;
            var attnChkName = `attnChk1`;
            var attnChkScale = ["0 cents", ".2 cents", ".4 cents", ".6 cents", ".8 cents", "1 cent"];
            var attnChkPrompt = (settings.streakOrder == 0) ? `How much money is added to your bonus fund for each consecutive tile you activate?` : `How much money is added to your bonus fund for each tile you activate?`;
            var instPage = (settings.streakOrder == 0) ? pages.r1.part2Strk : pages.r1.part2Bern;
        } else {
            var attnChkAns = (settings.streakOrder == 0) ? `Achieving individual successes` : `Building winning streaks`;
            var attnChkName = `attnChk2`;
            var attnChkScale = [`Building winning streaks`, `Achieving individual successes`];
            var attnChkPrompt = `During the <span class='${span}'>${game}</span>, what will you be focusing on?`;
            var instPage = (settings.streakOrder == 0) ? pages.r2.part2Bern : pages.r2.part2Strk;
        };

        var errorMessage = {
            type: "instructions",
            pages: [`<div class='parent'>
            <p>You provided the wrong answer.<br>To make sure you understand the game, 
            please continue to re-read the instructions.</p>
            </div>`],
            show_clickable_nav: true,
        };

        var info = {
            type: "instructions",
            pages: instPage,
            show_clickable_nav: true,
        };

        var compChk = {
            type: 'survey-multi-choice',
            preamble: `<div style="font-size:16px">
                <p>To make sure you understand the <span class='${span}'>${game}</span>,
                please answer the following question.</p></div>`,
            questions: [
                {prompt: attnChkPrompt,
                name: attnChkName, 
                options: attnChkScale}
            ],
            scale_width: 500,
            on_finish: function(data){
                compAns = JSON.parse(data.responses)[attnChkName]
            }
        };

        var conditionalNode = {
            timeline: [errorMessage],
            conditional_function: function() {
                return compAns == attnChkAns ? false : true;
            }
        };

        this.timeline = [info, compChk, conditionalNode];
        this.loop_function = function(){
            return compAns == attnChkAns ? false : true;
        };
    };


    // create instruction variables
    p.intro.preMessage = {
        type: 'survey-multi-choice',
        preamble: `<div style='text-align: left; width: 950px'>
            <p>Welcome! Before you begin this survey, please note the following:</p>
            <p>Unlike some surveys on Prolific, we NEVER deny payment based on performance
            or answers to questions. We simply ask that you try your best, and answer 
            each question as honestly and accurately as possible. No matter what answers you give or how
            you perform, you will be fully compensated. That is a guarantee.</p>
            <p>To ensure that you understand this information, please answer the following question.</p>
            </div>`,
        questions: [
            {prompt: `Will you receive full payment regardless of how you perform and answer questions?`,
            name: `preMessageChk`, 
            options: [`Yes`, `No`]}
        ],
        scale_width: 500,
    };

    p.intro.r1part1 = {
        type: "instructions",
        pages: pages.r1.part1,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r2part1 = {
        type: "instructions",
        pages: pages.r2.part1,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r1part2 = new MakeLoop(text.span1, text.game1, text.color1, 'R1');

    p.intro.r2part2 = new MakeLoop(text.span2, text.game2, text.color2, 'R2');

    p.intro.r1part3 = {
        type: "instructions",
        pages: pages.r1.part3,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r2part3 = {
        type: "instructions",
        pages: pages.r2.part3,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

   /*
    *
    *   TASK
    *
    */

    p.task = {}

    // constructor functions
    function MakeHitFeedback() {
        var e1r1 = Array(settings.pEM[0]).fill(stim.r1.e1);
        var e0r1 = Array(10-settings.pEM[0]).fill(stim.r1.e0);
        var e1r2 = Array(settings.pEM[1]).fill(stim.r2.e1);
        var e0r2 = Array(10-settings.pEM[1]).fill(stim.r2.e0);
        this.R1 = jsPsych.randomization.shuffle(e1r1.concat(e0r1));
        this.R2 = jsPsych.randomization.shuffle(e1r2.concat(e0r2));
    };

    function MakeMissFeedback() {
        var e1r1 = Array(10-settings.pEM[0]).fill(stim.r1.e1);
        var e0r1 = Array(settings.pEM[0]).fill(stim.r1.e0);
        var e1r2 = Array(10-settings.pEM[1]).fill(stim.r2.e1);
        var e0r2 = Array(settings.pEM[1]).fill(stim.r2.e0);
        this.R1 = jsPsych.randomization.shuffle(e1r1.concat(e0r1));
        this.R2 = jsPsych.randomization.shuffle(e1r2.concat(e0r2));
    };

    function MakeLatencyArrays() {
        var arrayR1 = [];
        var arrayR2 = [];
        var fast = Array(10-settings.pM).fill(200);
        var slow = Array(settings.pM).fill(750);
        for (let i = 0; i < ((settings.nTrials/10)-1); i++) {
            arrayR1.push(jsPsych.randomization.shuffle(fast.concat(slow)))
            arrayR2.push(jsPsych.randomization.shuffle(fast.concat(slow)))
        }
        var popped = fast.pop();
        arrayR1.push(jsPsych.randomization.shuffle(fast.concat(slow)));
        arrayR2.push(jsPsych.randomization.shuffle(fast.concat(slow)));
        arrayR1.push(popped);
        arrayR2.push(popped);
        this.R1 = arrayR1.flat();
        this.R2 = arrayR2.flat();
    };

    function MakeProbe(round) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: 'probe'};
        this.stimulus = '<div class="box" style="background-color:gray"></div>';
        this.choices = [32];
        this.trial_duration = function(){ 
            return latency[round][trialNumber] 
        };
        this.on_finish = function(data){
            data.key_press == 32 ? data.TooSlow = 0 : data.TooSlow = 1;
            console.log(trialNumber, settings.streakOrder, settings.nTrials, latency[round][trialNumber])
        };
    };

    function MakeResponse(round) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `activation_${round}`};
        this.stimulus = function(){
            if (jsPsych.data.get().last(1).values()[0].key_press == 32) {
                return (round == 'R1') ? stim.r1.m1 : stim.r2.m1
            } else {
                return (round == 'R1') ? stim.r1.m0 : stim.r2.m0
            }
        };
        this.choices = [32];
        this.response_ends_trial = false;
        this.trial_duration = 1000;
        this.on_finish = function(){
            jsPsych.data.get().last(2).values()[0].key_press != 32 ? misses++ : hits++;
        };      
    };

    var streak = 0,
        length = 0
        streakEarnings = 0
        trialNumber = 0

    function MakeFeedback(round, span, game) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `feedback_${round}`};
        this.stimulus = function(){ 
            trialNumber++;
            var img = (jsPsych.data.get().last(2).values()[0].key_press == 32) ? hitFeedback[round][hits-1] : missFeedback[round][misses-1]

            if (round == 'R1' && settings.streakOrder == 1 || round == 'R2' && settings.streakOrder == 0) {
                if (img == "failure") {
                    feedbackText = `<div style='font-size: 50px'>+0 cents</div>`
                } else {
                    feedbackText = `<div style='font-size: 50px'>+${settings.val} cent${text.plural}</div>`
                }
            } else {
                img == "success" ? streak++ : (length = streak, streakEarnings = length*settings.val, streak = 0);
                if (streak == 0 & length > 0) {
                    feedbackText = `<div style='font-size:35px'><p>Your streak was ${length}</p></div><div style='font-size:50px'><p>+${streakEarnings} cents</p></div>`;
                } else {
                    feedbackText = `<div style='font-size:35px'><p>Current Streak:</p></div><div style='font-size:50px'><p>${streak}</p></div>`;
                }
                if (trialNumber == settings.nTrials) {
                    streak = 0;
                    length = 0;
                    streakEarnings = 0;
                }
            }

            return feedbackText
        };
        this.on_finish = function(data){
            if (misses == 10) { 
                misses = 0;
                missFeedback = new MakeMissFeedback();
            };
            if (hits == 10) {
                hits = 0;
                hitFeedback = new MakeHitFeedback();
            };
            if (trialNumber == settings.nTrials) {
                trialNumber = 0;
            };
            jsPsych.data.get().last(3).values()[0].key_press == 32 ? data.Jackpot = true : data.Jackpot = false;      
        };
        this.choices = jsPsych.NO_KEYS;
        this.trial_duration = 2000;
    };

    function MakeDelay(round) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `ITI_${round}`};
        this.stimulus = "";
        this.choices = [32];
        this.trial_duration = function() {
            return jsPsych.randomization.sampleWithoutReplacement(ITI, 1)[0];
        };
        this.on_finish = function(data) {
            tNum++;
            data.key_press == 32 ? data.TooFast = 1 : data.TooFast = 0;
        };
    };

    function MakeTooFast(round) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `tooFastMessage_${round}`};
        this.choices = jsPsych.NO_KEYS;
        this.stimulus = function() {
            var message = `<div style='font-size: 20px'><p>Too Fast!</p><p>Please wait for the tile to appear 
            before pressing your SPACEBAR</p></div>`;
            return (jsPsych.data.get().last(1).values()[0].key_press == 32) ? message : '';
        };
        this.trial_duration = function() {
            return (jsPsych.data.get().last(1).values()[0].key_press == 32) ? 2500 : 0;
        };
        this.post_trial_gap = function() {
            return (jsPsych.data.get().last(1).values()[0].key_press == 32) ? 1000 : 0;
        };
    };

    // temporary data
    var hitFeedback = new MakeHitFeedback(),
        missFeedback = new MakeMissFeedback(),
        latency = new MakeLatencyArrays(),
        ITI = [250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000],
        hits = 0,
        misses = 0,
        tNum = 0,
        totalJackpotsR1,
        totalJackpotsR2,
        totalJackpots

    // trial variables
    var probeR1 = new MakeProbe('R1'),
        probeR2 = new MakeProbe('R2'),
        responseR1 = new MakeResponse('R1'),
        responseR2 = new MakeResponse('R2'),
        feedbackR1 = new MakeFeedback('R1', text.span1, text.game1),
        feedbackR2 = new MakeFeedback('R2', text.span2, text.game2),
        delayR1 = new MakeDelay('R1'),
        delayR2 = new MakeDelay('R2'),
        tooFastR1 = new MakeTooFast('R1'),
        tooFastR2 = new MakeTooFast('R2')

    p.task.round1 = {
        timeline: [delayR1, tooFastR1, probeR1, responseR1, feedbackR1],
        repetitions: settings.nTrials,
    };

    p.task.round2 = {
        timeline: [delayR2, tooFastR2, probeR2, responseR2, feedbackR2],
        repetitions: settings.nTrials,
    };

   /*
    *
    *   QUESTIONS
    *
    */

    p.Qs = {};

    // scales
    var zeroToExtremely = ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8<br>Extremely'];
    var zeroToALot = ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8<br>A lot'];

    // constructor functions
    var flowQs = function(span, name, round) {
        this.type = 'survey-likert';
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px'>

        <p>Thank you for completing the <span class='${span}'>${name}</span>!</strong></p>

        <p>During the <span class='${span}'>${name}</span>, to what extent did you feel immersed 
        and engaged in what you were doing?<br>Report how immersed and engaged you felt by 
        answering the following questions.</p></div>`;
        this.questions = [
            {prompt: `During the <span class='${span}'>${name}</span>, to what extent did you feel absorbed in what you were doing?`,
            name: `absorbed_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel immersed in what you were doing?`,
            name: `immersed_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel engaged in what you were doing?`,
            name: `engaged_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel engrossed in what you were doing?`,
            name: `engrossed_${round}`,
            labels: zeroToExtremely},
        ];
        this.randomize_question_order = false;
        this.scale_width = 500;
    };

    var enjoyQs = function(span, name, round) {
        this.type = 'survey-likert';
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px'>

        <p>Below are a few more questions about the <span class='${span}'>${name}</span>.</p><p>Instead of asking about immersion and
        engagement, these questions ask about <strong>enjoyment</strong>.<br>Report how much you <strong>enjoyed</strong> 
        the <span class='${span}'>${name}</span> by answering the following questions.</p></div>`;
        this.questions = [
            {prompt: `How much did you enjoy playing the <span class='${span}'>${name}</span>?`,
            name: `enjoyable_${round}`,
            labels: zeroToALot},
            {prompt: `How much did you like playing the <span class='${span}'>${name}</span>?`,
            name: `like_${round}`,
            labels: zeroToALot},
            {prompt: `How much did you dislike playing the <span class='${span}'>${name}</span>?`,
            name: `dislike_${round}`,
            labels: zeroToALot},
            {prompt: `How much fun did you have playing the <span class='${span}'>${name}</span>?`,
            name: `fun_${round}`,
            labels: zeroToALot},
            {prompt: `How entertaining was the <span class='${span}'>${name}</span>?`,
            name: `entertaining_${round}`,
            labels: zeroToExtremely},
        ];
        this.randomize_question_order = false;
        this.scale_width = 500;
    };

    var pMQ = function (span, name, round) {
        this.type = 'survey-html-form';
        this.preamble = `<p>In the <span class='${span}'>${name}</span>, you attempted to activate many tiles. 
        <br>What percentage of the tiles do you think you activated successfully?</p>
        <p>In the space below, type a number from 0 to 100<br>indicating the percentage of tiles you think you activated successfully.`;
        this.html = `<p>%<input name="pMBlief_${round}" type="text" /></p>`;
    };
    
    p.Qs.round1 = {
        timeline: [new flowQs(text.span1, text.game1, 'R1'), new enjoyQs(text.span1, text.game1, 'R1'), new pMQ(text.span1, text.game1, 'R1')]
    };

    p.Qs.round2 = {
        timeline: [new flowQs(text.span2, text.game2, 'R2'), new enjoyQs(text.span2, text.game2, 'R2'), new pMQ(text.span2, text.game2, 'R2')]
    };

    p.Qs.demographics = (function() {
        var gender = {
            type: 'html-button-response',
            stimulus: '<p>Gender:</p>',
            choices: ['Male', 'Female', 'Other'],
        };
        var age = {
            type: 'survey-text',
            questions: [{prompt: "Age:", name: "age"}],
        }; 
        var ethnicity = {
            type: 'html-button-response',
            stimulus: '<p>Ethnicity:</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
        };
        var english = {
            type: 'html-button-response',
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
        };  
        var finalWord = {
            type: 'survey-text',
            questions: [{prompt: "Questions? Comments? Complains? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: function(data){
                totalJackpotsR1 = jsPsych.data.get().filter({Trial_Type: 'feedback_R1', Jackpot: true}).count();
                totalJackpotsR2 = jsPsych.data.get().filter({Trial_Type: 'feedback_R2', Jackpot: true}).count();
                totalJackpots = totalJackpotsR1 + totalJackpotsR2;
            },
        }; 
        var email = {
            type: 'survey-text',
            questions: [{prompt: "", placeholder: "Prolific ID", name: "PID", columns: 50, required: true}],
            button_label: ['CLICK HERE TO FINISH'], 
            preamble: function() {
                var totalCents = totalJackpots;
                return `<p>Thank you for participating!</p><p>In total, you won <b>${totalCents} cents</b> in bonus money!
                <br>Within one week, you will receive your bonus money. Your $1.50 for participating will be delivered immediately.</p>
                <p>To receive payment, enter your Prolific ID in the space below.</p>`
            },
        };
        var demos = {
            timeline: [gender, age, ethnicity, english, finalWord, email]
        };

        return demos;
    }());


    return p;

}());