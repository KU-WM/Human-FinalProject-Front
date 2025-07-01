# Final Project
![React](https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css-663399.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-7952B3.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Nodedotjs](https://img.shields.io/badge/nodejs-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
 
## 전체 프로젝트 구성
코드의 유지 보수를 쉽게 하기 위하여 아래와 같이 레포지토리를 분리하였습니다.

[FrontEnd] - 현재 페이지<br>
https://github.com/KU-WM/Human-FinalProject-Front<br>
[BackEnd]<br>
https://github.com/KU-WM/Human-FinalProject-Back.git<br>
[Api Server]<br>
https://github.com/KU-WM/Human-FinalProject-API.git<br>
[내부망 구성]<br>
nginx 사용 - 리버스 프록시 적용<br>
[외부 서비스 배포]<br>
cloudflare tunnel - localhost와 외부 도메인 연결<br>

## 소개
<img src="https://github.com/user-attachments/assets/7fa99942-a334-4033-bf96-b919ff1f4d43" />
Gemini API를 이용하여 간편하게 원하는 이미지를 생성하고 Stable-Audio 1.0 모델을 활용하여 간단한 효과음을 생성할 수 있는 사이트의 FrontEnd 코드 입니다.

## 제작 목적
쉽게 접근 가능하고 불편함 없이 간단한 설명만으로 원하는 이미지와 그에 어울리는 효과음을 생성할 수 있는 서비스를 제공하기 위해 제작하였습니다.

## 사용법
https://lnpra.com 에 접속하시고 서비스를 사용하시면 됩니다.<br>
개인 로컬 환경에서 실행/배포하는 프로젝트라 항상 서비스가 구동중이진 않습니다. 접속 불가시 아래의 실행 예시를 참고해 주세요.<br>

<details>
  <summary>실행 예시</summary>
  <h3>이미지 생성</h3>
  <img src="https://github.com/user-attachments/assets/7fa99942-a334-4033-bf96-b919ff1f4d43" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>

  <h3>효과음 자동 생성</h3>
  <img src="https://github.com/user-attachments/assets/9a22fdcc-68b1-4980-ba84-7ae4db1e9163" />
  <p>유저가 입력한 이미지 묘사에 알맞는 효과음 자동생성</p>

  <h3>효과음 수동 생성</h3>
  <img src="https://github.com/user-attachments/assets/0fa738a0-c7f8-470a-ab5a-a4650094cb94" />
  <p>유저가 직접 원하는 효과음을 묘사하여 입력</p>
  
  <h3>로그인</h3>
  <img src="https://github.com/user-attachments/assets/0d387bcf-a695-40a4-add7-5ff83cf42496" />
  <p>아이디/비밀번호로 로그인(관리자 계정)</p>

  <h3>로그인비교</h3>
  <div syyle={ "display":"flex" }>
    <img width="49%" src="https://github.com/user-attachments/assets/47f6ed98-c326-440f-bb24-04adeb743c03" />
    <img width="49%" src="https://github.com/user-attachments/assets/6dd72b52-c659-453e-b513-eb879a5da885" />
  </div>
  <p>관리자 로그인(좌) / 일반 유저 로그인(우)</p>

  <h3>회원가입</h3>
  <img src="https://github.com/user-attachments/assets/7ca891d8-33f4-4074-a6dd-1bdd9a1550b2" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>

  <h3>관리자 페이지</h3>
  <img src="https://github.com/user-attachments/assets/33a7dd75-a505-43ce-b71b-b8fbdcb22e7d" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
  <h3>로그</h3>
  <img src="https://github.com/user-attachments/assets/ff45c2fb-09ac-4612-b4ce-22337bd714e9" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>

  <h3>통계</h3>
  <img src="https://github.com/user-attachments/assets/c6809c20-8e8a-4eaa-a211-46495d3430f5" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>

  <h3>유저</h3>
  <img src="https://github.com/user-attachments/assets/41c8635f-5230-49f8-8f71-5656585c81d8" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>

  <h3>생성된 이미지</h3>
  <img src="https://github.com/user-attachments/assets/7e9ec28f-c9cd-4534-9fd8-a244b9192039" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>

  <h3>임시 생성된 이미지</h3>
  <img src="https://github.com/user-attachments/assets/73d246d4-0422-4ce4-bd2e-8b8105b8a10d" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
</details>

## 필요성
기존 ai 이미지 생성시 유료 서비스 이거나, 모델 / LoRA / 파라미터 / 프롬프트 등 복잡한 입력이 필요 한 경우가 많습니다. 효과음 생성의 경우는 찾는것 부터가 힘든 경우도 있습니다.<br>
이 기능들을 하나의 사이트로 편하게 이용할 수 있도록 제작하였습니다.


## 개발 과정
- 2025.05.26 ~ 2025.06.26 (약 5주) 의 기간동안 진행
- 오전/오후의 스크럼 회의를 통해 진행사항을 점검하고, 애자일 방법론을 통하여 유연한 개발을 진행

## License

본 프로젝트의 코드는 비상업적 용도로 자유롭게 사용하실 수 있습니다.
상업적 이용이나 수정, 재배포 시에는 사전 연락을 부탁드립니다.
