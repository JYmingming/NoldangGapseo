-- ȸ��
CREATE TABLE `user` (
	`user_id`     INTEGER      NOT NULL COMMENT 'ȸ����ȣ', -- ȸ����ȣ
	`id`          VARCHAR(50)  NOT NULL COMMENT 'id', -- id
	`pwd`         VARCHAR(13)  NOT NULL COMMENT 'pwd', -- pwd
	`email`       VARCHAR(40)  NOT NULL COMMENT 'email', -- email
	`phone`       VARCHAR(30)  NOT NULL COMMENT 'phone', -- phone
	`nick_name`   VARCHAR(50)  NOT NULL COMMENT 'nick_name', -- nick_name
	`reg_date`    TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
	`update_date` TIMESTAMP    NOT NULL COMMENT 'update_date', -- update_date
	`profile_img` VARCHAR(500) NULL     COMMENT '�����ʻ���' -- �����ʻ���
)
COMMENT 'ȸ��';

-- ȸ��
ALTER TABLE `user`
	ADD CONSTRAINT `PK_user` -- ȸ�� �⺻Ű
		PRIMARY KEY (
			`user_id` -- ȸ����ȣ
		);

-- ȸ�� ����ũ �ε���
CREATE UNIQUE INDEX `UIX_user`
	ON `user` ( -- ȸ��
		`email` ASC -- email
	);

-- ȸ�� ����ũ �ε���2
CREATE UNIQUE INDEX `UIX_user2`
	ON `user` ( -- ȸ��
		`id` ASC -- id
	);

-- ȸ�� ����ũ �ε���3
CREATE UNIQUE INDEX `UIX_user3`
	ON `user` ( -- ȸ��
		`phone` ASC -- phone
	);

-- ȸ�� ����ũ �ε���4
CREATE UNIQUE INDEX `UIX_user4`
	ON `user` ( -- ȸ��
		`nick_name` ASC -- nick_name
	);

ALTER TABLE `user`
	MODIFY COLUMN `id` VARCHAR(50) NOT NULL AUTO_INCREMENT COMMENT 'id';

-- ������
CREATE TABLE `destination` (
	`destination_id`      INTEGER      NOT NULL COMMENT '��������ȣ', -- ��������ȣ
	`user_id`             INTEGER      NULL     COMMENT 'ȸ����ȣ', -- ȸ����ȣ
	`destination_type_id` INTEGER      NULL     COMMENT '������������ȣ', -- ������������ȣ
	`destination_name`    VARCHAR(255) NOT NULL COMMENT '�̸�', -- �̸�
	`contents`            TEXT         NOT NULL COMMENT '����', -- ����
	`phone`               VARCHAR(30)  NULL     COMMENT '�ȳ���ȭ', -- �ȳ���ȭ
	`latitude`            FLOAT        NULL     COMMENT '����', -- ����
	`longitude`           FLOAT        NULL     COMMENT '�浵', -- �浵
	`adress`              VARCHAR(255) NOT NULL COMMENT '�ּ�', -- �ּ�
	`travle_post_type`    VARCHAR(1)   NULL     COMMENT '�������Խñ�����' -- �������Խñ�����
)
COMMENT '������';

-- ������
ALTER TABLE `destination`
	ADD CONSTRAINT `PK_destination` -- ������ �⺻Ű
		PRIMARY KEY (
			`destination_id` -- ��������ȣ
		);

-- ������ ����ũ �ε���
CREATE UNIQUE INDEX `UIX_destination`
	ON `destination` ( -- ������
		`adress` ASC -- �ּ�
	);

ALTER TABLE `destination`
	MODIFY COLUMN `destination_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '��������ȣ';

-- ����
CREATE TABLE `travle` (
	`travle_id`   INTEGER      NOT NULL COMMENT '�����ȣ', -- �����ȣ
	`user_id`     INTEGER      NOT NULL COMMENT '�����ְ���', -- �����ְ���
	`travle_name` VARCHAR(100) NOT NULL COMMENT 'name', -- name
	`reg_date`    TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
	`update_date` TIMESTAMP    NOT NULL COMMENT 'update_date', -- update_date
	`start_date`  DATE         NOT NULL COMMENT '�����', -- �����
	`end_date`    DATE         NOT NULL COMMENT '������' -- ������
)
COMMENT '����';

-- ����
ALTER TABLE `travle`
	ADD CONSTRAINT `travle` -- ���� �⺻Ű
		PRIMARY KEY (
			`travle_id` -- �����ȣ
		);

ALTER TABLE `travle`
	MODIFY COLUMN `travle_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '�����ȣ';

