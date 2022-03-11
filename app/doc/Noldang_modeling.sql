-- 회원
DROP TABLE IF EXISTS user RESTRICT;

-- 여행지
DROP TABLE IF EXISTS destination RESTRICT;

-- 여행
DROP TABLE IF EXISTS travle RESTRICT;

-- tag
DROP TABLE IF EXISTS tag RESTRICT;

-- 여행지사진
DROP TABLE IF EXISTS destination_img RESTRICT;

-- 여행지댓글
DROP TABLE IF EXISTS destination_comment RESTRICT;

-- 일정
DROP TABLE IF EXISTS travle_schedule RESTRICT;

-- 동행자
DROP TABLE IF EXISTS companion RESTRICT;

-- todo
DROP TABLE IF EXISTS todo RESTRICT;

-- 좋아요
DROP TABLE IF EXISTS likes RESTRICT;

-- 여행지유형
DROP TABLE IF EXISTS destinatio_type RESTRICT;

-- 회원추천여행지댓글
DROP TABLE IF EXISTS new_destination_commnet RESTRICT;

-- 게시글
DROP TABLE IF EXISTS service_center RESTRICT;

-- 신고
DROP TABLE IF EXISTS report RESTRICT;

-- 답변
DROP TABLE IF EXISTS answer RESTRICT;

-- 여행비용
DROP TABLE IF EXISTS cost RESTRICT;

-- 여행지태그목록
DROP TABLE IF EXISTS destiantion_tag_list RESTRICT;

-- 회원태그목록
DROP TABLE IF EXISTS user_tag_list RESTRICT;

-- 회원
CREATE TABLE user (
  user_id     INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  id          VARCHAR(50)  NOT NULL COMMENT 'id', -- id
  pwd         VARCHAR(13)  NOT NULL COMMENT 'pwd', -- pwd
  email       VARCHAR(40)  NOT NULL COMMENT 'email', -- email
  phone       VARCHAR(30)  NOT NULL COMMENT 'phone', -- phone
  nick_name   VARCHAR(50)  NOT NULL COMMENT 'nick_name', -- nick_name
  reg_date    TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
  update_date TIMESTAMP    NOT NULL COMMENT 'update_date', -- update_date
  profile_img VARCHAR(500) NULL     COMMENT '프로필사진' -- 프로필사진
)
COMMENT '회원';

-- 회원
ALTER TABLE user
  ADD CONSTRAINT PK_user -- 회원 기본키
    PRIMARY KEY (
      user_id -- 회원번호
    );

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_user
  ON user ( -- 회원
    email ASC -- email
  );

-- 회원 유니크 인덱스2
CREATE UNIQUE INDEX UIX_user2
  ON user ( -- 회원
    id ASC -- id
  );

-- 회원 유니크 인덱스3
CREATE UNIQUE INDEX UIX_user3
  ON user ( -- 회원
    phone ASC -- phone
  );

-- 회원 유니크 인덱스4
CREATE UNIQUE INDEX UIX_user4
  ON user ( -- 회원
    nick_name ASC -- nick_name
  );

ALTER TABLE user
  MODIFY COLUMN user_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원번호';

-- 여행지
CREATE TABLE destination (
  destination_id      INTEGER      NOT NULL COMMENT '여행지번호', -- 여행지번호
  user_id             INTEGER      NULL     COMMENT '회원번호', -- 회원번호
  destination_type_id INTEGER      NULL     COMMENT '여행지유형번호', -- 여행지유형번호
  destination_name    VARCHAR(255) NOT NULL COMMENT '이름', -- 이름
  contents            TEXT         NOT NULL COMMENT '내용', -- 내용
  phone               VARCHAR(30)  NULL     COMMENT '안내전화', -- 안내전화
  latitude            FLOAT        NULL     COMMENT '위도', -- 위도
  longitude           FLOAT        NULL     COMMENT '경도', -- 경도
  adress              VARCHAR(255) NOT NULL COMMENT '주소', -- 주소
  travle_post_type    VARCHAR(1)   NULL     COMMENT '여행지게시글유형' -- 여행지게시글유형
)
COMMENT '여행지';

