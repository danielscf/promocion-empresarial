start:
	docker compose up -d

stop:
	docker compose down -v

run: stop start
