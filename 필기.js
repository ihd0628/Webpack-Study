# Intro

웹사이트를 만들다보면 Javascript, CSS, Image와같은 수많은 파일들이 생겨난다. 
그래서 우리는 완성된 웹사이트를 로딩해보면 정말 많은 파일들이 다운로드된다는것을 알 수 있다. 

이건 좋은게 아니다. 왜냐면 서버와의 접촉이 많을수록 어플리케이션은 느리게 로딩되기 때문이다. 
서버로의 접속은 상당히 비싼 작업이기 때문이다. 

또한 정말 많은 Javascript 패키지들을 사용하다보면 각각의 서로다른 패키지들이 서로같은 이름의 변수나 함수를 사용하면서 
예상하지못한 충돌로 인해서 어플리케이션이 깨지는 경우도 있다. 

이런 문제를 해결하기 위해서 등장한 도구들을 'Bundler' 라고 한다. 

Bundle은 묶는다 는 뜻이다. 
즉, 여러개의 파일을 묶어주는 도구라는 뜻이다. 

Webpack, Broserify, Parcel 같은 도구가 이러한 Bundler에 속한다. 
이중에서 우리는 가장인기있는 Bundler인 Webpack을 공부해 볼것이다. 

Webpack을 이용하면 하나의 Javascript 파일에 Javascript 뿐아니라 CSS Image와같은 여러가지 모듈들을 몰아넣을 수 있다.
동시에 성능향상을 위해서 다시 분리할 수 도 있다. 

특히 Webpack을 둘러싼 생태계가 방대하기 때문에 우리가 WEB 개발 작업에서 필요로하는 정말 다양한 확장기능들이 존재한다. 
덕분에 아주 많은 작업들을 자동화 할 수 있다. 

안타깝게도 Webpack은 쉽지 않다. 
뒤로 갈 수록 점점 중요하지 않지만 어려운 내용에대해 공부할 것 이다. 

그러니 공부하다 이쯤했다 싶으면 다시 현장으로 돌아가고 부족할것같으면 다시 돌아와서 배우자. 
어차피 공부는 평생 해야하는것.



# 웹팩이전의 세계와 모듈의 개념

웹펙없이 한번 간단한 웹사이트를 만들어보고 왜 웹펙이 필요한지 아라보자.

******************************************************************************************************************************************************************
(index.html)

<html>
    <body>
        <h1>Hello, Webpack</h1>
        <div id="root"></div>
    </body>
</html>
******************************************************************************************************************************************************************

위와같은 HTML 문서를 만든 뒤 저 root 안에 Hello World 라는 텍스트를 Javascript로 넣는 웹어플리케이션을 만들어볼것이다. 

그러기 위해 "source" 라는 폴더를 만들고 hello.js, world.js 라는 Javascript파일을 만든다. 
그리고 그 안에 word 라는 변수를 만들고 각각 "hello", "world" 텍스트를 변수안에 넣어준다. 

******************************************************************************************************************************************************************
(hello.js)
const word = "hello";

(world.js)
const word = "world";
******************************************************************************************************************************************************************


이제 저 hello.js와 world.js 를 index.html에 아래처럼 로딩한 후
body안의 script에 word라는 변수를 root안에 넣어주도록 명령해주면 어떤 결과가 나올까?

******************************************************************************************************************************************************************
(index.html)

<html>
    <head>
        <script src="./source/hello.js"></script>
        <script src="./source/world.js"></script>
    </head>
    <body>
        <h1>Hello, Webpack</h1>
        <div id="root"></div>
        <script>
            document.querySelector('#root').innerHTML = word;
        </script>
    </body>
</html>
******************************************************************************************************************************************************************


Hello, Webpack
hello

브라우저창에서는 hello 만 나온다. 
당연하지 이름이 서로 충돌하니까 그리고 거기서 그냥 뭐 어떤 모종의 순서와 이유로 인해 hello가 이긴거고. 

이처럼 우리는 하나의 어플리케이션을 만들 때 여러 Javascript 파일을가져오고 각기 다른 파일들에는 같은 이름의 변수들이 있을 가능성은 너무나도 농후하다. 
마치 폴더기능이 없는 파일시스템과도 같지. 그냥 파일들만 난잡하게 다 들어있는것과도 같은 상태인거다. 

이러한 문제를 극복하기 위해 등장한 개념이 module 이라는것이고 웹브라우저에는 기본적으로 최신의 브라우저에는 탑재가 되어있다. 
일단 hello.js 와 world.js 에서 각각의 word 변수를 export 해준 뒤

