from setuptools import setup, find_packages

setup(
    name = "rsync",
    version = "1.0",
    packages = find_packages(),
    install_requires = [
        'django==1.9.2',
        'django-tastypie==0.13.3',
    ]
)
