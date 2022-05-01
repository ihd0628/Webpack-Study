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



