import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'this-really-needs-to-be-changed'


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:password@postgres:5432/click"
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:password@localhost:5432/click"
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
