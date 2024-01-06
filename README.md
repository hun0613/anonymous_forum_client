# 🔭 Anonymous forum
익명게시판
</br>
텍스트 형식의 게시글을 자유롭게 공유할 수 있는 게시판입니다!

## ✨ 기능 소개
![게시판 시연영상](https://github.com/hun0613/anonymous_forum_client/assets/106587166/a2f6f822-c9ee-49bf-96c5-6b60b9181156)

### 🪄게시판 대시보드
게시판에 등록된 총 게시글 수, 이번달 게시글 수, 지난달 게시글 수를 확인할 수 있습니다.</br>
또한, 1주일 간 게시글 등록 수 추이를 차트를 통해 확인할 수 있으며 1주일에 대한 기간은 사용자가 지정할 수 있습니다.

차트의 경우, 1주일 간 가장 많은 게시글이 등록된 일자의 그래프 바에는 노란색으로 강조를 해 주었고,
평균선을 통해 1주일 간 등록된 게시글 수의 평균을 확인할 수 있습니다.

### 🪄내 게시글 찾기
게시글 작성 시 입력했던 이메일을 입력하면, 본인이 해당 이메일로 인증하여 작성한 게시글을 확인할 수 있습니다.

### 🪄댓글, 대댓글 기능
등록된 게시글에 대해 댓글을 달 수 있습니다.</br>
대댓글도 가능하며, UI를 고려하여 총 4번 대댓글을 달 수 있도록 구현하였습니다.</br>
대댓글의 경우, 해당 대댓글의 depth에 따라 width가 짧아지도록 구현하였습니다.

### 🪄페이지네이션
게시글 목록 최하단에 페이지네이션이 가능하도록 페이지 버튼을 배치하였습니다.
가장 왼쪽 Start 버튼을 클릭할 경우 1페이지로 이동하고, < 버튼은 이전 페이지로 이동, > 버튼은 다음 페이지로 이동, End 버튼은 가장 마지막 페이지로 이동합니다.

### 🪄관리자 디스플레이 설정 기능
![스크린샷 2024-01-06 오후 8 47 13](https://github.com/hun0613/anonymous_forum_client/assets/106587166/f1b70e10-57e4-4cf6-a752-777f5743175f)
관리자 인증을 한 경우, 디스플레이와 관련한 설정을 할 수 있습니다.</br>
관련 설정으로는 한 페이지에 표시되는 게시글 수 설정과 게시글 하단의 페이지 버튼 수 설정입니다.

### 🪄게시글 작성
![스크린샷 2024-01-06 오후 8 41 34](https://github.com/hun0613/anonymous_forum_client/assets/106587166/6b1140c5-7377-4357-94a5-06adc6e6ac29)
텍스트 형식의 게시글을 작성할 수 있으며, 각 입력창에는 입력된 글자에 대한 글자 수와 Byte를 계산하여 출력해주고 있습니다. (한글일 경우 2bytes, 그 외에는 1byte로 계산했습니다).</br>
react-hook-form 사용으로 빈 값이 입력된 상태에서 등록하기 버튼을 눌렀을 경우, 경고 메시지가 출력되면서 등록되지 않습니다.</br>
게시글 작성 시, 본인 이메일을 함께 입력하여 추후 본인 게시글 찾기 및 게시글 수정, 삭제 시 인증 데이터로 활용하고 있습니다.

</br>

## 🛠 Tech Stacks

 <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-DB7093?style=for-the-badge&logo=TailwindCSS&logoColor=white) ![Recoil](https://img.shields.io/badge/recoil-%23593d88.svg?style=for-the-badge&logo=recoil&logoColor=white)![axios](https://img.shields.io/badge/Axios-181717?style=for-the-badge&logo=Axios&logoColor=white) <img src="https://img.shields.io/badge/reactquery-61DAFB?style=for-the-badge&logo=reactquery&logoColor=black">
</br>