-- 여행지
ALTER TABLE destination
  ADD CONSTRAINT PK_destination -- 여행지 기본키
    PRIMARY KEY (
      destination_id -- 여행지번호
    );

-- 여행지 유니크 인덱스
CREATE UNIQUE INDEX UIX_destination
  ON destination ( -- 여행지
    adress ASC -- 주소
  );

ALTER TABLE destination
  MODIFY COLUMN destination_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '여행지번호';

-- 여행
CREATE TABLE travle (
  travle_id   INTEGER      NOT NULL COMMENT '여행번호', -- 여행번호
  user_id     INTEGER      NOT NULL COMMENT '여행주관자', -- 여행주관자
  travle_name VARCHAR(100) NOT NULL COMMENT 'name', -- name
  reg_date    TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
  update_date TIMESTAMP    NOT NULL COMMENT 'update_date', -- update_date
  start_date  DATE         NOT NULL COMMENT '출발일', -- 출발일
  end_date    DATE         NOT NULL COMMENT '종료일' -- 종료일
)
COMMENT '여행';

-- 여행
ALTER TABLE travle
  ADD CONSTRAINT travle -- 여행 기본키
    PRIMARY KEY (
      travle_id -- 여행번호
    );

ALTER TABLE travle
  MODIFY COLUMN travle_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '여행번호';

-- tag
CREATE TABLE tag (
  tag_id   INTEGER     NOT NULL COMMENT 'tag_key', -- tag_key
  tag_name VARCHAR(50) NOT NULL COMMENT 'tag_name' -- tag_name
)
COMMENT 'tag';

-- tag
ALTER TABLE tag
  ADD CONSTRAINT tag -- tag 기본키
    PRIMARY KEY (
      tag_id -- tag_key
    );

ALTER TABLE tag
  MODIFY COLUMN tag_id INTEGER NOT NULL AUTO_INCREMENT COMMENT 'tag_key';

-- 여행지사진
CREATE TABLE destination_img (
  destination_img_id INTEGER      NOT NULL COMMENT '여행지사진번호', -- 여행지사진번호
  destination_id     INTEGER      NOT NULL COMMENT '여행지번호', -- 여행지번호
  img                VARCHAR(500) NOT NULL COMMENT '사진' -- 사진
)
COMMENT '여행지사진';

-- 여행지사진
ALTER TABLE destination_img
  ADD CONSTRAINT PK_destination_img -- 여행지사진 기본키
    PRIMARY KEY (
      destination_img_id -- 여행지사진번호
    );

ALTER TABLE destination_img
  MODIFY COLUMN destination_img_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '여행지사진번호';

-- 여행지댓글
CREATE TABLE destination_comment (
  comment_id     INTEGER      NOT NULL COMMENT '댓글번호', -- 댓글번호
  destination_id INTEGER      NOT NULL COMMENT '여행지번호', -- 여행지번호
  user_id2       INTEGER      NOT NULL COMMENT '작성자번호', -- 작성자번호
  contents       VARCHAR(100) NOT NULL COMMENT 'content', -- content
  reg_date       TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
  update_date    TIMESTAMP    NOT NULL COMMENT 'update_date' -- update_date
)
COMMENT '여행지댓글';

-- 여행지댓글
ALTER TABLE destination_comment
  ADD CONSTRAINT PK_destination_comment -- 여행지댓글 기본키
    PRIMARY KEY (
      comment_id -- 댓글번호
    );

-- 일정
CREATE TABLE travle_schedule (
  schedule_id    INTEGER NOT NULL COMMENT '일정번호', -- 일정번호
  travle_id      INTEGER NOT NULL COMMENT '여행번호', -- 여행번호
  destination_id INTEGER NOT NULL COMMENT '여행지번호', -- 여행지번호
  day            INTEGER NOT NULL COMMENT '일시' -- 일시
)
COMMENT '일정';

