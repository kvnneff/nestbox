DROP TABLE IF EXISTS farms;

--
-- Name: farms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE farms (
    farm_id serial primary key,
    user_id text NOT NULL UNIQUE,
    name text NOT NULL,
    email text NOT NULL,
    street text NOT NULL,
    is_public boolean NOT NULL,
    zipcode text NOT NULL,
    state text NOT NULL,
    city text NOT NULL,
    available boolean NOT NULL,
    price money NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    geom geometry(Point,4326),
    description text,
    phone TEXT,
    free_range boolean NOT NULL,
    organic boolean NOT NULL,
    drive_up boolean NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX tsv_idx ON farms USING gin((setweight(to_tsvector('english', name), 'A') ||
  setweight(to_tsvector('english', description), 'B')));
