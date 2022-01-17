# 📝TODOLIST
Vue.js + TypeScript를 공부하기위해 TodoList를 만들었습니다.

<br>

- 개인 프로젝트
- 개발기간 : 2022.01 (2주)
- [배포된 프로젝트 링크](https://todo523.herokuapp.com)

<br>

## ⚙Environment
- Vue CLi 4.5.15
- Vue 2.6.11

<br>

## 🗂프로젝트 구조


<br>

## ✔특징



<br>

## 🔗참고
- [캡틴판교 - Vue.js + TypeScript 완벽 가이드](https://www.inflearn.com/course/vue-ts)
- [Heroku 에 Vue.js 배포하는 방법](https://medium.com/@ave10987/%EB%B2%88%EC%97%AD-vue-webpack%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-heroku%EC%97%90-%EB%B0%B0%ED%8F%AC-%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-5dcf8b05ea84)
```
1. npm run build 실행
2. 생성된 dist 폴더 내부에 package.json, server.js 생성

// package.json
{
 "name": "blog",
 "version": "1.0.0",
 "description": "personalblog",
 "author": "Awesome Author",
 "private": true,
 "scripts": {
   "postinstall": "npm install express"
 }
}

// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname));

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);

3. dist 폴더만 github의 repository에 push한다.
4. heroku.com에서 해당 repository를 연결하고 배포한다.
```
