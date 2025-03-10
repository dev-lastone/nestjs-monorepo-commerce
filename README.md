# NestJS MonoRepo Example (Commerce)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
# admin
$ pnpm run start:admin-dev
# app
$ pnpm run start:app-dev
```

## Test

```bash
# test
$ pnpm run test

# test coverage
$ pnpm run test:cov
```

## 의존 규칙
```
- libs.domain <- libs.application <- api
- libs.domain <- libs.application <- apps application <- api
- libs.domain <- apps.domain <- apps.application <- api
- apps.domain <- apps.application <- api

- libs.common <- all(domain 로직이 아닌 공통)
```
- 각 앱에 필요없는 부분에 의해서 배포 방지
- api repo read 전용 (cqrs)

## Unit Test
### 기본 규칙
```
domain -> application -> api service -> api controller
- domain: 로직 테스트
- application: 도메인, DB 호출 or 로직 테스트
- api service: application service 호출 or 요청/반환 테스트
- controller: api service 호출 or 요청/반환 테스트
```

### class-validator
데코레이터 사용하는 경우 라이브러리 보장으로 테스트 생략 

vo UserPassword, envValidate 시도 맛보기 

- 필요시 validateOrReject 로 사용되는 decorator 들 별도 테스트

---

## TODO
- [ ] 외래키 id 없애기
=> user 의 경우 jwt 로 검증된 데이터라 select 불필요. 다른 entity 는 제거 가능.
- [ ] 단순조회도 cqrs 적용 (read db 사용하도록 분리)

### etc
- [ ] integration test
- [ ] e2e scenario test
- [ ] repo test h2?