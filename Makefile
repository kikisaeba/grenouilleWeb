# DEV

dev-run:
	ng serve --open

# PROD

build:
	ng build --prod
	docker-compose -p grenouilleweb -f docker/docker-compose.yml build

prod-start: build
	docker-compose -p grenouilleweb -f docker/docker-compose.yml up -d

prod-stop:
	docker-compose -p grenouilleweb -f docker/docker-compose.yml down