******************************************************************************************************************************************************************
(hello.js)
const word = "hello";
export default word;

(world.js)
const word = "world";
export default word;
******************************************************************************************************************************************************************

아래처럼 html에서 <script src = ''></script> 이거 지워주고 

body안의 script type을 module로 바꿔준뒤 .
각각의 Javascript 파일에서 export한 변수둘을 받아와서 
넣어주면 같은 이름의 변수여도 서로 다르게 구분하여 가져온 뒤 사용할 수 있게된다. 

******************************************************************************************************************************************************************
(index.html)

<html>
    <body>
        <h1>Hello, Webpack</h1>
        <div id="root"></div>
        <script type="module">
            import hello_word from '/source/hello.js';
            import world_word from '/source/world.js';

            document.querySelector('#root').innerHTML = hello_word + ' ' + world_word;
        </script>
    </body>
</html>
******************************************************************************************************************************************************************

또한 이렇게 module화 하여 변수를 가져오게 되면 또 하나의 장점은 
이전과 달리 word라는 변수에 접근할 수 없게 된다는 점 이다. 
저 word라는 변수는 hello.js, world.js 안에서만 유효하게 되는것이다. 

마치 하나의 디렉토리안에있는 파일의 이름은 그 디렉토리안에서만 유효한것과 똑같은 개념이다. 
이게 모듈이라는 개념이고 Webpack에서 모듈이라는 개념을 이해하는것은 아쥬 중요하다.

자 그러면 요기에 어떤 문제가 있는지 아라보자. 
일단 import, export 는 비교적 최신기술이기에 오래된 웹브라우저에서는 동작하지 않는다. 

그리고 또 하나는 각각의 필요한 Javascript파일을 다운로드 받아야하는데(여기서는 hello.js, world.js) 
만약 이 파일들이 수백개라고하고 또 뭐 CSS Image파일 하여간 오만가지 파일들이 필요하다고 하면 
네트워크 커넥션이 엄청 많아질테고 그러면 사용자와 서비스를제공하는 입장에서도 옴총나게 많은 리소스가 필요하게 된다. 

또한 네트워크에 부하가 많이 생기면서 콤퓨타가 서비스하는 속도도 느려질 수 밖에 없다. 
그러면 빠르게 해주려면 또 돈이 많이 들어가고 이런 안좋은 이유가 있다.

그래서 아주 많은 사람들이 예전부터 web에서도 모듈의 개념을 사용하고싶다는 생각과 
그리고 여러개의 파일을 하나로 묶어서 제공하고싶다는 생각을 한 사람들이 만든 도구가 바로 Bundler 라는 도구이다. 

그리고 이제부터 그 Bundler라는 도구의 대표주자인 Webpack을 공부해보자. 


# 웹팩의 도입

Webpack을 도입했을 떄 얻는 효과는 '리팩토링' 이다. 
리팩토링은 구동되는 방법은 그대로 유지하면서 내부의 코드를 더 효율적으로 바꾸는 행위다. 

즉, 지금 내가 짠 코드의 전체적인 모습은 그대로 유지하면서 구형브라우저에서도 사용할 수 있고 또한 여러개의 파일을 
하나로 묶어서 Bundling 하는것을 Webpack으로 해보는거다. 

그걸 하기위해서 Webpack을 설치해보자. 

$ npm i -D webpack webpack-cli  (2개 설치하는겨)

******************************************************************************************************************************************************************
(package.json)

"devDependencies": {
    "@babel/core": "^7.17.10",
    "@babel/node": "^7.17.10",
    "@babel/preset-env": "^7.17.10",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2"
  }
******************************************************************************************************************************************************************

위처럼 package.json 의 devDependencies항목에 webpack, webpack-cli 가 추가된것을 확인할 수 있다. 
node_modules 에도 같은 이름으로 우리가 webpack을 구동하는데 필요한 두개의 폴더가 생성이되었다. 

본격적인 작업을 시작할건데 
제일먼저 index.html 파일에서 그 파일안에있는 Javascript 코드를 별도의 index.js파일에 빼내야한다. 

******************************************************************************************************************************************************************
(index.html)
<html>
    <body>
        <h1>Hello, Webpack</h1>
        <div id="root"></div>
    </body>
</html>

(index.js)
import hello_word from '/source/hello.js';
import world_word from '/source/world.js';

