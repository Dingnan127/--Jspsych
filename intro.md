# 使用JSpsych设计眼区阅读状态测验

## 简介

欢迎来到本教程！<br />JsPsych 是一套直接基于网页的 JavaScript 实验程序框架。它不像其他的心理学实验软件，依靠一个平台进行，而是直接面向网页进行编写和开发。本教程可以帮你进行基本的JSpsych入门，帮助你从0开始，设计一个完整的心理学实验。

## 设计前准备工作

- 了解JSpsych的网页组成元素，我们会需要几个文件：
```
- index.html （网页本体文件，告诉浏览器这个网页里有什么，应当加载什么内容），即HTML，在这里面，将编写一些可执行的JavaScript代码。
- styles.css （用来定义网页元素的样式，如大小、粗细、长宽、字体、字号等），即使用CSS样式设计。
```
- 下载并安装一个代码文本编辑器，如 VSCode，在本教程中，我们会在VSCode中进行代码编写。

![alt text](image.png)

## 正式开始

### 1、创建一个html文件
- 在资源管理器中，新建一个尾缀为“.html”的文件，网页的结构都将编码到这个文件里。
- 再创建一个尾缀为“css”的文件，这个文件里我们会进行网页的样式设计。

### 2、用Javascript语言编写实验脚本

- 下方是一个最基本的网页代码框架
```
<!DOCTYPE html>
<html>
<head>
    <title>眼区阅读状态测验（RMET）</title>
</head>
<body>
   <script src="./scripts/exp.js"></script> <!--载入RMET.js代码文件-->
</body>
</html>
```
### 3、引入相应插件
- 随后，在<head>与</head>标签之间，插入这些新的内容：
```
<script src="https://unpkg.com/jspsych@7.3.4"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.3"></script>
    <script src="jspsych/plugin-categorize-image.js"></script>
    <link href="https://unpkg.com/jspsych@7.3.4/css/jspsych.css" rel="stylesheet" type="text/css" >
    <link rel="stylesheet" href="./style.css">
    <meta name= viewportcontent="width=device-width,initial-scale=1.0">
    <link media="min-width:500px" href="main.css">
    <link media="max-width:500px" href="mobile.css">
```
### 4、编辑 rmet.js 网页结构代码文件

- 打开rmet.js文件，首先进行文件的初始化和创建时间线：
```
  var jsPsych = initJsPsych();

  /* 初始化 jsPsych */
  var jsPsych = initJsPsych({
        on_finish: function() {
        jsPsych.data.displayData();
        }
    });

    /* 创建时间线 */
  var timeline = [];
```

- 然后，编写指导语：
```
/* 定义欢迎页面指导语 */
    var welcome = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "<p>亲爱的同学：<br>你好！<br>欢迎参加本次实验！<br><br>（按<strong>空格键</strong>继续）"
    };
    timeline.push(welcome);

/* 定义指导语 */
    var instructions = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: ` <p> 你将看到一张人物眼部区域图片，图片的四周有 4 个形容词，分别对应键盘按键的<strong>“Q” “Z” “M” “O”</strong>，<br>请你把手指放于这4个字母上，并仔细观察每一双眼睛图片，选择最适合图片中人物的所想和所感的词，<br>并按下对应按键。你可能觉得不止一个词合适，但是请选择一个你认为最佳的词。<br>虽然没有时间限制，但是请尽快尽可能准确的完成任务。<br><br>准备好后，请按<strong>空格键</strong>开始进入练习阶段。</p>`,
      post_trial_gap: 2000
    };
    timeline.push(instructions);
```

- 之后，编写练习的代码：
```
 /* 设置练习阶段材料 */
    var practice_stimuli = [
    { stimulus: 'images/实验图片/练习-1/练习1.png', correct_response:'o'},
    { stimulus: 'images/实验图片/练习-1/练习2.png', correct_response:'o'},
    { stimulus: 'images/实验图片/练习-1/练习3.png', correct_response:'z'},
    { stimulus: 'images/实验图片/练习-1/练习4.png', correct_response:'o'},
    { stimulus: 'images/实验图片/练习-1/练习5.png', correct_response:'q'},
    { stimulus: 'images/实验图片/练习-1/练习6.png', correct_response:'m'},
   ]

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
    stimulus_height:635,
    stimulus_width:1100,
    choices: ['q', 'o','z', 'm'],
    data: {
    task: 'response',
    correct_response: jsPsych.timelineVariable('correct_response')
    },
    on_finish: function(data){
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
     }
    }

    /* 预加载图片 */
    jsPsych.pluginAPI.preloadImages(timeline);

    /* 练习程序设置 */
    var practice_procedure = {
    timeline: [fixation, practice_trial],
    timeline_variables: practice_stimuli,
    randomize_order: true
    }
```
- 练习结束后， 需要让被试通过按键反应决定是否再次返回练习阶段，又或是直接进入正式实验：

