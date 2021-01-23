#!/bin/bash
if [ -f ./.env ]; then
	echo Found previous install
else
	echo 'enter a password for postgresql user '$(whoami)
	read password
	sudo -i -u postgres psql -U postgres -d postgres -c "create role $(whoami) superuser login password '"$password"'"

	echo 'CONNECTIONSTRING=postgres://'$(whoami)':'$password'@localhost:5432/postgres' > .env
fi
