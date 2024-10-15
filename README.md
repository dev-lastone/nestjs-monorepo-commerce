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

## TODO
### admin
- [x] product crud
- [x] signIn
  - [x] jwt
  - [x] guard

### app
- [x] auth
- [x] 상품 조회
- [x] 상품 좋아요
- [x] 유저 배송지 설정
- [x] 유저 장바구니
- [x] 상품 주문
- [ ] 주문 조회
- [ ] 포인트 적립 (구매확정)
- [ ] 상품 리뷰
  - [ ] 포인트 적립 (리뷰)
- [ ] 포인트 사용 (주문)
- [ ] message

### batch
- [ ] 포인트 만료
- [ ] 배송 상태 변경

### external
- [ ] guard (api-key)

### etc
- [x] swagger
- [x] ~~pr test~~
- [x] ~~pr test coverage~~
- [x] pr sonar-cloud
- [ ] typeorm
- [ ] integration test
- [ ] e2e scenario test