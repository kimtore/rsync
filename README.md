# rsync file dump service

## Development environment

Set up a virtualenv and install the dependencies:

```
virtualenv deps
source deps/bin/activate
pip install -e .
python setup.py develop
```

## Running the development server

```
./manage.py migrate
./manage.py runserver
```

The server is now running on http://localhost:8000.
