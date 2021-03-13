#!/bin/bash
if [ -f ./.env ]; then
	echo Found previous install
else
	echo 'enter a password for postgresql user '$(whoami)
	read password
	sudo -i -u postgres psql -U postgres -d postgres -c "create role $(whoami) superuser login password '"$password"'"

	echo 'CONNECTIONSTRING=postgres://'$(whoami)':'$password'@localhost:5432/postgres' > .env
	echo 'enter a secret string to sign tokens with'
	read secret

	echo 'SECRET='$secret >> .env
	echo 'if you want to connect using https, add these lines to .env with the corresponding paths to your TLS/SSL private key andcertificate:'
	echo
	echo 'KEYFILEPATH=/path/to/key'
	echo 'CERTFILEPATH=/path/to/cert'
fi
