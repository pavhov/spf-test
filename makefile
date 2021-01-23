dev:
	docker-compose --file docker-compose.yml up --force-recreate spf-service
clean:
	docker image rm service_spf-service --force
