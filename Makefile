all: virtualenv install frontend-deps frontend

virtualenv:
	virtualenv -p python2 deps

install:
	deps/bin/pip install -e .

frontend-deps:
	cd contrib/ && npm install

frontend:
	cd contrib/ && npm run djangobuild

.PHONY: virtualenv install frontend-deps frontend all
