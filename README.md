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

## TODO
### app
- [x] 상품 조회
- [x] 상품 좋아요
- [x] 유저 배송지 설정
- [x] 유저 장바구니
- [x] 상품 주문
- [x] 주문 조회
- [x] 포인트 적립 (구매확정)
- [ ] 상품 리뷰
  - [ ] 포인트 적립 (리뷰)
- [ ] 포인트 사용 (주문)
- [ ] message

### batch
- [ ] 포인트 만료
- [ ] 배송 상태 변경

### etc
- [ ] integration test
- [ ] e2e scenario test

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