-- tag
CREATE TABLE `tag` (
	`tag_id`   INTEGER     NOT NULL COMMENT 'tag_key', -- tag_key
	`tag_name` VARCHAR(50) NOT NULL COMMENT 'tag_name' -- tag_name
)
COMMENT 'tag';

-- tag
ALTER TABLE `tag`
	ADD CONSTRAINT `tag` -- tag �⺻Ű
		PRIMARY KEY (
			`tag_id` -- tag_key
		);

ALTER TABLE `tag`
	MODIFY COLUMN `tag_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT 'tag_key';

-- ����������
CREATE TABLE `destination_img` (
	`destination_img_id` INTEGER      NOT NULL COMMENT '������������ȣ', -- ������������ȣ
	`destination_id`     INTEGER      NOT NULL COMMENT '��������ȣ', -- ��������ȣ
	`img`                VARCHAR(500) NOT NULL COMMENT '����' -- ����
)
COMMENT '����������';

-- ����������
ALTER TABLE `destination_img`
	ADD CONSTRAINT `PK_destination_img` -- ���������� �⺻Ű
		PRIMARY KEY (
			`destination_img_id` -- ������������ȣ
		);

ALTER TABLE `destination_img`
	MODIFY COLUMN `destination_img_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '������������ȣ';

-- ���������
CREATE TABLE `destination_comment` (
	`comment_id`     INTEGER      NOT NULL COMMENT '��۹�ȣ', -- ��۹�ȣ
	`destination_id` INTEGER      NOT NULL COMMENT '��������ȣ', -- ��������ȣ
	`user_id2`       INTEGER      NOT NULL COMMENT '�ۼ��ڹ�ȣ', -- �ۼ��ڹ�ȣ
	`contents`       VARCHAR(100) NOT NULL COMMENT 'content', -- content
	`reg_date`       TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
	`update_date`    TIMESTAMP    NOT NULL COMMENT 'update_date' -- update_date
)
COMMENT '���������';

-- ���������
ALTER TABLE `destination_comment`
	ADD CONSTRAINT `PK_destination_comment` -- ��������� �⺻Ű
		PRIMARY KEY (
			`comment_id` -- ��۹�ȣ
		);

-- ����
CREATE TABLE `travle_schedule` (
	`schedule_id`    INTEGER NOT NULL COMMENT '������ȣ', -- ������ȣ
	`travle_id`      INTEGER NOT NULL COMMENT '�����ȣ', -- �����ȣ
	`destination_id` INTEGER NOT NULL COMMENT '��������ȣ', -- ��������ȣ
	`day`            INTEGER NOT NULL COMMENT '�Ͻ�' -- �Ͻ�
)
COMMENT '����';

-- ����
ALTER TABLE `travle_schedule`
	ADD CONSTRAINT `travle_schedule` -- ���� �⺻Ű
		PRIMARY KEY (
			`schedule_id` -- ������ȣ
		);

