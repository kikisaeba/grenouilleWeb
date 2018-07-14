# DEV

dev-run:
	ng serve --open

# PROD

build:
	ng build --prod
	docker-compose -p grenouille -f docker/docker-compose.yml build

prod-start: build
	docker-compose -p grenouille -f docker/docker-compose.yml up --build -d

prod-stop:
	docker-compose -p grenouille -f docker/docker-compose.yml down
