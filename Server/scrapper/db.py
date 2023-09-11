"""Legacy scraper connection. Configuration uses standard PostgreSQL variables."""
import os
import psycopg2

def db_connection():
    return psycopg2.connect(os.environ.get('DATABASE_URL', ''))
