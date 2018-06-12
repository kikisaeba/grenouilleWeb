name=grenouilleweb
port=10005


default:
	make -i clean
	make build
	make run

build:
	docker build -t $(name) .

run:
	docker run -p $(port):80 -d --name $(name) --restart always $(name)

logs:
	docker logs -f $(name)

clean:
	docker rm -f $(name)