-- 일정
ALTER TABLE travle_schedule
  ADD CONSTRAINT travle_schedule -- 일정 기본키
    PRIMARY KEY (
      schedule_id -- 일정번호
    );

ALTER TABLE travle_schedule
  MODIFY COLUMN schedule_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '일정번호';

-- 동행자
CREATE TABLE companion (
  travle_id    INTEGER NOT NULL COMMENT '여행번호', -- 여행번호
  companion_id INTEGER NOT NULL COMMENT '동행자번호', -- 동행자번호
  statment     BOOLEAN NOT NULL COMMENT '상태' -- 상태
)
COMMENT '동행자';

-- 동행자
ALTER TABLE companion
  ADD CONSTRAINT PK_companion -- 동행자 기본키
    PRIMARY KEY (
      travle_id,    -- 여행번호
      companion_id  -- 동행자번호
    );

-- todo
CREATE TABLE todo (
  todo_id     INTEGER      NOT NULL COMMENT 'todo_key', -- todo_key
  travle_id   INTEGER      NOT NULL COMMENT '여행번호', -- 여행번호
  name        VARCHAR(100) NOT NULL COMMENT 'name', -- name
  reg_date    TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
  update_date TIMESTAMP    NOT NULL COMMENT 'update_date', -- update_date
  status      BOOLEAN      NOT NULL COMMENT 'done' -- done
)
COMMENT 'todo';

-- todo
ALTER TABLE todo
  ADD CONSTRAINT PK_todo -- todo 기본키
    PRIMARY KEY (
      todo_id -- todo_key
    );

ALTER TABLE todo
  MODIFY COLUMN todo_id INTEGER NOT NULL AUTO_INCREMENT COMMENT 'todo_key';

-- 좋아요
CREATE TABLE likes (
  destination_id INTEGER NOT NULL COMMENT '여행지번호', -- 여행지번호
  user_id        INTEGER NOT NULL COMMENT '회원번호' -- 회원번호
)
COMMENT '좋아요';

-- 좋아요
ALTER TABLE likes
  ADD CONSTRAINT PK_likes -- 좋아요 기본키
    PRIMARY KEY (
      destination_id, -- 여행지번호
      user_id         -- 회원번호
    );

-- 여행지유형
CREATE TABLE destinatio_type (
  destination_type_id INTEGER     NOT NULL COMMENT '여행지유형번호', -- 여행지유형번호
  destination_name    VARCHAR(10) NOT NULL COMMENT '유형이름' -- 유형이름
)
COMMENT '여행지유형';

-- 여행지유형
ALTER TABLE destinatio_type
  ADD CONSTRAINT PK_destinatio_type -- 여행지유형 기본키
    PRIMARY KEY (
      destination_type_id -- 여행지유형번호
    );

ALTER TABLE destinatio_type
  MODIFY COLUMN destination_type_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '여행지유형번호';

-- 회원추천여행지댓글
CREATE TABLE new_destination_commnet (
  new_destination_comment_id INTEGER      NOT NULL COMMENT '회원추천여행지댓글번호', -- 회원추천여행지댓글번호
  user_id                    INTEGER      NOT NULL COMMENT '작성자번호', -- 작성자번호
  destination_id             INTEGER      NOT NULL COMMENT '여행지번호', -- 여행지번호
  contents                   VARCHAR(100) NOT NULL COMMENT 'content', -- content
  reg_date                   TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
  update_date                TIMESTAMP    NOT NULL COMMENT 'update_date' -- update_date
)
COMMENT '회원추천여행지댓글';

-- 회원추천여행지댓글
ALTER TABLE new_destination_commnet
  ADD CONSTRAINT PK_new_destination_commnet -- 회원추천여행지댓글 기본키
    PRIMARY KEY (
      new_destination_comment_id -- 회원추천여행지댓글번호
    );

