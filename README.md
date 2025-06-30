# Final Project
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
 
## Introduction
Gemini API를 이용하여 간편하게 원하는 이미지를 생성하고 Stable-Audio 1.0 모델을 활용하여 간단한 효과음을 생성할 수 있는 사이트의 FrontEnd 코드 입니다.

## Purpose
쉽게 접근 가능하고 불편함 없이 간단한 설명만으로 원하는 이미지와 그에 어울리는 효과음을 생성할 수 있는 서비스를 제공하기 위해 제작하였습니다.

## Usage

https://lnpra.com 에 접속하시고 서비스를 사용하시면 됩니다.<br>
개인 로컬 환경에서 실행하는 프로젝트라 항상 서비스가 구동중이진 않습니다. 접속 불가시 아래의 실행 예시를 참고해 주세요.<br>

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
  <img src="" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
  <h3>관리자 페이지</h3>
  <img src="https://github.com/user-attachments/assets/7fa99942-a334-4033-bf96-b919ff1f4d43" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
  <h3>로그</h3>
  <img src="https://github.com/user-attachments/assets/7fa99942-a334-4033-bf96-b919ff1f4d43" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
  <h3>통계</h3>
  <img src="https://github.com/user-attachments/assets/7fa99942-a334-4033-bf96-b919ff1f4d43" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
  <h3>유저</h3>
  <img src="https://github.com/user-attachments/assets/7fa99942-a334-4033-bf96-b919ff1f4d43" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
  <h3>생성된 이미지</h3>
  <img src="https://github.com/user-attachments/assets/7fa99942-a334-4033-bf96-b919ff1f4d43" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
  <h3>임시 생성된 이미지</h3>
  <img src="https://github.com/user-attachments/assets/7fa99942-a334-4033-bf96-b919ff1f4d43" />
  <p>원하는 이미지를 묘사한 후 엔터/생성버튼 클릭</p>
  
</details>

## Differentiation
복잡한 설정 없이 간단한 설명만으로 이미지 생성이 가능합니다.<br>
생성된 이미지에 어울리는 효과음을 생성할 수 있습니다.

## Necessity
기존 ai 이미지 생성시 유료 서비스 이거나, 모델 / LoRA / 파라미터 / 프롬프트 등 복잡한 입력이 필요 한 경우가 많습니다. 효과음 생성의 경우는 찾는것 부터가 힘든 경우도 있습니다. 이 기능들을 하나의 사이트로 편하게 이용할 수 있도록 제작하였습니다.

## Installation
외부 접속이 가능한 사이트를 목표로 하여 해당 코드만으론 실행이 어렵습니다. 
제 로컬 환경에서 실행하는 방법을 적어두었으니 참고하여 변환하여 사용해 주시면 감사하겠습니다.

<details>
  <summary>실행 방법</summary>
  <h3>1) FrontEnd 설치 및 구동</h3>

  <pre><code class="language-bash">
git clone https://github.com/KU-WM/Human-FinalProject-Front.git
npm install
npm run start
  </code></pre>

  <h3>2) BackEnd 설치 및 구동</h3>

  <h4>2-1) git clone</h4>

  <pre><code class="language-bash">
git clone https://github.com/KU-WM/Human-FinalProject-Back.git
  </code></pre>

  <h4>2-2) intellij 환경 변수 설정</h4>

  <pre>
db_pw - db 비밀번호
db_url - db 엔드포인트
db_user - db 유저 아이디
gemini_api - 발급받은 api
gemini_base_url - https://generativelanguage.googleapis.com/v1beta
gemini_image_url - /models/gemini-2.0-flash-preview-image-generation:generateContent?key=
gemini_text_url - /models/gemini-2.0-flash:generateContent?key=
jwt_secret_key - jwt 토큰 생성시 검증 key값
  </pre>

  <h4>2-3) intellij 프로젝트 시작</h4>
  
  <pre>
BackApplication 우클릭 -> BackApplication.main() 실행
  </pre>

  <h3>3) api 서버 구동</h3>

  <h4>3-1) git clone </h4>
  
  <pre><code class="language-bash">
git clone https://github.com/KU-WM/Human-FinalProject-Back.git
  </code></pre>
  
</details>