document.querySelector('#root').innerHTML = hello_word + ' ' + world_word;
******************************************************************************************************************************************************************


그리고 저 index.js 파일은 hello.js 파일과 world.js 파일을 사용하고 있다.
즉, 우리가 만들고있는 어플리케이션의 입구에 해당하는 파일은 index.js 이다. 
그리고 이것을 entry file 이라고 말한다. 

자 그럼 이제 webpack을 이용해서 이 입구에있는 index.js 파일을 번들링을 해서 이 파일이 사용하고 있는 hello.js와 world.js 까지를 
index.js 파일에 번들링을 해볼것이다. (bundle = 묶다.)
그리고 그 떄의 작업한 결과를 public 이라는 폴더안에다 넣을것이다. 

자 그러려면 webpack을 실행을 시켜볼건데 우리가 우리의 프로젝트 폴더에 설치한 webpack을 실행할 때 에는 

$ npx webpack --entry ./source/index.js --output-path ./public --output-filename index_bundle.js 
 -> webpack에게 야 내가 작업하고있는 이 프로젝트에서 입구(entry)에 해당하는 파일은 ./source/index.js 이거얌. 그리고 이것의 출력(output)은 public 디렉토리에 index_bundle.js 라는 이름으로 
    index.js 와 그 안에서 사용하는 모든 파일들을 하나로 만들어서 index_bundle.js 에 가져다놔 라는 명령어다. 
 -> 이미 나의 프로젝트포컬폴더에 설치가되어있으면 npx를 써도 로컬폴더에있는 프로그램이 실행되는것은 이미 공부해서 알고 있다.
 -> npx 패키지를 실행시키는 명령어인것이다.  

그리고 위의 저 명령어를 통해 만들어진 결과를 확인해보면 

******************************************************************************************************************************************************************
(index_bundle.js)
(()=>{"use strict";document.querySelector("#root").innerHTML="hello world"})();
******************************************************************************************************************************************************************

hello.js 와 world.js 가 합쳐진 결과가 index_bundle.js 합쳐져서 들어가게 된것이다. 

이렇게 합쳐진거면 이제 우리는 
index.html 파일에 index_bundle.js 파일만 가져오면 되는것이다. 

******************************************************************************************************************************************************************
(index.html)
<html>
    <body>
        <h1>Hello, Webpack</h1>
        <div id="root"></div>
        <script src="/public/index_bundle.js"></script>
    </body>
</html>

(server.js)
import express from "express";

const app = express();
const PORT = 2000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const homeRender = (req, res) => {
    return res.render('./index.html')
}

app.get("/", homeRender);

app.use("/public", express.static("public"));  <- public URL 로 접근하면 public 폴더의 정적인 파일에 접근가능하게 라우팅해준다. 

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  });
****************************************************************************************************************************************************************** 

 짠 요롷게 index_bundle.js 만 가져오게 해주면 
 나오는 결과는 이전에 index.html에서 뭐 hello.js 가져오고 wordl.js 가져오고 했던거랑 똑같은 결과를 보여주지만 
 내부적으로는 완전히 달라진것이다. 

브라우저의 network를 열고 확인해보면 이전에 webpack을 사용하기 전에는 hello.js, world.js 2개의 파일을 로드했었는데(만약 100개였으면 100개를 다운로드한겨)
근데 webopack을 사용하면 index_bundle.js 단 하나의 파일만 다운로드 받고 저 하나의 파일안에 모든 기능이 다 들어가있는것이다. 
그러면 서버와 단 한번의 커넥션만 일어나기 때문에 사용자도 좋고 서버쪽에서도 좋고 누이좋고 매부좋은것이다. 

또한 동시에 원래 index.js 에서 사용했던 import 라는 비교적 최신의 코드를
알아서 처리해서 모든 구식브라우저에서도 동작할 수 있는 코드로 변환시켜준 것 이다. 
그렇기 때문에 사람의 입장에서는 import 와 같은 아주 세련된 최신의 기능을 쓰면서도 오래된 브라우저에서도 알아먹게 바꿔주는 큰 장점이 또 있는것이다. 


# 설정파일 도입

webpack을 떠나 모든 개발공부를 함에있어서 결국에는 아래의 범위안에 있다. 

INPUT -> PROCESS -> OUTPUT 

