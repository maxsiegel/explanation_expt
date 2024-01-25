// ensures that script doesn't proceed without JSON being loaded
$.ajaxSetup({
    async: false
});

// use timestamp for sub id
var id = getFormattedDate();

var stimuli = $.getJSON("json/stim.json").responseJSON;

/////////////////////////////////////////////////////////
// uncomment to randomize trials!!                     //
// stimuli = jsPsych.randomization.shuffle(stimuli;    //
/////////////////////////////////////////////////////////

var jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
})

function make_text_trial(text) {

    function format_text(text) {
        return "<b>" + text + "</b>"
    }

    var trial = {
        type: jsPsychHtmlSliderResponse,
        stimulus: format_text(text),

        //// extra stuff to save
        // data: {
        //     task: 'response',
        // },

        on_finish: function(data) { // trial data
            // update progress bar
            var curr_progress = jsPsych.getProgressBarCompleted();
            jsPsych.setProgressBar(curr_progress + (1 / n_trials));

            // save data after each trial
            saveData(id, jsPsych.data.get().csv());
        }
    }
    return trial;
}

var done = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "done",

    on_start: function() {
        saveData(id, jsPsych.data.get().csv());
    }
}

var trials = [];

var n_blocks = 2;
var trials_per_block = 2;
var n_trials = n_blocks * trials_per_block;

var start = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Press any key to start.',
    on_start: function() {
        restyle_progress_bar();
        jsPsych.setProgressBar(0);
    }
}

for (var t = 0; t < n_trials; t++) {
    trials.push(make_text_trial(stimuli[t]));

    ///////// we may want to display a message after every N trials, etc
    // if (((t + 1) % trials_per_block == 0) && ((t + 1 < n_trials))) {
    //     trials.push(make_feedback_trial());
    // }
}

// this is here so that we can specify properties that all frames should have, in this case 'id'
var trial_proc = {
    // background_color: 'black',
    data: {
        id: id
    },
    timeline: trials,
}

timeline = [start, trial_proc, done]

jsPsych.run(timeline);