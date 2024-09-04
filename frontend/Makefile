build:
	docker-compose build
run:
	docker-compose up -d
down:
	docker-compose down
info:
	docker ps -a

delete-client:
	docker rmi dutyshifts-client

restart-client:
	docker-compose down; \
	docker rmi dutyshifts-client; \
	sudo docker-compose up -d