webpack은 결국 js, jpg, png ,css, sass, scss 하여간 뭐 이것저것 그냥 온갓것들이 얽히고 설킨 복참한 코드들이 INPUT 으로 들어가 
webapck을 통해 가공되고(PROCESS)
js, css, imageFile 이렇게 단순한 출력물(OUTPUT)을 만들어주는 프로그램인것이다. 

그러려면 일단 webpack한테 이 intput들을 가지고 이렇게해라 저렇게해라 뭐 이것저것 시켜야할텐데 
그 방법을 한번 공부를 해보자. 

$ npx webpack --entry ./source/index.js --output-path ./public --output-filename index_bundle.js

이전시간까지는 위의 명령어를 가지고 webpack을 실행해 보았다. 
근데 이렇게 실행하려면 저 명령문을 복사해서 어디다가 저장을 항상 해놓아야한다. 
귀찮다. 
그리고 내가 만들려는 웹어플리케이션이 점점 사이즈가 방대해질수록 저렇게 명령어로 실행하는게 굉장히 어려워지게 된다. 

그래서 우리는 webpack에게 좀 더 체계적이고 보기좋게, 재사용하기 좋게 시키기위한 방법이 필요하고 그것이 바로 configuration(=구성, 설정) 파일을 만드는것이다. 

파일하나 만들어봅시다. 
webpack.config.js 

그리고 이 파일에 
$ npx webpack --entry ./source/index.js --output-path ./public --output-filename index_bundle.js
이 명령어를 그대로 정리해서 넣어볼것이다. 

webpack 홈페이지로 들어가면 

documentation : webpack의 사용법 
 -> guide : webpack으로 할 수 있는 여러가지 일들을 보여줌. 
 -> configuration: webpack한테 어떤 일을 시킬 때 사용하는 명령들을 보여주는 페이지 
 
요러케 홈페이지가 구성이 되어있는데 저기 configuration 들어가서 보면 
webpack.config.js 의 예제가 있다. 
그거 참고해서 위의 저 명령어와 동일한 동작을 해주는 설정 파일을 만들어보자. 

******************************************************************************************************************************************************************
(webpack.config.js)

const path = require("path"); <- nodeJS 에서 파일의 경로를 내가 쉽게 핸들링할 수 있게 도와주는 일종의 부품을 로드한것

module.exports = {
    entry: "./source/index.js",
    output: {
        path: path.resolve(__dirname, "public"),  <- "__dirname" 요건 현재 webpack.config.js 파일이 위치한 경로를 알려주는 nodeJS의 약속된 변수다. 
        filename: "index_bundle.js"                                            그리고 그 경로의 하위경로의 "public" 이라는 곳에 output 을 가져다 노으라! 라는 뜻이다. 
    }
}
******************************************************************************************************************************************************************

path: path.resolve(__dirname, "public")
 -> "__dirname" 요건 현재 webpack.config.js 파일이 위치한 경로를 알려주는 nodeJS의 약속된 변수다. 
     그리고 그 경로의 하위경로의 "public" 이라는 곳에 output 을 가져다 노으라! 라는 뜻이다. 
 
자 위처럼 코드를 작성해놓으면 저게 바로 
$ npx webpack --entry ./source/index.js --output-path ./public --output-filename index_bundle.js 
이 명령어와 동일한 역할을 하는 파일이 되는것이다. 

그리고 이제 
$ npx webpack --config webpack.config.js 

위의 이 명령어가 저 webpack.config.js 를 실행시키는 명령어이다. 
그리고 실행을 시키면 결과가 잘 나온다. 폴더더 만들어지고 index_bundle.js 도 잘 만들어져있다. 
그리고 우리의 웹어플리케이션도 동일하게 잘 동작한다. 

즉 우리는 webpack.config.js 파일에 시키고싶은걸 적어줌으로서 커맨드라인에서 실행을 시킬 때 에는 
그냥 webpack.config.js 파일만 실행을 시키게 하는것이다. 

근데 webpack.config.js 는 약속된 파일의 이름이기 때문에 
이러한 약속된 파일을 사용한다면 
$ npx webpack
만 해줘도 된다. 


# 모드의 도입 

웹펙의 운영모드라는걸 살펴보자. 
3가지 모드가 있다. 

1. none
2. development
3. production

https://webpack.js.org/configuration/mode/
 -> 요기들어가면 자세한 설명 있음. 

mode를 설정안해주면 일단 기본값은 'production' 이다. 
아래처럼 mode 를 development로 설정해주면 mode가 설정이 된 것 이다. 
mode에 대한 깊은 이해는 추후에 하는거로 하고, 일단 이렇게 개발모드로 마저 공부를 이어간다. 

