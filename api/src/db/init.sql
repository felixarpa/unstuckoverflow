CREATE SEQUENCE unstuckoverflow_user_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE unstuckoverflow_user_id_seq
    OWNER TO postgres;

CREATE SEQUENCE unstuckoverflow_tag_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE unstuckoverflow_tag_id_seq
    OWNER TO postgres;

CREATE SEQUENCE unstuckoverflow_topic_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE unstuckoverflow_topic_id_seq
    OWNER TO postgres;

CREATE TABLE unstuckoverflow_user (
    id integer NOT NULL DEFAULT nextval('unstuckoverflow_user_id_seq'::regclass),
    username character varying(100) NOT NULL COLLATE pg_catalog."default",
    company character varying(100) NOT NULL COLLATE pg_catalog."default",
    full_name character varying(100) NOT NULL COLLATE pg_catalog."default",
    email character varying(100) NOT NULL COLLATE pg_catalog."default",
    password character varying(500) NOT NULL COLLATE pg_catalog."default",
    phone_number character varying(100) NOT NULL COLLATE pg_catalog."default",
    CONSTRAINT unstuckoverflow_user_pkey PRIMARY KEY (id)
) WITH (OIDS = FALSE) TABLESPACE pg_default;

ALTER TABLE unstuckoverflow_user
    OWNER to postgres;

CREATE TABLE unstuckoverflow_tag (
    id integer NOT NULL DEFAULT nextval('unstuckoverflow_tag_id_seq'::regclass),
    name character varying(100) NOT NULL COLLATE pg_catalog."default",
    CONSTRAINT unstuckoverflow_report_pkey PRIMARY KEY (id)
) WITH (OIDS = FALSE) TABLESPACE pg_default;

ALTER TABLE unstuckoverflow_tag
    OWNER to postgres;

CREATE TABLE unstuckoverflow_user_to_tag (
    user_id integer NOT NULL,
    tag_id integer NOT NULL,
    CONSTRAINT unstuckoverflow_user_to_tag_pkey PRIMARY KEY (user_id, tag_id),
    CONSTRAINT unstuckoverflow_user_to_tag_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES unstuckoverflow_user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT unstuckoverflow_user_to_tag_tag_id_fkey FOREIGN KEY (tag_id)
        REFERENCES unstuckoverflow_tag (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) WITH (OIDS = FALSE) TABLESPACE pg_default;

ALTER TABLE unstuckoverflow_user_to_tag
    OWNER to postgres;