ALTER TABLE `travle_schedule`
	MODIFY COLUMN `schedule_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '������ȣ';

-- ������
CREATE TABLE `companion` (
	`travle_id`    INTEGER NOT NULL COMMENT '�����ȣ', -- �����ȣ
	`companion_id` INTEGER NOT NULL COMMENT '�����ڹ�ȣ', -- �����ڹ�ȣ
	`statment`     BOOLEAN NOT NULL COMMENT '����' -- ����
)
COMMENT '������';

-- ������
ALTER TABLE `companion`
	ADD CONSTRAINT `PK_companion` -- ������ �⺻Ű
		PRIMARY KEY (
			`travle_id`,    -- �����ȣ
			`companion_id`  -- �����ڹ�ȣ
		);

-- todo
CREATE TABLE `todo` (
	`todo_id`     INTEGER      NOT NULL COMMENT 'todo_key', -- todo_key
	`travle_id`   INTEGER      NOT NULL COMMENT '�����ȣ', -- �����ȣ
	`name`        VARCHAR(100) NOT NULL COMMENT 'name', -- name
	`reg_date`    TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
	`update_date` TIMESTAMP    NOT NULL COMMENT 'update_date', -- update_date
	`status`      BOOLEAN      NOT NULL COMMENT 'done' -- done
)
COMMENT 'todo';

-- todo
ALTER TABLE `todo`
	ADD CONSTRAINT `PK_todo` -- todo �⺻Ű
		PRIMARY KEY (
			`todo_id` -- todo_key
		);

ALTER TABLE `todo`
	MODIFY COLUMN `todo_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT 'todo_key';

-- ���ƿ�
CREATE TABLE `like` (
	`destination_id` INTEGER NOT NULL COMMENT '��������ȣ', -- ��������ȣ
	`user_id`        INTEGER NOT NULL COMMENT 'ȸ����ȣ' -- ȸ����ȣ
)
COMMENT '���ƿ�';

-- ���ƿ�
ALTER TABLE `like`
	ADD CONSTRAINT `PK_like` -- ���ƿ� �⺻Ű
		PRIMARY KEY (
			`destination_id`, -- ��������ȣ
			`user_id`         -- ȸ����ȣ
		);

-- ����������
CREATE TABLE `destinatio_type` (
	`destination_type_id` INTEGER     NOT NULL COMMENT '������������ȣ', -- ������������ȣ
	`destination_name`    VARCHAR(10) NOT NULL COMMENT '�����̸�' -- �����̸�
)
COMMENT '����������';

-- ����������
ALTER TABLE `destinatio_type`
	ADD CONSTRAINT `PK_destinatio_type` -- ���������� �⺻Ű
		PRIMARY KEY (
			`destination_type_id` -- ������������ȣ
		);

ALTER TABLE `destinatio_type`
	MODIFY COLUMN `destination_type_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '������������ȣ';

-- ȸ����õ���������
CREATE TABLE `new_destination_commnet` (
	`new_destination_comment_id` INTEGER      NOT NULL COMMENT 'ȸ����õ��������۹�ȣ', -- ȸ����õ��������۹�ȣ
	`user_id`                    INTEGER      NOT NULL COMMENT '�ۼ��ڹ�ȣ', -- �ۼ��ڹ�ȣ
	`destination_id`             INTEGER      NOT NULL COMMENT '��������ȣ', -- ��������ȣ
	`contents`                   VARCHAR(100) NOT NULL COMMENT 'content', -- content
	`reg_date`                   TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
	`update_date`                TIMESTAMP    NOT NULL COMMENT 'update_date' -- update_date
)
COMMENT 'ȸ����õ���������';

-- ȸ����õ���������
ALTER TABLE `new_destination_commnet`
	ADD CONSTRAINT `PK_new_destination_commnet` -- ȸ����õ��������� �⺻Ű
		PRIMARY KEY (
			`new_destination_comment_id` -- ȸ����õ��������۹�ȣ
		);

-- �Խñ�
CREATE TABLE `service_center` (
	`service_center_id` INTEGER      NOT NULL COMMENT '�Խñ۹�ȣ', -- �Խñ۹�ȣ
	`user_id`           INTEGER      NOT NULL COMMENT 'ȸ����ȣ', -- ȸ����ȣ
	`service_type`      VARCHAR(1)   NOT NULL COMMENT 'Ÿ��', -- Ÿ��
	`title`             VARCHAR(255) NOT NULL COMMENT '����', -- ����
	`contents`          TEXT         NOT NULL COMMENT '����', -- ����
	`view_count`        INTEGER      NOT NULL COMMENT '��ȸ��', -- ��ȸ��
	`reg_date`          TIMESTAMP    NOT NULL COMMENT '�Խó�¥', -- �Խó�¥
	`update_date`       TIMESTAMP    NOT NULL COMMENT '������¥' -- ������¥
)
COMMENT '�Խñ�';

-- �Խñ�
ALTER TABLE `service_center`
	ADD CONSTRAINT `PK_service_center` -- �Խñ� �⺻Ű
		PRIMARY KEY (
			`service_center_id` -- �Խñ۹�ȣ
		);

ALTER TABLE `service_center`
	MODIFY COLUMN `service_center_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '�Խñ۹�ȣ';

