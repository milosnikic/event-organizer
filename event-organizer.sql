--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: event; Type: TABLE; Schema: public; Owner: milos
--

CREATE TABLE public.event (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    start date NOT NULL,
    "end" date NOT NULL,
    "primary" character varying(50) NOT NULL,
    secondary character varying(50) NOT NULL,
    user_id integer
);


ALTER TABLE public.event OWNER TO milos;

--
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: milos
--

CREATE SEQUENCE public.event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO milos;

--
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: milos
--

ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: milos
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(60)
);


ALTER TABLE public."user" OWNER TO milos;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: milos
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO milos;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: milos
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: event id; Type: DEFAULT; Schema: public; Owner: milos
--

ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: milos
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: milos
--

COPY public.event (id, name, start, "end", "primary", secondary, user_id) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: milos
--

COPY public."user" (id, username, email, password) FROM stdin;
1	milos	milos.nikic@gmail.com	\N
5	milos1	milos@gmail.com	milos
6	test	test@gmail.com	test123
\.


--
-- Name: event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: milos
--

SELECT pg_catalog.setval('public.event_id_seq', 2, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: milos
--

SELECT pg_catalog.setval('public.user_id_seq', 6, true);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: milos
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: milos
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: milos
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: milos
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: event event_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: milos
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