-- 게시글
CREATE TABLE service_center (
  service_center_id INTEGER      NOT NULL COMMENT '게시글번호', -- 게시글번호
  user_id           INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  service_type      VARCHAR(1)   NOT NULL COMMENT '타입', -- 타입
  title             VARCHAR(255) NOT NULL COMMENT '제목', -- 제목
  contents          TEXT         NOT NULL COMMENT '내용', -- 내용
  view_count        INTEGER      NOT NULL COMMENT '조회수', -- 조회수
  reg_date          TIMESTAMP    NOT NULL COMMENT '게시날짜', -- 게시날짜
  update_date       TIMESTAMP    NOT NULL COMMENT '수정날짜' -- 수정날짜
)
COMMENT '게시글';

-- 게시글
ALTER TABLE service_center
  ADD CONSTRAINT PK_service_center -- 게시글 기본키
    PRIMARY KEY (
      service_center_id -- 게시글번호
    );

ALTER TABLE service_center
  MODIFY COLUMN service_center_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시글번호';

-- 신고
CREATE TABLE report (
  report_id   INTEGER      NOT NULL COMMENT '신고번호', -- 신고번호
  user_id     INTEGER      NOT NULL COMMENT '신고자', -- 신고자
  post_type   VARCHAR(1)   NOT NULL COMMENT '글타입', -- 글타입
  post_id     INTEGER      NOT NULL COMMENT '글번호', -- 글번호
  contents    VARCHAR(100) NOT NULL COMMENT '신고이유', -- 신고이유
  reg_date    TIMESTAMP    NOT NULL COMMENT '신고날짜', -- 신고날짜
  update_date TIMESTAMP    NOT NULL COMMENT '수정날짜' -- 수정날짜
)
COMMENT '신고';

-- 신고
ALTER TABLE report
  ADD CONSTRAINT PK_report -- 신고 기본키
    PRIMARY KEY (
      report_id -- 신고번호
    );

-- 답변
CREATE TABLE answer (
  service_center_id INTEGER NOT NULL COMMENT '게시글번호', -- 게시글번호
  answer            TEXT    NOT NULL COMMENT '답변' -- 답변
)
COMMENT '답변';

-- 답변
ALTER TABLE answer
  ADD CONSTRAINT PK_answer -- 답변 기본키
    PRIMARY KEY (
      service_center_id -- 게시글번호
    );

-- 여행비용
CREATE TABLE cost (
  cost_id     INTEGER      NOT NULL COMMENT '비용번호', -- 비용번호
  travle_id   INTEGER      NOT NULL COMMENT '여행번호', -- 여행번호
  name        VARCHAR(255) NOT NULL COMMENT 'name', -- name
  reg_date    TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
  update_date TIMESTAMP    NOT NULL COMMENT 'update_date', -- update_date
  cost        INTEGER      NOT NULL COMMENT '비용' -- 비용
)
COMMENT '여행비용';

-- 여행비용
ALTER TABLE cost
  ADD CONSTRAINT cost -- 여행비용 기본키
    PRIMARY KEY (
      cost_id -- 비용번호
    );

ALTER TABLE cost
  MODIFY COLUMN cost_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '비용번호';

-- 여행지태그목록
CREATE TABLE destiantion_tag_list (
  tag_id         INTEGER NOT NULL COMMENT 'tag_key', -- tag_key
  destination_id INTEGER NOT NULL COMMENT '여행지번호' -- 여행지번호
)
COMMENT '여행지태그목록';

-- 여행지태그목록
ALTER TABLE destiantion_tag_list
  ADD CONSTRAINT PK_destiantion_tag_list -- 여행지태그목록 기본키
    PRIMARY KEY (
      tag_id,         -- tag_key
      destination_id  -- 여행지번호
    );

