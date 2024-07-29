
      /* 初始化 jsPsych */
      var jsPsych = initJsPsych({
          on_finish: function() {
            jsPsych.data.displayData();
          }
      });

      /* 创建时间线 */
      var timeline = [];

      /* 定义欢迎页面指导语 */
      var welcome = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>亲爱的同学：<br>你好！<br>欢迎参加本次实验！<br><br>（按<strong>空格键</strong>继续）</p>",
        choices: [' '],
      };
      timeline.push(welcome);

      /* 定义指导语 */
      var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
          <p> 你将看到一张人物眼部区域图片，图片的四周有 4 个形容词，分别对应键盘按键的<strong>“Q” “Z” “M” “O”</strong>，<br>请你把手指放于这4个字母上，并仔细观察每一双眼睛图片，选择最适合图片中人物的所想和所感的词，<br>并按下对应按键。你可能觉得不止一个词合适，但是请选择一个你认为最佳的词。<br>虽然没有时间限制，但是请尽快尽可能准确的完成任务。<br><br>准备好后，请按<strong>空格键</strong>开始进入练习阶段。</p>
        `,
        choices: [' '],
        post_trial_gap: 2000
      };
      timeline.push(instructions);

      /* 设置练习阶段材料 */
      var practice_stimuli = [
        { stimulus: 'images/实验图片/练习-1/练习1.png', correct_response:'o'},
        { stimulus: 'images/实验图片/练习-1/练习2.png', correct_response:'o'},
        { stimulus: 'images/实验图片/练习-1/练习3.png', correct_response:'z'},
        { stimulus: 'images/实验图片/练习-1/练习4.png', correct_response:'o'},
        { stimulus: 'images/实验图片/练习-1/练习5.png', correct_response:'q'},
        { stimulus: 'images/实验图片/练习-1/练习6.png', correct_response:'m'},
      ];

      /* 设置注视点 */
      var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size:60px;color:white">+</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
        data: {
          task: 'fixation'
        }
      };

      /* 调用练习材料 */
      var practice_trial = {
        type: jsPsychImageKeyboardResponse,
        stimulus: jsPsych.timelineVariable('stimulus'),
        stimulus_height: 635,
        stimulus_width: 1100,
        choices: ['q', 'o','z', 'm'],
        data: {
          task: 'response',
          correct_response: jsPsych.timelineVariable('correct_response')
        },
        on_finish: function(data){
          data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
        }
      };

      /* 预加载图片 */
      jsPsych.pluginAPI.preloadImages(timeline);

      /* 练习程序设置 */
      var practice_procedure = {
        timeline: [fixation, practice_trial],
        timeline_variables: practice_stimuli,
        randomize_order: true
      }
  
      // 将练习阶段和练习结束指导语添加到时间线
  timeline.push(practice_procedure);

/* 练习结束，用户决定是否返回 */
var practice_finish = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>通过前面的练习，如果你还不太了解本实验，想回去继续练习，请按<strong>"Q"</strong>键。如果你已经了解本实验的过程及具体的操作要求，可以进行正式实验，请按<strong>"O"</strong>键。请选择：<br>
    【Q】——继续练习，【O】——正式实验</p> `,
  choices: ['Q', 'O'], // 确保按键与刺激文本中的指示一致
  on_finish: function(data) {
    var response = data.response;
    if (response === 'Q') {
      // 如果用户选择 "Q"，重复练习程序
      jsPsych.goToTimeline(practice_procedure);
    } else if (response === 'O') {
      // 如果用户选择 "O"，开始正式实验程序
      jsPsych.goToTimeline(test_procedure);
    }
  },
  post_trial_gap: 2000
};

// 添加 practice_finish 到 timeline
timeline.push(practice_finish);

    /* 设置正式实验阶段材料 */
    var test_stimuli = [
    { stimulus: "images/实验图片/正式实验/正式实验1.png", correct_response:'o'},
    { stimulus: "images/实验图片/正式实验/正式实验2.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验3.png", correct_response:'m'},
    { stimulus: "images/实验图片/正式实验/正式实验4.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验5.png", correct_response:'z'},
    { stimulus: "images/实验图片/正式实验/正式实验6.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验7.png", correct_response:'z'},
    { stimulus: "images/实验图片/正式实验/正式实验8.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验9.png", correct_response:'m'},
    { stimulus: "images/实验图片/正式实验/正式实验10.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验11.png", correct_response:'o'},
    { stimulus: "images/实验图片/正式实验/正式实验12.png", correct_response:'z'},
    { stimulus: "images/实验图片/正式实验/正式实验13.png", correct_response:'m'},
    { stimulus: "images/实验图片/正式实验/正式实验14.png", correct_response:'o'},
    { stimulus: "images/实验图片/正式实验/正式实验15.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验16.png", correct_response:'z'},
    { stimulus: "images/实验图片/正式实验/正式实验17.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验18.png", correct_response:'z'},
    { stimulus: "images/实验图片/正式实验/正式实验19.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验20.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验21.png", correct_response:'o'},
    { stimulus: "images/实验图片/正式实验/正式实验22.png", correct_response:'o'},
    { stimulus: "images/实验图片/正式实验/正式实验23.png", correct_response:'m'},
    { stimulus: "images/实验图片/正式实验/正式实验24.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验25.png", correct_response:'o'},
    { stimulus: "images/实验图片/正式实验/正式实验26.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验27.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验28.png", correct_response:'m'},
    { stimulus: "images/实验图片/正式实验/正式实验29.png", correct_response:'o'},
    { stimulus: "images/实验图片/正式实验/正式实验30.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验31.png", correct_response:'z'},
    { stimulus: "images/实验图片/正式实验/正式实验32.png", correct_response:'m'},
    { stimulus: "images/实验图片/正式实验/正式实验33.png", correct_response:'q'},
    { stimulus: "images/实验图片/正式实验/正式实验34.png", correct_response:'q'},
    ];

      /* 设置注视点 */
  var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000,
    data: {
      task: 'fixation'
    }
  };

  /* 调用正式实验材料 */
  var test_trial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    stimulus_height: 635,
    stimulus_width: 1100,
    choices: ['q', 'o','z', 'm'],
    data: {
      task: 'response',
      correct_response: jsPsych.timelineVariable('correct_response')
    },
    on_finish: function(data){
      data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    }
  }

  /* 正式程序设置 */
  var test_procedure = {
    timeline: [fixation, test_trial],
    timeline_variables: test_stimuli,
    randomize_order: true
  }

  timeline.push(test_procedure);

  /* 开始运行 */
  jsPsych.run(timeline);

  let end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>你已完成测试。按下空格或 5 秒后自动退出</p>",
    trial_duration: 5000,
    response_ends_trial: true,
    choices: [32], // 使用空格键的ASCII码作为有效的响应键
  };

  // 将结束页面添加到时间线的末尾
  timeline.push(end);
