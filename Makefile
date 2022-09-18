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

test-watch:
	docker-compose exec ada-back ./node_modules/.bin/jest --watch

test:
	docker-compose exec ada-back ./node_modules/.bin/jest --silent --coverage --passWithNoTests --noStackTrace --runInBand --forceExit --detectOpenHandles

cov:
	docker-compose exec ada-back ./node_modules/.bin/jest --silent --coverage --passWithNoTests --noStackTrace --runInBand --forceExit --detectOpenHandles