-- 회원태그목록
CREATE TABLE user_tag_list (
  tag_id    INTEGER     NOT NULL COMMENT 'tag_key', -- tag_key
  travle_id INTEGER     NOT NULL COMMENT '여행번호', -- 여행번호
  list_name VARCHAR(50) NOT NULL COMMENT '태그목록이름', -- 태그목록이름
  type      VARCHAR(1)  NOT NULL COMMENT '선호여부' -- 선호여부
)
COMMENT '회원태그목록';

-- 회원태그목록
ALTER TABLE user_tag_list
  ADD CONSTRAINT PK_user_tag_list -- 회원태그목록 기본키
    PRIMARY KEY (
      tag_id,    -- tag_key
      travle_id  -- 여행번호
    );

-- 여행지
ALTER TABLE destination
  ADD CONSTRAINT FK_user_TO_destination -- 회원 -> 여행지
    FOREIGN KEY (
      user_id -- 회원번호
    )
    REFERENCES user ( -- 회원
      user_id -- 회원번호
    );

-- 여행지
ALTER TABLE destination
  ADD CONSTRAINT FK_destinatio_type_TO_destination -- 여행지유형 -> 여행지
    FOREIGN KEY (
      destination_type_id -- 여행지유형번호
    )
    REFERENCES destinatio_type ( -- 여행지유형
      destination_type_id -- 여행지유형번호
    );

-- 여행
ALTER TABLE travle
  ADD CONSTRAINT FK_user_TO_travle -- 회원 -> 여행
    FOREIGN KEY (
      user_id -- 여행주관자
    )
    REFERENCES user ( -- 회원
      user_id -- 회원번호
    );

-- 여행지사진
ALTER TABLE destination_img
  ADD CONSTRAINT FK_destination_TO_destination_img -- 여행지 -> 여행지사진
    FOREIGN KEY (
      destination_id -- 여행지번호
    )
    REFERENCES destination ( -- 여행지
      destination_id -- 여행지번호
    );

-- 여행지댓글
ALTER TABLE destination_comment
  ADD CONSTRAINT FK_user_TO_destination_comment -- 회원 -> 여행지댓글
    FOREIGN KEY (
      user_id2 -- 작성자번호
    )
    REFERENCES user ( -- 회원
      user_id -- 회원번호
    );

-- 여행지댓글
ALTER TABLE destination_comment
  ADD CONSTRAINT FK_destination_TO_destination_comment -- 여행지 -> 여행지댓글
    FOREIGN KEY (
      destination_id -- 여행지번호
    )
    REFERENCES destination ( -- 여행지
      destination_id -- 여행지번호
    );

-- 일정
ALTER TABLE travle_schedule
  ADD CONSTRAINT FK_travle_TO_travle_schedule -- 여행 -> 일정
    FOREIGN KEY (
      travle_id -- 여행번호
    )
    REFERENCES travle ( -- 여행
      travle_id -- 여행번호
    );

-- 일정
ALTER TABLE travle_schedule
  ADD CONSTRAINT FK_destination_TO_travle_schedule -- 여행지 -> 일정
    FOREIGN KEY (
      destination_id -- 여행지번호
    )
    REFERENCES destination ( -- 여행지
      destination_id -- 여행지번호
    );

-- 동행자
ALTER TABLE companion
  ADD CONSTRAINT FK_travle_TO_companion -- 여행 -> 동행자
    FOREIGN KEY (
      travle_id -- 여행번호
    )
    REFERENCES travle ( -- 여행
      travle_id -- 여행번호
    );

-- 동행자
ALTER TABLE companion
  ADD CONSTRAINT FK_user_TO_companion -- 회원 -> 동행자
    FOREIGN KEY (
      companion_id -- 동행자번호
    )
    REFERENCES user ( -- 회원
      user_id -- 회원번호
    );

-- todo
ALTER TABLE todo
  ADD CONSTRAINT FK_travle_TO_todo -- 여행 -> todo
    FOREIGN KEY (
      travle_id -- 여행번호
    )
    REFERENCES travle ( -- 여행
      travle_id -- 여행번호
    );

