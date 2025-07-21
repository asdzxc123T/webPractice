npm install --legacy-peer-deps
npx prisma migrate dev --name init
npm run dev
위 명령어를 입력하고 실행하시면 됩니다.

npm install 명령어에 --legacy-peer-deps가 붙은 건
additional function 중에서 text formatting을 구현하려고
@mdx-js/react 패키지를 설치했는데,
버전 호환 문제가 있어서 그런지 위 옵션이 없으면 설치가 안 되어서 그렇습니다.
일단 실행은 잘 됩니다.

만약 seed값이 필요하시다면 localhost:3000/seed에 접속하시고
다시 localhost:3000으로 되돌아가셔서 로그인 하시면 됩니다.
ID는 abc, 비밀번호는 1234입니다.

additional function 중 profile image 기능을 테스트하시려면
2020311471_profile.jpeg를 사용하셔도 좋고, 다른 이미지를 사용하셔도 좋습니다.