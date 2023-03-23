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