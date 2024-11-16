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
- [x] swagger
- [x] pr sonar-cloud
- [x] typeorm
- [ ] integration test
- [ ] e2e scenario test

VO request dto 에 적용안하기로 결정한 이유.
vo 에 orm 과 swagger 를 다 명시하려했는데, 사용처가 다른데 동작이 겹쳐 역할 분담이 제대로 안됨.
그럼 둘다 별도로 명시가 되어야 해서 결국 두번 작성해야함.
어차피 프론트에서 막을꺼니까.
requestDTO 는 타입이랑 필수만 보장하자.
값 검증은 비지니스 로직 코어에서만 하는걸로.

entity 에 swagger 명시할지는 좀더 고민해보기
entity pick type 사용여부도 좀더 고민해보기
