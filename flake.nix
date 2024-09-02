{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: let
    system = "aarch64-darwin";
  in {
    devShells."${system}".default = let
      pkgs = import nixpkgs {
        inherit system;
      };
    in pkgs.mkShell {
      packages = with pkgs; [
        bun
        go
        air
        procps
        coreutils
        ncurses
        postgresql_16
        goose
      ];

      shellHook = ''
        export PGDATA=.pgdata;
        export PGUSER=postgres;
        export PGHOST=localhost;
        export PGPORT=5432;
        export DBNAME=core;

        export GOOSE_DRIVER=postgres;
        export GOOSE_DBSTRING="host=$PGHOST user=$PGUSER dbname=$DBNAME sslmode=disable"
        export GOOSE_MIGRATION_DIR="$PWD/backend/server/migrations"

        echo Welcome!

        if [ ! -d "$PGDATA" ]; then
          initdb -U "$PGUSER" -D "$PGDATA"
          createdb -U "$PGUSER" $DBNAME
        fi

        if ! pgrep -x "postgres" > /dev/null; then
            echo "Starting Postgres..."
            pg_ctl -D "$PGDATA" -l "$PGDATA/postgresql.log" start
        fi
      '';

    };
  };
}
