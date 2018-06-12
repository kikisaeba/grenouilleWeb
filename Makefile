name=grenouille-web
version=0.1
image=$(name):$(version)
port=10005


default:
	make -i clean
	make build
	make run

build:
	docker build -t $(image) .

run:
	docker run -p $(port):80 -d --name $(name) --restart always $(image)

logs:
	docker logs -f $(name)

clean:
	docker rm -f $(name)
	docker rmi $(shell docker images --quiet --filter "dangling=true")