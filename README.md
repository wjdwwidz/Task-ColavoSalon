# Task-ColavoGround

# 요구사항
- 20210509, 20210510, 20210511 일자에 대한 테스트 ✅
- is_ignore_schedule=false인 경우 구현 ✅ (true 인 경우도 구현 완료)
- is_ignore_workhour=false인 경우 구현 ✅ (true 인 경우도 구현 완료)

# 사용 기술
- node.js, nest.js, mongodb, typeorm


# 서버 실행 방법
- docker 혹은 로컬 몽고db를 실행하여 salon 데이터 베이스를 생성합니다.
  - 서버의 db_url은 mongodb://localhost:27017/salon 입니다.
- `npm install`실행
- `npm build` 실행
- `npm run start` 실행

# 데이터 주입
- 서버 동작시에 `salon`데이터 베이스만 있으면, json 파일을 읽어서 자동으로 데이터 베이스에 데이터를 주입하도록 설정했습니다.


# 추가적으로 수정하면 좋을 부분
- middleware가 빠져있습니다.
  - nestjs가 처음이라 middleware를 설정하지 못했고, 이에 따라 모든 에러가 500으로 내려갑니다.
- 로깅 추가
- docker compose 설정

