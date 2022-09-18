up:
	docker-compose up -d

stop:
	docker-compose stop

restart:
	docker-compose restart

down:
	docker-compose down

logs:
	docker-compose logs -f

cov:
	docker-compose exec ada-back npm run test:cov