******************************************************************************************************************************************************************
(webpack.config.js)

const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./source/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "index_bundle.js"
    }
}
******************************************************************************************************************************************************************



# 로더의 도입 

로더는 웹펙의 핵심개념이다. 

만약 index.html 에 CSS를 넣고싶다고 해보자. 
그러면 최종적으로 완성 후 변환된 코드들이 들어가있는 public 폴더에 
style.css 
라는 파일을 만들고 
index.html에서 아래와같이 가져오면 된다. 

******************************************************************************************************************************************************************
(index.html)
<html>
    <head>
        <link rel="stylesheet" href="/public/style.css">
    </head>
    <body>
        <h1>Hello, Webpack</h1>
        <div id="root"></div>
        <script src="/public/index_bundle.js"></script>
    </body>
</html>

(style.css)
body {
    background-color: powderblue;
    color: tomato;
}
******************************************************************************************************************************************************************

자.. 뭐 .. 잘 된다. 
그런데 아쉬운게 브라우저의 네트워크를 확인해보면 
Javascript는 잘 번들링해서 하나의 파일로 가져오기가 되었는데, 
CSS는 따로 또 파일로 가져와야한다는 점 이 마음에 들지 않는다. 

Webpack을 사용해서 Javascript안에 CSS도 함께 번들할 수 있다. 

webpack은 Javascript 뿐만 아니라 CSS 파일, png & jpg 같은 이미지파일도 그냥 같이 번들링 해주는 아주 놀라운 프로그램이다. 
 -> js, css, 이미지 파일 이런것들을 webpack에서는 asset 이라고 말한다. 
그리고 그것을 하는 역할을 해주는게 로더라는것 이고, webpack을 잘 다룬다는것은 로더를 얼마나 잘 자유롭게 옵션을주고 지지고볶는가를 말한다고해도 과언이 아니다. 

그리고 CSS 를 번들링 하기 위해서는 "style-loader", "css-loader" 라는 npm package를 다운로드 받아서 사용해야 한다. 

$ npm i -D style-loader css-loader

다운로드 받은 후 webpack 홈페이지의 메뉴얼 대로 module에 대한 정보를 webpack.config.js 파일에 아래처럼 입력해준다. 

******************************************************************************************************************************************************************
(webpack.config.js)

const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./source/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [                <- 배열인것은 여러가지 처리방법들을 넣을 수 있다는 얘기겠다. 
            {
                test:  /\.css$/,  <- webpack을 통해서 가공하는 여러가지 데이터중에서 확장자가 css 인 파일을 처리하는 방법을 webpack한테 알려주고 싶을 때 는 test 에다가 왼쪽처럼 정규표현식 적어주면 됨. 
                use: [
                    'css-loader'
                ]
            }
        ]
    }
}
******************************************************************************************************************************************************************

위처럼 webpack에서 module을 입력해주면 
webpack을 동작시켰을 때 확장자가 css 인 파일을 만나면 webpack이 알아서 그 css 인 파일을 webpack 안으로 로드시켜주는
특수한 명령이 css-loader 인 것 이다. 

자 그러면 source 폴더에 있는 index.js 에 어떻게 css를 불러오느냐 

webpack을 사용하기전에는 index.html에 css 파일을 기술해줘서 가져왔었는데 
저거랑 똑같은거를 번들링을 통해서 가져오려면 어떻게 하느냐. 

일단 index.html 에서 직접 css를 가져올 필요는 없으니 아래처럼 다 지워준다. 

******************************************************************************************************************************************************************
(index.html)

<html>
    <body>
        <h1>Hello, Webpack</h1>
        <div id="root"></div>
        <script src="/public/index_bundle.js"></script>
    </body>
</html>
******************************************************************************************************************************************************************

그리고 아래처럼 index.js에서 css를 import 해준다. 
또한 style.css 도 이제 번들링할것이기 때문에 public 폴더에서 source 폴더로 옮겨준다. 

******************************************************************************************************************************************************************
(index.js)

import hello_word from './hello.js';
import world_word from './world.js';
import css from './style.css';
import { entry } from './webpack.config.js'

console.log(css);
document.querySelector('#root').innerHTML = hello_word + ' ' + world_word;
******************************************************************************************************************************************************************

자 이렇게 하고 
$ npx webapck
으로 webpack을 실행시키면 어떻게 되느냐 

