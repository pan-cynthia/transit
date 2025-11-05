CREATE TABLE public.routes (
    route_id text NOT NULL,
    agency_id text,
    route_short_name text,
    route_long_name text,
    route_desc text,
    route_type integer,
    route_url text,
    route_color text,
    route_text_color text
);

CREATE TABLE public.shapes (
    shape_id text NOT NULL,
    shape_pt_lon double precision,
    shape_pt_lat double precision,
    shape_pt_sequence integer NOT NULL,
    shape_dist_traveled double precision
);

CREATE TABLE public.stop_times (
    trip_id text NOT NULL,
    arrival_time text,
    departure_time text,
    stop_id text,
    stop_sequence integer NOT NULL,
    stop_headsign text,
    pickup_type integer,
    drop_off_type integer,
    shape_dist_traveled real,
    timepoint integer
);

CREATE TABLE public.stops (
    stop_id text NOT NULL,
    stop_code text,
    stop_name text,
    stop_lat real,
    stop_lon real,
    zone_id text,
    stop_desc text,
    stop_url text,
    location_type text,
    parent_station text,
    stop_timezone text,
    wheelchair_boarding integer,
    platform_code integer
);

CREATE TABLE public.trips (
    route_id text,
    service_id text,
    trip_id text NOT NULL,
    trip_headsign text,
    direction_id integer,
    block_id text,
    shape_id text,
    trip_short_name text,
    bikes_allowed text,
    wheelchair_accessible text
);

CREATE MATERIALIZED VIEW public.stops_list AS
 WITH longest_trips AS (
         SELECT DISTINCT ON (t.route_id, t.direction_id) t.route_id,
            t.direction_id,
            t.trip_id
           FROM (public.trips t
             JOIN public.stop_times st_1 ON ((t.trip_id = st_1.trip_id)))
          GROUP BY t.route_id, t.direction_id, t.trip_id
          ORDER BY t.route_id, t.direction_id, (count(st_1.stop_id)) DESC
        )
 SELECT DISTINCT ON (lt.route_id, lt.direction_id, st.stop_sequence) lt.route_id,
    lt.direction_id,
    st.stop_sequence,
    st.stop_id,
    s.stop_name,
    s.stop_lat,
    s.stop_lon
   FROM ((longest_trips lt
     JOIN public.stop_times st ON ((st.trip_id = lt.trip_id)))
     JOIN public.stops s ON ((st.stop_id = s.stop_id)))
  ORDER BY lt.route_id, lt.direction_id, st.stop_sequence, st.stop_id
  WITH NO DATA;