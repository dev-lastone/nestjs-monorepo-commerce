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
- [x] product
  - [x] create
  - [x] update
  - [x] delete
  - [x] list
- [x] signIn
  - [x] jwt
  - [x] guard
    - [x] global
    - [x] decorator set metadata (isPublic)

### app
- [x] auth
- [x] 상품 조회
- [x] 상품 좋아요
- [ ] decorator request.user
- [ ] 상품 장바구니
- [ ] 유저 배송지 설정
- [ ] 상품 주문
- [ ] 상품 리뷰
- [ ] 포인트 적립 (주문, 리뷰)
- [ ] 포인트 사용 (주문)
- [ ] 비회원
- [ ] middleware cookie (guest)
- [ ] message (bull) - slack, braze, sms...
- [ ] transformer
- [ ] decorator cache

### cron

### external
- [ ] guard (api-key)

### etc
- [x] swagger
- [x] pr test
- [x] pr test coverage
- [ ] typeorm
- [ ] graphQL
- [ ] prisma