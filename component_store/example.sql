--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Debian 14.7-1.pgdg110+1)
-- Dumped by pg_dump version 15.2

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
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: componento
--

COPY public.component (id, uuid, name, website) FROM stdin;
1	855a5d06-4264-4f1a-ad32-c0edef01cce6	example-component	http://example.com
\.

--
-- Data for Name: component_version; Type: TABLE DATA; Schema: public; Owner: componento
--

COPY public.component_version (id, uuid, component_id, version, information, entry_file, publisher) FROM stdin;
1	72204fc5-7335-45c1-81d2-81abd9912fcc	1	1.2.3	<p>Example instructions for component</p>	example.js	example_publisher
\.

--
-- PostgreSQL database dump complete
--