-- �Ű�
CREATE TABLE `report` (
	`report_id`   INTEGER      NOT NULL COMMENT '�Ű��ȣ', -- �Ű��ȣ
	`user_id`     INTEGER      NOT NULL COMMENT '�Ű���', -- �Ű���
	`post_type`   VARCHAR(1)   NOT NULL COMMENT '��Ÿ��', -- ��Ÿ��
	`post_id`     INTEGER      NOT NULL COMMENT '�۹�ȣ', -- �۹�ȣ
	`contents`    VARCHAR(100) NOT NULL COMMENT '�Ű�����', -- �Ű�����
	`reg_date`    TIMESTAMP    NOT NULL COMMENT '�Ű�¥', -- �Ű�¥
	`update_date` TIMESTAMP    NOT NULL COMMENT '������¥' -- ������¥
)
COMMENT '�Ű�';

-- �Ű�
ALTER TABLE `report`
	ADD CONSTRAINT `PK_report` -- �Ű� �⺻Ű
		PRIMARY KEY (
			`report_id` -- �Ű��ȣ
		);

-- �亯
CREATE TABLE `answer` (
	`service_center_id` INTEGER NOT NULL COMMENT '�Խñ۹�ȣ', -- �Խñ۹�ȣ
	`answer`            TEXT    NOT NULL COMMENT '�亯' -- �亯
)
COMMENT '�亯';

-- �亯
ALTER TABLE `answer`
	ADD CONSTRAINT `PK_answer` -- �亯 �⺻Ű
		PRIMARY KEY (
			`service_center_id` -- �Խñ۹�ȣ
		);

-- ������
CREATE TABLE `cost` (
	`cost_id`     INTEGER      NOT NULL COMMENT '����ȣ', -- ����ȣ
	`travle_id`   INTEGER      NOT NULL COMMENT '�����ȣ', -- �����ȣ
	`name`        VARCHAR(255) NOT NULL COMMENT 'name', -- name
	`reg_date`    TIMESTAMP    NOT NULL COMMENT 'reg_date', -- reg_date
	`update_date` TIMESTAMP    NOT NULL COMMENT 'update_date', -- update_date
	`cost`        INTEGER      NOT NULL COMMENT '���' -- ���
)
COMMENT '������';

-- ������
ALTER TABLE `cost`
	ADD CONSTRAINT `cost` -- ������ �⺻Ű
		PRIMARY KEY (
			`cost_id` -- ����ȣ
		);

