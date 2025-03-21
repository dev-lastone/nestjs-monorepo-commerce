# NestJS MonoRepo Example (Commerce)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
# docker (db master & slave)
$ docker-compose up -d
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

## 폴더 구조
```
apps
├─ admin
│   ├─ api (controller)
│   ├─ application (전용 응용 로직)
│   └─ domain (전용 도메인 로직)
├─ app
│   └─ ...
└─ batch
    └─ ...
libs
├─ application (디비 의존 모듈성 코어 로직)
├─ common (공통 설정 / 유틸성)
└─ domain (순수 도메인 로직)
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
- [ ] repo test
- [ ] integration test