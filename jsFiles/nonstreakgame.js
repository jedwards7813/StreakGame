// Define Stimuli


var nonStreakGame = (function() {

    var p = {};

    // randomly assign to conditions
    var settings = {
        colorOrder: Math.floor(Math.random()*2),
        pMCondition: Math.floor(Math.random()*4),
        pM: Array([1,5], [5,1], [5,9], [9,5])[Math.floor(Math.random()*4)],
        pEM: [10, 10],
        val: 1,
    };

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
        pM_NonStreak: settings.pM,
        pEM_NonStreak: settings.pEM,
        colorOrder_NonStreak: settings.colorOrder,
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
                </div>`],

                part2: [`<div class='parent'>
                <p>The goal of the <span class='${text.span1}'>${text.game1}</span> is to win as much money as possible.</p>
                <p>All of the money you win during the <span class='${text.span1}'>${text.game1}</span> will be added to
                a "bonus fund,"<br>which you'll receive at the end of the study.</p>
                <p>Your total payment will be $1.50 for your participation, plus all of the money in your bonus fund.</p>
                </div>`,

                `<div class='parent'>
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
                <p>Activating 1 tile is worth ${settings.val} cent${text.plural}, activating 2 tiles is worth ${settings.val*2} cent${text.plural}, and so forth.</p>
                <p>When you're ready, continue to learn how to activate tiles.</p>
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
                </div>`,

                `<div class='parent'>
                <p>First, in the <span class='${text.span2}'>${text.game2}</span>, tiles turn 
                <span class='${text.span2}'>${text.color2}</span> if activated.</p>
                <div class='box' style='background-color:${text.hex2}'></div>
                </div>`,

                `<div class='parent'>
                <p>Second, in the <span class='${text.span2}'>${text.game2}</span>, you'll have ${text.speedChange1} time 
                to activate the tiles.<br>Thus, in the <span class='${text.span2}'>${text.game2}</span>, ${text.speedChange2}.</p>
                <div class='box' style='background-color:${text.hex2}'></div>
                </div>`,

                `<div class='parent'>
                <p>You are now ready to play the <span class='${text.span2}'>${text.game2}</span>.</p>
                <p>Once you proceed, the <span class='${text.span2}'>${text.game2}</span> will start immediately, 
                so get ready to press your SPACEBAR.</p>
                <p>Continue to the next screen to begin.</p>
                </div>`]
            }
        };

    // constructor function for comprehension check loop
    function MakeLoop(span, game, color, round) {

        var numCentsScale = ["0 cents", ".2 cents", ".4 cents", ".6 cents", ".8 cents", "1 cent"];

        var errorMessage = {
            type: "instructions",
            pages: [`<div class='parent'>
            <p>You provided the wrong answer.<br>To make sure you understand how to play, 
            please continue to re-read the instructions.</p>
            </div>`],
            show_clickable_nav: true,
        };

        var info = {
            type: "instructions",
            pages: pages.r1.part2,
            show_clickable_nav: true,
        };

        var compChk1 = {
            type: 'survey-multi-choice',
            preamble: `<div style="font-size:16px">
                <p>To make sure you understand the rules of the <span class='${span}'>${game}</span>,
                please answer the following question.</p></div>`,
            questions: [
                {prompt: `How much money is added to your bonus fund for each tile you activate?`,
                name: `numCentsScale`, 
                options: numCentsScale}
            ],
            scale_width: 500,
            on_finish: function(data){
                compAns1 = JSON.parse(data.responses)[`numCentsScale`]
            }
        };

        var conditionalNode = {
            timeline: [errorMessage],
            conditional_function: function() {
                return compAns1 == `${settings.val} cent${text.plural}` ? false : true;
            }
        };

        this.timeline = [info, compChk1, conditionalNode];
        this.loop_function = function(){
                return compAns1 == `${settings.val} cent${text.plural}` ? false : true;
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

    p.intro.r1part3 = {
        type: "instructions",
        pages: pages.r1.part3,
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
        var fastR1 = Array(10-settings.pM[0]).fill(200);
        var slowR1 = Array(settings.pM[0]).fill(750);
        var fastR2 = Array(10-settings.pM[1]).fill(200);
        var slowR2 = Array(settings.pM[1]).fill(750);
        this.R1 = jsPsych.randomization.shuffle(fastR1.concat(slowR1));
        this.R2 = jsPsych.randomization.shuffle(fastR2.concat(slowR2));
    };

    function MakeProbe(round) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: 'probe'};
        this.stimulus = '<div class="box" style="background-color:gray"></div>';
        this.choices = [32];
        this.trial_duration = function(){ 
            return trialNumber + 1 == p.task.round1.repetitions ? 180 : latency[round][tNum-1] 
        };
        this.on_finish = function(data){
            data.key_press == 32 ? data.TooSlow = 0 : data.TooSlow = 1;
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

    function MakeFeedback(round, span, game) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `feedback_${round}`};
        this.stimulus = function(){ 
            trialNumber++
            var img = (jsPsych.data.get().last(2).values()[0].key_press == 32) ? hitFeedback[round][hits-1] : missFeedback[round][misses-1]
            
            if (img == "failure") {
                feedbackText = `+0 cents`
            }
            else if (img == "success") {
                feedbackText = `+${settings.val} cent${text.plural}`
            }

            return `<div style='font-size: 50px'>${feedbackText}</div>`
        };

        this.on_finish = function(data){
            if (tNum == 10) {
                tNum = 0;
                latency = new MakeLatencyArrays();
            };
            if (misses == 10) { 
                misses = 0;
                missFeedback = new MakeMissFeedback();
            };
            if (hits == 10) {
                hits = 0;
                hitFeedback = new MakeHitFeedback();
            };
            if (trialNumber == p.task.round1.repetitions) {
                trialNumber = 0;
            };
            jsPsych.data.get().last(3).values()[0].key_press == 32 ? data.Jackpot = true : data.Jackpot = false;   
            console.log(data.Jackpot, trialNumber);         
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
        trialNumber = 0,
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
        repetitions: 50,
    };

    p.task.round2 = {
        timeline: [delayR2, tooFastR2, probeR2, responseR2, feedbackR2],
        repetitions: 50,
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
        and engaged in what you were doing? Report how immersed and engaged you felt by 
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

        <p>Below are a few more questions about the <span class='${span}'>${name}</span>. Instead of asking about immersion and
        engagement, these questions ask about <strong>enjoyment</strong>. Report how much you <strong>enjoyed</strong> 
        the <span class='${span}'>${name}</span><br>by answering the following questions.</p></div>`;
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