ALTER TABLE `cost`
	MODIFY COLUMN `cost_id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '����ȣ';

-- �������±׸��
CREATE TABLE `destiantion_tag_list` (
	`tag_id`         INTEGER NOT NULL COMMENT 'tag_key', -- tag_key
	`destination_id` INTEGER NOT NULL COMMENT '��������ȣ' -- ��������ȣ
)
COMMENT '�������±׸��';

-- �������±׸��
ALTER TABLE `destiantion_tag_list`
	ADD CONSTRAINT `PK_destiantion_tag_list` -- �������±׸�� �⺻Ű
		PRIMARY KEY (
			`tag_id`,         -- tag_key
			`destination_id`  -- ��������ȣ
		);

-- ȸ���±׸��
CREATE TABLE `user_tag_list` (
	`tag_id`    INTEGER     NOT NULL COMMENT 'tag_key', -- tag_key
	`travle_id` INTEGER     NOT NULL COMMENT '�����ȣ', -- �����ȣ
	`list_name` VARCHAR(50) NOT NULL COMMENT '�±׸���̸�', -- �±׸���̸�
	`type`      VARCHAR(1)  NOT NULL COMMENT '��ȣ����' -- ��ȣ����
)
COMMENT 'ȸ���±׸��';

-- ȸ���±׸��
ALTER TABLE `user_tag_list`
	ADD CONSTRAINT `PK_user_tag_list` -- ȸ���±׸�� �⺻Ű
		PRIMARY KEY (
			`tag_id`,    -- tag_key
			`travle_id`  -- �����ȣ
		);

-- ������
ALTER TABLE `destination`
	ADD CONSTRAINT `FK_user_TO_destination` -- ȸ�� -> ������
		FOREIGN KEY (
			`user_id` -- ȸ����ȣ
		)
		REFERENCES `user` ( -- ȸ��
			`user_id` -- ȸ����ȣ
		);

-- ������
ALTER TABLE `destination`
	ADD CONSTRAINT `FK_destinatio_type_TO_destination` -- ���������� -> ������
		FOREIGN KEY (
			`destination_type_id` -- ������������ȣ
		)
		REFERENCES `destinatio_type` ( -- ����������
			`destination_type_id` -- ������������ȣ
		);

-- ����
ALTER TABLE `travle`
	ADD CONSTRAINT `FK_user_TO_travle` -- ȸ�� -> ����
		FOREIGN KEY (
			`user_id` -- �����ְ���
		)
		REFERENCES `user` ( -- ȸ��
			`user_id` -- ȸ����ȣ
		);

-- ����������
ALTER TABLE `destination_img`
	ADD CONSTRAINT `FK_destination_TO_destination_img` -- ������ -> ����������
		FOREIGN KEY (
			`destination_id` -- ��������ȣ
		)
		REFERENCES `destination` ( -- ������
			`destination_id` -- ��������ȣ
		);

-- ���������
ALTER TABLE `destination_comment`
	ADD CONSTRAINT `FK_user_TO_destination_comment` -- ȸ�� -> ���������
		FOREIGN KEY (
			`user_id2` -- �ۼ��ڹ�ȣ
		)
		REFERENCES `user` ( -- ȸ��
			`user_id` -- ȸ����ȣ
		);

-- ���������
ALTER TABLE `destination_comment`
	ADD CONSTRAINT `FK_destination_TO_destination_comment` -- ������ -> ���������
		FOREIGN KEY (
			`destination_id` -- ��������ȣ
		)
		REFERENCES `destination` ( -- ������
			`destination_id` -- ��������ȣ
		);

-- ����
ALTER TABLE `travle_schedule`
	ADD CONSTRAINT `FK_travle_TO_travle_schedule` -- ���� -> ����
		FOREIGN KEY (
			`travle_id` -- �����ȣ
		)
		REFERENCES `travle` ( -- ����
			`travle_id` -- �����ȣ
		);

-- ����
ALTER TABLE `travle_schedule`
	ADD CONSTRAINT `FK_destination_TO_travle_schedule` -- ������ -> ����
		FOREIGN KEY (
			`destination_id` -- ��������ȣ
		)
		REFERENCES `destination` ( -- ������
			`destination_id` -- ��������ȣ
		);

-- ������
ALTER TABLE `companion`
	ADD CONSTRAINT `FK_travle_TO_companion` -- ���� -> ������
		FOREIGN KEY (
			`travle_id` -- �����ȣ
		)
		REFERENCES `travle` ( -- ����
			`travle_id` -- �����ȣ
		);

-- ������
ALTER TABLE `companion`
	ADD CONSTRAINT `FK_user_TO_companion` -- ȸ�� -> ������
		FOREIGN KEY (
			`companion_id` -- �����ڹ�ȣ
		)
		REFERENCES `user` ( -- ȸ��
			`user_id` -- ȸ����ȣ
		);

-- todo
ALTER TABLE `todo`
	ADD CONSTRAINT `FK_travle_TO_todo` -- ���� -> todo
		FOREIGN KEY (
			`travle_id` -- �����ȣ
		)
		REFERENCES `travle` ( -- ����
			`travle_id` -- �����ȣ
		);

-- ���ƿ�
ALTER TABLE `like`
	ADD CONSTRAINT `FK_destination_TO_like` -- ������ -> ���ƿ�
		FOREIGN KEY (
			`destination_id` -- ��������ȣ
		)
		REFERENCES `destination` ( -- ������
			`destination_id` -- ��������ȣ
		);

-- ���ƿ�
ALTER TABLE `like`
	ADD CONSTRAINT `FK_user_TO_like` -- ȸ�� -> ���ƿ�
		FOREIGN KEY (
			`user_id` -- ȸ����ȣ
		)
		REFERENCES `user` ( -- ȸ��
			`user_id` -- ȸ����ȣ
		);

-- ȸ����õ���������
ALTER TABLE `new_destination_commnet`
	ADD CONSTRAINT `FK_user_TO_new_destination_commnet` -- ȸ�� -> ȸ����õ���������
		FOREIGN KEY (
			`user_id` -- �ۼ��ڹ�ȣ
		)
		REFERENCES `user` ( -- ȸ��
			`user_id` -- ȸ����ȣ
		);

-- ȸ����õ���������
ALTER TABLE `new_destination_commnet`
	ADD CONSTRAINT `FK_destination_TO_new_destination_commnet` -- ������ -> ȸ����õ���������
		FOREIGN KEY (
			`destination_id` -- ��������ȣ
		)
		REFERENCES `destination` ( -- ������
			`destination_id` -- ��������ȣ
		);

-- �Խñ�
ALTER TABLE `service_center`
	ADD CONSTRAINT `FK_user_TO_service_center` -- ȸ�� -> �Խñ�
		FOREIGN KEY (
			`user_id` -- ȸ����ȣ
		)
		REFERENCES `user` ( -- ȸ��
			`user_id` -- ȸ����ȣ
		);

-- �Ű�
ALTER TABLE `report`
	ADD CONSTRAINT `FK_user_TO_report` -- ȸ�� -> �Ű�
		FOREIGN KEY (
			`user_id` -- �Ű���
		)
		REFERENCES `user` ( -- ȸ��
			`user_id` -- ȸ����ȣ
		);

-- �亯
ALTER TABLE `answer`
	ADD CONSTRAINT `FK_service_center_TO_answer` -- �Խñ� -> �亯
		FOREIGN KEY (
			`service_center_id` -- �Խñ۹�ȣ
		)
		REFERENCES `service_center` ( -- �Խñ�
			`service_center_id` -- �Խñ۹�ȣ
		);

-- ������
ALTER TABLE `cost`
	ADD CONSTRAINT `FK_travle_TO_cost` -- ���� -> ������
		FOREIGN KEY (
			`travle_id` -- �����ȣ
		)
		REFERENCES `travle` ( -- ����
			`travle_id` -- �����ȣ
		);

-- �������±׸��
ALTER TABLE `destiantion_tag_list`
	ADD CONSTRAINT `FK_tag_TO_destiantion_tag_list` -- tag -> �������±׸��
		FOREIGN KEY (
			`tag_id` -- tag_key
		)
		REFERENCES `tag` ( -- tag
			`tag_id` -- tag_key
		);

-- �������±׸��
ALTER TABLE `destiantion_tag_list`
	ADD CONSTRAINT `FK_destination_TO_destiantion_tag_list` -- ������ -> �������±׸��
		FOREIGN KEY (
			`destination_id` -- ��������ȣ
		)
		REFERENCES `destination` ( -- ������
			`destination_id` -- ��������ȣ
		);

-- ȸ���±׸��
ALTER TABLE `user_tag_list`
	ADD CONSTRAINT `FK_tag_TO_user_tag_list` -- tag -> ȸ���±׸��
		FOREIGN KEY (
			`tag_id` -- tag_key
		)
		REFERENCES `tag` ( -- tag
			`tag_id` -- tag_key
		);

-- ȸ���±׸��
ALTER TABLE `user_tag_list`
	ADD CONSTRAINT `FK_travle_TO_user_tag_list` -- ���� -> ȸ���±׸��
		FOREIGN KEY (
			`travle_id` -- �����ȣ
		)
		REFERENCES `travle` ( -- ����
			`travle_id` -- �����ȣ
		);