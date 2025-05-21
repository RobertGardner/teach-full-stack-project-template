#!/bin/sh

set -e

wd=`echo "$PWD" | sed 's/\/database$//'`/database

if [ -f "$wd"/../server/.env ]; then
  . "$wd"/../server/.env
else
  echo 'no .env file found at ' "$wd"/../server/.env 1>&2
  exit 1
fi

if [ -n "$PGDATABASE" ]; then
  psql "$PGDATABASE" \
    -f "$wd"/schema.sql \
    -f "$wd"/data.sql
else
  echo 'no PGDATABASE environment variable set' 1>&2
  exit 1
fi
