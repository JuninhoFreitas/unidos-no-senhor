# Script to Backup PostgreSQL Database to a file based in docker container
# Database: unidos
# Tables: membro, biblioteca

# Variables
#lOAD ENVIRONMENT VARIABLES
DATE=$(date +"%Y-%m-%d")
TIME=$(date +"%H-%M-%S")
BACKUP_DIR="../backup"
CONTAINER_NAME="postgresdb"
DATABASE_NAME=""
DATABASE_USER=""
DATABASE_PASSWORD=""
DATABASE_HOST=""
DATABASE_PORT=""
BUCKET=""
FILE_NAME="./$DATABASE_NAME-$DATE-$TIME.sql"

# Create backup directory

if [ ! -d $BACKUP_DIR ]; then
  mkdir -p $BACKUP_DIR
fi

# Backup database to file and compress it in a pipe 
# must authenticate with password
docker exec -i ${CONTAINER_NAME} /bin/bash -c "PGPASSWORD=${DATABASE_PASSWORD} pg_dump -h ${DATABASE_HOST} -p ${DATABASE_PORT} -U ${DATABASE_USER} ${DATABASE_NAME}" > $FILE_NAME
# Send to a s3 bucket
# aws s3 cp $FILE_NAME $BUCKET

# Restore database from file
# docker exec -i ${CONTAINER_NAME}  /bin/bash -c "PGPASSWORD=${DATABASE_PASSWORD} psql --username ${DATABASE_USER} ${DATABASE_NAME}" < ./dump.sql
