# AWS-toy-project
AWS Cloud School 11기 토이프로젝트

## Web 
1. npm install
2. npm start

.env.development 파일 내 ip 수정 필요

## Was
java-17

1. ./gradlew build -x test
2. java -jar ./build/libs/"탭 두번".jar

demo/src/main/resource/application.properties 파일 필요


	spring.application.name=demo

	spring.datasource.url=jdbc:mysql://<db 주소>:3306/<db 이름>
	spring.datasource.username=<username>
	spring.datasource.password=<password>

	spring.jpa.show-sql=true

	spring.jpa.hibernate.ddl-auto=update

	spring.jpa.properties.hibernate.format_sql=true

	cloud.aws.credentials.access-key=<AWS Access Key>
	cloud.aws.credentials.secret-key=<AWS Secret Key>
	cloud.aws.region.static=ap-northeast-2
	cloud.aws.stack.auto=false
	cloud.aws.s3.bucket=<Bucker 이름>

### 주의할 점!! 
Dockerfile 구조 상 AWS Key들도 같이 이미지화 하기 때문에 이미지를 public한 공간에는 두지 말 것!!!


## DB
mysql:8