일단 webpack 이 webpack.config.js 파일을 먼저 본다. 
그리고 config파일에 적혀있는 내용들을 기억하고 있다가 우리가 번들링하려고하는 entry 파일인 index.js 파일에 파일의 내용을 쭉 해석하다 보니까 
확장자가 css인 파트가 있고 그리고 내가 test에 적어놓은대로 확장자가 css인 파일은 use에 적어놓은 css-loader 라는 녀석에게 맡기게 되는것이다. 

그러면 우리가 설치한 css-loader 가 저 style.css 파일을 읽어서 그 파일을 저 css라는 변수안에 세팅해준다. 
그리고 브라우저에서 저 css 변수를 console.log 한 결과를 보면 

[Array(3), toString: ƒ, i: ƒ]
0: Array(3)
0: "./source/style.css"
1: "body {\n    background-color: powderblue;\n    color: tomato;\n}"
2: ""
length: 3
[[Prototype]]: Array(0)
i: ƒ i(modules, media, dedupe, supports, layer)
toString: ƒ toString()
length: 1
[[Prototype]]: Array(0)

위처럼 우리가 만든 css의 내용이 Javascript의 형태로 webpack으로 주입된것을 볼 수 있다. 
그럼 저 css 코드를 우리가 Javascript를 이용해서 이 웹페이지에 낑겨넣으면 되겠지만 

이것조차도 자동으로해주는 또 다른 로더가 있으니 그게 바로 'style-loader' 이다. 

1. css-loader 
-> css파일을 읽어와서 그것을 웹펙으로 가져오는 로더 
2. style-loader
-> 그렇게 가져온 css 코드를 웹페이지안에 스타일태그로 주입해주는 로더 

******************************************************************************************************************************************************************
(webapck.config.js)

const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./source/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
******************************************************************************************************************************************************************

위와같이 2개의 로더를 넣어조고 
$ npx webpack 
을 통해 실행을 시키고 브라우저를 통해 확인하면 
network를 통해 확인했을 시 index_bundle.js 파일만 로드했는데로 
css가 잘 동작하는것을 볼 수 있다. 

브라우저의 element를 통해 html 코드를 확인해보면 
내가 입력한 css 코드가 head 안에 들어가있는것을 볼 수 있다. 

즉, 이 로더라는것은 입력한 asset들을 로더를 통과시키면 그것을 가공해서 우리가 원하는 output을 만들어주는 일종의 가공공정이라고 할 수 있다. 

그리고 그 로더를 내가 세팅하는것이 webpack.config.js 안에서 
module의 rules 라는 부분에 
그 로더에 해당되는 이름을 검출하는 코드를 가져다놓고 <- test: /\.css$/, 이런거
이 조건에 해당되는 파일이 발견되면 이러한 로더들을 통과시켜서 처리해라라고 한것이다.  
-> use: [
    'style-loader',
    'css-loader'
]

그 때 주의해야할 것은 뒤쪽에 있는 로더가 먼저 실행된다. 
css-loader -> style-loader 순서로 동작한다. 

체인이 걸려있는것처럼 동작한다고해서 체이닝이라고 말한다. 



# OUTPUT 설정

다양한 형태의 타입의 파일들을 로드해서 그것을 처리하는 방법을 살펴보았다. 
그러면 이제 어떻게 최종적인 결과를 원하는대로 만들어낼것인가를 아라보쟈. 

최종적인 파일의 이름, 파일을 여러개로 쪼갤건지 아니면 합칠건지 이런것들을 webpack을 통해서 자유롭게 할수있게 공부해보자. 

내가 만든 페이지가 index.html 말고 또 about.html 이라는게 있다고 치자. 
구성은 아래와 같다. 

******************************************************************************************************************************************************************
(index.html)
<html>
    <body>
        <h1>Hello, index</h1>
        <div id="root"></div>
        <script src="/public/index_bundle.js"></script>
        <a href="/about">ABOUT</a>
    </body>
</html>

(about.html)
<html>
    <body>
        <h1>Hello, About</h1>
        <div id="root"></div>
        <script src="/public/about_bundle.js"></script>
        <a href="/index">INDEX</a>
    </body>
</html>
******************************************************************************************************************************************************************

이 떄 우리는 about.html 에는 about_bundle.js 라는 파일을 가져고싶다고 하자. 
물론 index.js 말고 about.js 파일은 따로 존재한다. 
about.js 는 index.js 와 동일하지만 출력단어 순서만 다르게 아래처럼 되어있다. 

