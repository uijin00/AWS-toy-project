# AWS-toy-project
AWS Cloud School 11기 토이프로젝트

## Was 
1. npm install
2. npm start

## Web
java-17

1. ./gradlew build -x test
2. java -jar ./build/libs/"탭 두번".jar

demo/src/main/resource/application.properties 파일 필요


	spring.application.name=demo

	spring.datasource.url=jdbc:mysql://localhost:3306/<db 이름>
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
