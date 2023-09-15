# Data Collection Server

This is the server used to collect data from the
[TransLoc API](https://rapidapi.com/transloc/api/openapi-1-2).

## Usage

1. Open [Docker Desktop](https://www.docker.com/products/docker-desktop/)
1. With `data-collection-server/` as the working directory, run
   `docker compose up --build -d`

## Development

### Installing Packages

1. Use `npm install [package-name]` to install a package
1. Commit the changes to `package-lock.json` and `package.json`

### Collecting Data

The current data collection workflow still requires manual operation. Automated
and "smart" data collection is currently in development.

Weekly collection is done with the following steps:

1. Access the data collection EC2 server using credentials provided in the
Project SharePoint.
   1. Go to sharepoint > keys > spreadsheet with credentials
   1. Open EC2 > Instances > data-collection-server > Actions > connect to
   instance
1. In the server, run the following command:
`docker exec -it data-collection-server-db-1 sh`. A convenient shorthand alias
is also provided. Alternatively, the `cdb` command can be used.
1. Inside the docker container terminal, open Postgres with `psql`.
1. Check data collection count by first connecting to the table:
`\c beeper beeper`. Then run the command `SELECT COUNT(*) FROM <table>;`
replacing table with either `vehicles` or `arrivals`.
1. To copy data to CSV, run:
`\copy <table> to '/tmp/<file_name>.csv' csv header;`. Note the
results will be saved in the `/tmp` folder.
1. Quit `psql` with ` \q`. Quit the docker container terminal with `exit`.
1. To copy the data into the EC2 instance from the DB container, use the
following command:
`docker cp data-collection-server-db-1:/tmp/<file_name>.csv /home/ec2-user/public`. The
data must be moved to a `public` folder assigned public access (777) to enable
copying from outside connections.
1. Quit the EC2 instance with `exit`.
1. On a local machine, copy the file from the EC2 instance

```bash
scp -i <path_to_key> <ec2_public_dns>:/home/public/<file_name>.csv <destination_in_local_machine>
```

The key and the DNS are both provided in the secure SharePoint.

1. Once the file is downloaded, upload the file to SharePoint for public access.
Data is stored in the `data` folder. The naming convention is as follows:
`<YYYY-MM-DD_start>-<YYYY-MM-DD_end>_<frequency>_<table_name>`.