-- 좋아요
ALTER TABLE likes
  ADD CONSTRAINT FK_destination_TO_likes -- 여행지 -> 좋아요
    FOREIGN KEY (
      destination_id -- 여행지번호
    )
    REFERENCES destination ( -- 여행지
      destination_id -- 여행지번호
    );

-- 좋아요
ALTER TABLE likes
  ADD CONSTRAINT FK_user_TO_likes -- 회원 -> 좋아요
    FOREIGN KEY (
      user_id -- 회원번호
    )
    REFERENCES user ( -- 회원
      user_id -- 회원번호
    );

-- 회원추천여행지댓글
ALTER TABLE new_destination_commnet
  ADD CONSTRAINT FK_user_TO_new_destination_commnet -- 회원 -> 회원추천여행지댓글
    FOREIGN KEY (
      user_id -- 작성자번호
    )
    REFERENCES user ( -- 회원
      user_id -- 회원번호
    );

-- 회원추천여행지댓글
ALTER TABLE new_destination_commnet
  ADD CONSTRAINT FK_destination_TO_new_destination_commnet -- 여행지 -> 회원추천여행지댓글
    FOREIGN KEY (
      destination_id -- 여행지번호
    )
    REFERENCES destination ( -- 여행지
      destination_id -- 여행지번호
    );

-- 게시글
ALTER TABLE service_center
  ADD CONSTRAINT FK_user_TO_service_center -- 회원 -> 게시글
    FOREIGN KEY (
      user_id -- 회원번호
    )
    REFERENCES user ( -- 회원
      user_id -- 회원번호
    );

-- 신고
ALTER TABLE report
  ADD CONSTRAINT FK_user_TO_report -- 회원 -> 신고
    FOREIGN KEY (
      user_id -- 신고자
    )
    REFERENCES user ( -- 회원
      user_id -- 회원번호
    );

-- 답변
ALTER TABLE answer
  ADD CONSTRAINT FK_service_center_TO_answer -- 게시글 -> 답변
    FOREIGN KEY (
      service_center_id -- 게시글번호
    )
    REFERENCES service_center ( -- 게시글
      service_center_id -- 게시글번호
    );

-- 여행비용
ALTER TABLE cost
  ADD CONSTRAINT FK_travle_TO_cost -- 여행 -> 여행비용
    FOREIGN KEY (
      travle_id -- 여행번호
    )
    REFERENCES travle ( -- 여행
      travle_id -- 여행번호
    );

-- 여행지태그목록
ALTER TABLE destiantion_tag_list
  ADD CONSTRAINT FK_tag_TO_destiantion_tag_list -- tag -> 여행지태그목록
    FOREIGN KEY (
      tag_id -- tag_key
    )
    REFERENCES tag ( -- tag
      tag_id -- tag_key
    );

-- 여행지태그목록
ALTER TABLE destiantion_tag_list
  ADD CONSTRAINT FK_destination_TO_destiantion_tag_list -- 여행지 -> 여행지태그목록
    FOREIGN KEY (
      destination_id -- 여행지번호
    )
    REFERENCES destination ( -- 여행지
      destination_id -- 여행지번호
    );

-- 회원태그목록
ALTER TABLE user_tag_list
  ADD CONSTRAINT FK_tag_TO_user_tag_list -- tag -> 회원태그목록
    FOREIGN KEY (
      tag_id -- tag_key
    )
    REFERENCES tag ( -- tag
      tag_id -- tag_key
    );

-- 회원태그목록
ALTER TABLE user_tag_list
  ADD CONSTRAINT FK_travle_TO_user_tag_list -- 여행 -> 회원태그목록
    FOREIGN KEY (
      travle_id -- 여행번호
    )
    REFERENCES travle ( -- 여행
      travle_id -- 여행번호
    );