```
   // 练习结束，用户决定是否返回
   var practice_finish = {
      type: jsPsychHtmlKeyboardResponse,
       stimulus: `
    <p>通过前面的练习，如果你还不太了解本实验，想回去继续练习，请按<strong>"Q"</strong>键。如果你已经了解本实验的过程及具体的操作要求，可以进行正式实验，请按<strong>"P"</strong>键。请选择：<br>
    【Q】——继续练习，【P】——正式实验</p> `,
    choices: ['Q', 'P'],
    on_finish: function(data) {
    // 根据用户的选择来决定下一步操作
      var response = data.response;
      if (response === 'Q') {
        // 如果用户选择 "Q"，重复练习程序
        alert('您已选择继续练习。');
        jsPsych.goToTimeline(instrutions);
        jsPsych.goToTimeline(practice_procedure);

      } else if (response === 'P') {
      // 如果用户选择 "P"，开始正式实验程序
      jsPsych.goToTimeline(test_procedure);
    }
    },
    post_trial_gap: 2000
   };

   // 将练习阶段和练习结束指导语添加到时间线
   timeline.push(practice_procedure);
   timeline.push(practice_finish);
   timeline.push(instructions,practice_procedure);
   timeline.push(practice_finish);
```

- 之后，编写正式实验的代码：
```
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
    stimulus_height:635,
    stimulus_width:1100,
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
```
- 开始运行程序
```
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
```

### 5、使用CSS样式设计网页页面
- CSS样式可以帮助我们调节程序中文字的字体样式、字号大小、行字间距等，还可以帮助我们实现图片刺激的缩放。
我们需要创建一个名为“style.css”的CSS文件，并在html文件里，在head标签底下引入css的外部样式：
```
 <head>
   <link rel="stylesheet" href="./style.css">
 </head>
```
- 接下来，打开css文件，在文件里进行网页样式的设计：
```
p {
  color: white;    /* 字体颜色 */
  font-family:Arial, Helvetica, sans-serif;  /* 字体 */
  font-size: 23px;   /* 字号 */
  text-align: center;  /* 居中 */
  line-height: 1.5;  /* 行间距 */
  }

/* 确保 body 和 html 高度为 100% */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 防止内容溢出 */
}

/* 设置试验容器为全屏 */
.jspsych-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 视口高度 */
}

/* 图片样式 */
.jspsych-trial {
  max-width: 100%; /* 最大宽度为100%，根据父容器宽度缩放 */
  max-height: 100%; /* 最大高度为100%，根据父容器高度缩放 */
  object-fit: contain; /* 保持图片比例 */
}
div {
  background-color: black;   /* 背景颜色 */
  display: block, width 80vw, height 80vh;
```

### 6、测试运行实验
- 编写完成后，保存文件，双击index.html，使其在浏览器中打开，检查实验是否按预期运行。
- 打开网页后，你可以按下键盘的“F12”快捷键，进入开发者模式，便可以看见程序运行的代码，在“控制台”中，可以看见程序的报错，你可以对照着相应地进行修改。

### 7、数据收集与分析
- 程序能够运行完毕后，JsPsych 会在实验结束后在网页上显示数据。您可以将数据导出为 CSV 文件，使用 Excel、R 或其他工具进行分析。

### 结语
恭喜！您已成功创建并运行了您的第一个 JsPsych 实验。本教程仅覆盖了 JsPsych 的基础功能。JsPsych 提供了丰富的插件和功能，您可以根据实验需求进行探索和使用。在实验设计过程中，请确保遵守伦理准则，尊重参与者的隐私和数据安全。