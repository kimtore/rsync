# rsync file dump service

## Create a file storage endpoint

```
# Either create a directory
mkdir files
# Or, symlink into another directory
ln -s /path/to/storage files
```

## Development environment

Set up a virtualenv and install the dependencies:

```
virtualenv deps
source deps/bin/activate
pip install -e .
python setup.py develop
```

## Running the development server

You need a `local_settings.py` with local development settings:

```
cp web/local_settings.py.example web/local_settings.py
```

Run database migrations:

```
./manage.py migrate
```

Start the web server:

```
./manage.py runserver
```

The server is now running on http://localhost:8000.

## Admin interface

http://localhost:8000/admin/

## Create an API user

To create a user, log in to the admin interface and create a user, or use the shell:

```
./manage.py createsuperuser
```

Your API key can be found at http://localhost:8000/admin/tastypie/apikey/.

## Make an API request

You'll need to create a user and an API key.

Then, you can GET and POST to http://localhost:8000/api/v1/file/?username=foo\&api_key=bar.