******************************************************************************************************************************************************************
(about.js)

import hello_word from './hello.js';
import world_word from './world.js';
import css from './style.css';

console.log(css);
document.querySelector('#root').innerHTML = world_word + ' ' + hello_word;

(index.js)
import hello_word from './hello.js';
import world_word from './world.js';
import css from './style.css';

console.log(css);
document.querySelector('#root').innerHTML = hello_word + ' ' + world_word;
******************************************************************************************************************************************************************

그러면 저 about.js 파일을 쓰기 위해서 about_bundle.js 파일을 public 디렉토리에 만들어야하는데 
그 때 entry파일은 about.js 고 이 파일이 사용하는 여러가지 파일들을 번들링하는 작업을 webpack에게 시키려면 어떻게 해야할까? 
이것을 통해서 여러가지 형태의 output을 만드는 방법을 익힐것이다. 

결국 우리는 index.js 파일과 about.js 파일, 2개의 파일을 번들링하고 싶은거고 
그러려면 webpack.config.js의 entry에 아래처럼 객체로 만들고 이름을 만들어주고 

출력부분에 '[name]_bundle.js' 로 파일이름을 지정해주면 입력의 이름에 따라서 2개의 출력파일이 만들어지게 된다. 


******************************************************************************************************************************************************************
(webpack.config.js)
const path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        index: "./source/index.js",  <- 요렇게 각각 이름정해주고 가져올 파일 지정해주고 
        about: "./source/about.js",
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name]_bundle.js"    <- [name] 을 통해 각각의 entry 파일에 붙인 이름을 가져와서 파일을 만들어주게된다. 여기선 entry파일이 2개니까 출력도 2개의 파일이 나오는거다. 
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
******************************************************************************************************************************************************************

짠 요로케 해주니까 각각의 페이지에서 원하는대로 'hello world' 와 'world hello' 가 각각 잘 출력되고 css 도 잘 로딩된것을 볼 수 있다. 

자 고래서 webapck 홈페이지에서 OUTPUT을 만드는 파트는
configuration으로 들어가서 output으로 들어가면 이것저것 설명이 잘 어렵게 되어있다. 



# 플러그인의 도입

웹펙에는 2가지 형태의 확장기능이 있다. 
첫번쨰는 배웠던 로더, 두번쨰는 플러그인이라는것 이다. 

로더는 우리가가지고있는 모듈을 최종적으로 output으로 만들어가는 과정에서 사용되는것이고 
플러그인은 그렇게해서 만들어진 최종적인 결과물을 변경하는것이라고 생각하자. 

플러그인이 조금 더 복합적이고 자유로운일들을 많이 할 수 있다. 

그중에 우리는 HtmlWebpackPlugin 을 예시로 사용법을 익혀볼것이다. 
 -> html을 자동적으로 생성해주는 플로그인이라고 생각하자. (템플릿을 생성할 때 에도 쓴다.)

########################################################################################################################################
webpack 홈페이지 공식설명

HtmlWebpackPlugin
The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. 
This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. 
You can either let the plugin generate an HTML file for you, supply your own template using lodash templates, or use your own loader.
########################################################################################################################################

1. 설치 

$ npm i -D html-webpack-plugin


2. index.html, about.html 을 source 디렉토리로 옮긴 뒤 index_bundle.js, about_bundle.js 를 로딩하는 코드를 삭제

<html>
    <body>
        <h1>Hello, About</h1>
        <div id="root"></div>
        <a href="./index">INDEX</a>
    </body>
</html>


이제 이 index.html과 about.html을 템플릿으로 해서 webpack으로 번들링을 했을 때 public 디렉토리안에 최종적으로 완성된 html을 생성을 시켜보려한다. 

그러기 위해서 webpack.config.js 파일안에 플러그인을 삽입해볼것이다. 
일단 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
이렇게 플러그인을 직접 가져왔다. 
로더의 경우에는 로더의 이름을 적었다. 
그러나 플러그인은 직접 가져와서 실행을 시켜야 한다.


******************************************************************************************************************************************************************
(webapck.config.js)

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');  <- 플러그인을 로드해왔다.

module.exports = {
    mode: 'development',
    entry: {
        index: "./source/index.js",
        about: "./source/about.js",
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name]_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [       <- 여러개의 플로그인을 가져올 수 있기에 배열을 사용
        new HtmlWebpackPlugin()
    ]
}
******************************************************************************************************************************************************************

