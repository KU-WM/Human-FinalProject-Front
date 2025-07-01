# Final Project
![React](https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css-663399.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-7952B3.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Nodedotjs](https://img.shields.io/badge/nodejs-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## 📌 목차
- [소개](#-소개)
- [사용법](#-사용법)
- [제작 목적](#-제작-목적)
- [개발 과정](#-개발-과정)
- [전체 프로젝트 구성 트리](#-전체-프로젝트-구성-트리)
- [🛠 사용 기술 스택](#-사용-기술-스택)
- [📄 License](#-license)

## 📝 소개
Gemini API와 Stable-Audio 1.0 모델을 활용하여 **사용자가 간단한 텍스트 입력만으로 원하는 이미지와 간단한 효과음을 생성할 수 있는 사이트**를 풀스택으로 개발하고 서비스 하였습니다. 이 레포지토리는 해당 서비스의 FrontEnd 코드 입니다.<br>
[https://lnpra.com](https://lnpra.com) 에 접속하시면 해당 서비스를 사용하실 수 있습니다.<br>

프로젝트의 유지보수를 위하여 개인 프로젝트를 아래 3개의 레포지토리로 분리하여 저장하였습니다.<br>

[FrontEnd] - 현재 페이지<br>
https://github.com/KU-WM/Human-FinalProject-Front<br>
[BackEnd]<br>
https://github.com/KU-WM/Human-FinalProject-Back.git<br>
[Api Server]<br>
https://github.com/KU-WM/Human-FinalProject-API.git<br>
<br>

## 🧑‍💻 사용법
개인 로컬 환경에서 실행/배포하는 프로젝트라 항상 서비스가 구동 중이진 않을 수 있습니다. 접속 불가시 아래의 실행 예시를 참고해 주세요.<br>

<h3>이미지 생성</h3>
<img src="https://github.com/user-attachments/assets/85cc6a6d-3c04-41d2-b8ea-1ad42b39f49a" width="775px" />
<p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭시 이미지가 생성됩니다.</p>

<h3>효과음 생성</h3>
<img src="https://github.com/user-attachments/assets/65cfe9f2-0e28-40a0-94a1-7e9a50ed52bd" width="775px" />
<p>유저가 원하는 효과음을 생성합니다.</p>
<p>자동 생성의 경우 유저가 입력한 프롬프트를 그대로, 수동입력의 경우 유저가 직접 원하는 입력을 넣을 수 있습니다.</p>

<h3>로그인</h3>
<img src="https://github.com/user-attachments/assets/0d387bcf-a695-40a4-add7-5ff83cf42496" width="775px" />
<p>아이디와 비밀번호를 입력해 로그인할 수 있습니다. (관리자 계정 지원)</p>

<h3>로그인비교</h3>
<div style={ "display":"flex" }>
  <img width="49%" src="https://github.com/user-attachments/assets/47f6ed98-c326-440f-bb24-04adeb743c03" />
  <img width="49%" src="https://github.com/user-attachments/assets/6dd72b52-c659-453e-b513-eb879a5da885" />
</div>

관리자 로그인( **좌** ) / 일반 유저 로그인( **우** )
<p>상단 네비게이션의 관리자 항목이 관리자로 로그인 한 경우에만 보이고 활성화 됩니다.</p>

<h3>회원가입</h3>
<img src="https://github.com/user-attachments/assets/7ca891d8-33f4-4074-a6dd-1bdd9a1550b2" width="775px" />
<p>원하는 아이디, 비밀번호, 닉네임을 골라 회원가입이 가능합니다.</p>
<p>어디까지나 생성된 이미지를 유저별로 구분하기 위한 기능이라 별도의 개인정보를 수집하지 않습니다.</p>

<h3>관리자 페이지</h3>
<img src="https://github.com/user-attachments/assets/33a7dd75-a505-43ce-b71b-b8fbdcb22e7d" width="775px" />
<p>관리자 페이지는 아래의 5가지 항목을 확인 및 제어가 가능합니다.</p>

<h3>로그</h3>
<img src="https://github.com/user-attachments/assets/ff45c2fb-09ac-4612-b4ce-22337bd714e9" width="775px" />
<p>사이트에 방문한 모든 이용자의 종합 로그입니다.</p>
<p>로그갱신시 최신 로그가 DB에 저장되며 통계 역시 업데이트 됩니다.</p>

<h3>통계</h3>
<img src="https://github.com/user-attachments/assets/c6809c20-8e8a-4eaa-a211-46495d3430f5" width="775px" />
<p>DB에 저장된 로그를 바탕으로 사이트의 통계를 집계합니다.</p>

<h3>유저</h3>
<img src="https://github.com/user-attachments/assets/41c8635f-5230-49f8-8f71-5656585c81d8" width="775px" />
<p>회원가입한 유저를 관리할 수 있습니다.</p>
<p>유저의 등급을 변경할 수 있으며 유저 삭제가 가능합니다.</p>

<h3>생성된 이미지</h3>
<img src="https://github.com/user-attachments/assets/7e9ec28f-c9cd-4534-9fd8-a244b9192039" width="775px" />
<p>로그인 한 유저가 생성한 이미지들을 관리할 수 있습니다.</p>
<p>이미지 삭제시 이미지와 파생된 효과음들도 모두 삭제됩니다.</p>

<h3>임시 생성된 이미지</h3>
<img src="https://github.com/user-attachments/assets/73d246d4-0422-4ce4-bd2e-8b8105b8a10d" width="775px" />
<p>로그인 하지 않은 유저가 생성한 이미지들을 관리할 수 있습니다.</p>
 
## 🎯 제작 목적
 기존 ai 이미지 생성시 유료 서비스 이거나, 모델 / LoRA / 파라미터 / 프롬프트 등 복잡한 입력이 필요 한 경우가 많습니다. 효과음 생성의 경우는 찾는것 부터가 힘든 경우도 있습니다.<br>
이 기능들을 쉽게 접근 가능하고 불편함 없이 간단한 설명만으로 원하는 이미지와 그에 어울리는 효과음을 생성할 수 있는 서비스를 제공하기 위해 제작하였습니다.

## 🛠 개발 과정
- 2025.05.26 ~ 2025.06.26 (약 5주) 의 기간동안 진행하였습니다.
- 오전/오후의 스크럼 회의를 통해 진행사항을 점검하고, 애자일 방법론을 통하여 유연한 개발을 진행하였습니다.
  
## 📁 전체 프로젝트 구성 트리
```
📦src
 ┣ 📂component
 ┃ ┗ 📜refreshApi.jsx   - Springboot와 통신하는 axios 코드 정의
 ┣ 📂css
 ┃ ┣ 📂admin_sub
 ┃ ┃ ┣ 📜logs.css
 ┃ ┃ ┣ 📜statistic.css
 ┃ ┃ ┗ 📜users.css
 ┃ ┣ 📜admin.css
 ┃ ┣ 📜header.css
 ┃ ┣ 📜login.css
 ┃ ┣ 📜main.css
 ┃ ┗ 📜myPage.css
 ┣ 📂icon
 ┃ ┣ 📜dl_icon.png
 ┃ ┗ 📜info_icon.png
 ┣ 📂pages
 ┃ ┣ 📂admin_sub
 ┃ ┃ ┣ 📜images.jsx     - 로그인한 유저가 생성한 이미지 관리
 ┃ ┃ ┣ 📜logs.jsx       - 전체 사용자 로그 조회
 ┃ ┃ ┣ 📜statistic.jsx  - 전체 서비스 이용 통계
 ┃ ┃ ┣ 📜tempImage.jsx  - 로그인하지 않은 유저가 생성한 이미지 관리
 ┃ ┃ ┗ 📜users.jsx      - 회원가입한 유저 관리
 ┃ ┣ 📜admin.jsx        - 관리자 페이지 
 ┃ ┣ 📜header.jsx       - 사이트 공통 header
 ┃ ┣ 📜login.jsx        - 로그인/회원가입 페이지
 ┃ ┣ 📜main.jsx         - 메인 이미지 생성 페이지
 ┃ ┗ 📜myPage.jsx       - 자신이 생성한 이미지 목록
 ┣ 📂routes
 ┃ ┗ 📜RootRoutes.jsx   - Navigate 경로 지정
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```

## 🧰 사용 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React, JavaScript, HTML5, CSS3, Bootstrap |
| Backend | SpringBoot, FastApi |
| Infra | Nginx, Cloudflare tunnel |
| AI 모델 | Gemini API (이미지 생성), Stable Audio 1.0 (효과음 생성) |


## 📄 License

본 프로젝트의 코드는 비상업적 용도로 자유롭게 사용하실 수 있습니다.
상업적 이용이나 수정, 재배포 시에는 사전 연락을 부탁드립니다.
