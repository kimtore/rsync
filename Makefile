all: virtualenv install frontend-deps frontend

virtualenv:
	virtualenv -p python2 deps

install:
	deps/bin/pip install -e .

frontend-deps:
	cd contrib/ && npm install

frontend-dev:
	cd contrib/ && npm run djangobuild

frontend:
	cd contrib/ && npm run prodbuild
	cp contrib/public/dist/bundle.min.js web/core/static/dist/bundle.js
	cp contrib/public/dist/master.css web/core/static/dist/

.PHONY: virtualenv install frontend-deps frontend all