###########################################################################################################################################################
(웹팩 홈페이지 HtmlWebpackPlugin 사용 예제)

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
###########################################################################################################################################################

자 이제 실행을 시켜볼건데 
저 public 디렉토리안에 있는 파일들을 지우고 다시 파일을 집어넣으면 깔끔하겠지. 

'$ rm ./public/*.*; npx webpack '

이렇게 명령을 넣어주면 public 디렉토리안의 모든 파일을 지우고 webpack을 실행시켜준다. 

그랫더니 public 디렉토리 안에 index.html 이라는 파일이 생겨났다. 

******************************************************************************************************************************************************************
(/public/index.html)

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"><script defer src="index_bundle.js"></script><script defer src="about_bundle.js"></script></head>
  <body>
  </body>
</html>
******************************************************************************************************************************************************************

그리고 위의 webpack 플로그인이 만들어준 html 파일을 보면 우리가 지금까지 만들었던 번들링된 Javascript파일까지도 자동으로 생성해준다. 
근데 우리가 원하는건 우리의 index.html과 about.html 이 있으니 우리가 만든 이 HTML 파일들을 템플릿으로 해서 여기에 필요한 번들링된 Javascript를 자동으로 추가해서 
그 결과를 public 디렉토리안에 넣어주길 바란다. 

어떻게 하는가?
webpack.config.js 의 플러그인 부분에서 저 플러그인에게 인자를 주면 된다. 

******************************************************************************************************************************************************************
(webpack.config.js)

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

.
.

    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.html',  <- 이걸 템플릿으로 쓰고 실행을 최상위폴더에서 해주니까 이렇게 경로지정해준것
            filename: './index.html'            
        })
    ]
}
******************************************************************************************************************************************************************

자 이제 실행을 시켯더니 index.html 이라는 파일이 생겼고
파일은 아래처럼 index.html을 템플릿으로 해서 생성이 되었고 
이 안에 우리가 필요로하는 번들링된 파일들이 들어가있는것을 볼 수 있다. 

즉, templete을 통해서 뭘 템플릿을 할것인가 
그리고 filename을 통해서 그 결과를 어떠한 이름으로 저장할것인가를 지정하면 되는것이다. 

******************************************************************************************************************************************************************
(./public/index.html)

<html><head><script defer src="index_bundle.js"></script><script defer src="about_bundle.js"></script></head>
    <body>
        <h1>Hello, index</h1>
        <div id="root"></div>
        <a href="./about">ABOUT</a>
    </body>
</html>
******************************************************************************************************************************************************************

근데 지금 index.html에 번들된 Javascript 파일이 2개 다 들어가있네?
이거는 chunks 라는걸 이용해서 원하는 파일만 넣을 수 있다. 
아래처럼 entry에서 지정해줬던 이름을 가져다 넣어주면 된다. 

******************************************************************************************************************************************************************
(webpack.config.js)

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
.
.
.    
    entry: {
        index: "./source/index.js",
        about: "./source/about.js",
    },

.
.

    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.html',  <- 이걸 템플릿으로 쓰고 실행을 최상위폴더에서 해주니까 이렇게 경로지정해준것
            filename: './index.html',
            chunks: ['index']            
        })
    ]
}
******************************************************************************************************************************************************************

******************************************************************************************************************************************************************
(./public/index.html)

<html><head><script defer src="index_bundle.js"></script></head>  <- 원하는 파일만 잘 삽입 되었다. 
    <body>
        <h1>Hello, index</h1>
        <div id="root"></div>
        <a href="./about">ABOUT</a>
    </body>
</html>
******************************************************************************************************************************************************************


근데 우리는 about.html 과 about.js 도 넣어줘야 하니까 두번 해주면 된다. 
(물론 좀 더 효율적으로 하는 방법이 있지만 지금은 그냥 배우는중이니까 그게 중요하넥 아니니까 필요한건 그때그때 찾아보면서 문제를 해결하자.)


******************************************************************************************************************************************************************
(webpack.config.js)
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: "./source/index.js",
        about: "./source/about.js",
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name]_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.html',
            filename: '../views/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './source/about.html',
            filename: '../views/about.html',
            chunks: ['about']
        })
    ]
}
******************************************************************************************************************************************************************



# npx webpack --watch

위의 명령어를 사용하면 코드를 수정하고 다시 webpack 을 실행시킬 필요 없이 알아서 컴파일해준다. 
아주 편하다. 