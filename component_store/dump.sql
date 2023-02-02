--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: component; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.component (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    name character varying NOT NULL,
    website text
);


ALTER TABLE public.component OWNER TO postgres;

--
-- Name: component_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.component_version (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    component_id bigint NOT NULL,
    version character varying NOT NULL,
    information text,
    entry_file character varying NOT NULL,
    publisher text
);


ALTER TABLE public.component_version OWNER TO postgres;

--
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.component (id, uuid, name, website) FROM stdin;
1	e011db0c-bb68-45a4-ac9c-7fa1438de942	Anu old	fhd
2	8918f1ff-abc5-462c-bbab-d348de2e816e	ball	nc
3	60b1eaf1-26b9-44d9-b35f-0c0d28644ce3	delhi	jlhj
4	f2227785-41f5-439a-9ad4-5cf4f4669311	Germany	jfj
5	1429bc84-8f67-440d-b4a5-f69e9b6781a9	sprint Review	dfhdfhj
6	af73b5f4-3ba0-43b0-8273-da2b951e04af	new sprint	jfgj
7	eccead89-fcaf-4320-b17d-ed504c45db84	gfjfgjfg gfjkfgk	7457
8	29ee64fb-a40d-41c3-98a5-ebd8f198e7fe	547457	trurt
9	58591cda-5e38-4b12-8c44-93d37389085c	54647tg	riri
10	fe6358dd-3efb-409a-9f89-c72fcb3a9696	nisha	
11	2fe673d8-e168-480e-90fa-84c70c030d36	fenja	
12	a393eec2-33f3-401e-9ecf-f884b2287273	hello	
13	616d6f7f-5643-4279-8183-acd79ea3bd70	hello455	
14	7a06d641-c8ac-4686-80ab-acc066baa793	after merge	
15	41ec5846-fb59-413f-b3ae-1c5c4dc4631b	publisher	dsg
16	97a96b5e-199c-4ae3-a830-08f0c1643d77	new publisher	
17	d90d8837-74fe-4c1f-85fd-aad3a2d9751d	new try publisher	
18	f928db8e-dee8-4fe6-94dc-314b6eac1365	publisher5	
19	fd64275a-0946-40a6-a9ce-77f75777b7ab	567publisher	
20	c9808ce1-1a94-4e73-9478-9914697a9638	publisher567g	
21	e3b96397-8539-403d-b57c-cb7e1c6891ff	publisher9876	
22	79844c35-08df-4d5b-8b05-87fe3c523fb5	pagination	f
23	a94ceb34-6050-4a49-8cfa-67cdff39e6e2	pagination new try	f
24	20381adb-186b-4b08-ab50-b94683259594	pagination new-try _again	f
25	6e83e9f5-2e32-426c-bda1-4196d59a87e1	zz	
26	5666c8f5-3306-469e-9c56-08085a937197	file upload- againgj	
27	a82cd57a-7d48-4464-94d4-31190a74513d	file new upload-again_2	
28	e0b7a9ac-5186-4169-87ca-1b32af78f13b	trry2 3-bg_45	
29	5125b1df-7045-4bfe-85ab-7c21fcc67653	input-restrictionr	
30	d7dcce63-5f91-4c03-9612-c9af82269c2a	new-file-restriction	
31	691bedec-b6f2-4500-8ff7-7cd48acb2b24	new-file-restriction-2	
32	c9c2d9f5-9675-4113-a342-a8f9e451db9d	gfjfjf	
33	8e9e1937-3350-4026-ab27-1229adb0c207	hi	
34	0fd704bb-4d5d-4f67-ae4b-ba80504a75be	new-name	
35	28b53085-a660-40bb-85f3-1aaae4597207	ne-query	
36	383a5020-02d0-4bb0-90d4-026bb2e49257	ball2	
37	c0eca85d-cad7-4900-8112-de9e37fd8eb4	GDFS	
38	fd616c33-1378-4173-9660-99bd82610d57	sure	
39	8d8b50eb-f039-4751-badf-27abd8daa187	nishas	
40	bdea959f-ea3c-4e87-a175-8a2ef6880b1f	nishar	
41	277d3988-24a1-4556-8bf3-5e71bf889d64	nishaw	
42	30af569b-f3ad-465d-acf6-0f6c29e03cda	nisha1	
43	94a6188b-2cf6-4830-806d-32b9016dd87e	publisher34	
44	87dae610-c567-470e-8665-b16e70b525c6	publisher67	
45	a1211a8c-c30a-47d0-aab6-f617b7a3cb71	publisher98	
46	c0801131-2acc-4d5d-be1c-701b1cab54bb	publisher65	
47	734d79c4-49fd-4c16-bdfa-23434fd2306d	publisher50	
48	78d7ec10-bf9a-4f33-aaa3-4d6f54155a39	hgj7-fgjfj	
49	a7660593-bc4a-40b8-af88-1f8cdfbaccd3	gfjkgk	
50	66c2179c-cd98-498d-a6d3-d7709ab10daf	today-upload-24	
51	9a0ff53f-8e9b-457b-9892-5ebf53002833	test-upload	google.de
52	66c029c1-a0ba-4876-8840-d00bc3a18ce1	nisha12	
53	a85a95df-5e9f-4971-9647-3da3284e0e24	nisha123-nisha	
54	b5de4b7d-c4c2-4705-aef9-90c578fe60b5	nishai	
55	d153d5b4-244c-4214-be00-5a07017a7512	hjfzkju	
56	10c19b29-7f35-4318-8e10-91c4dbc3033b	gkjg	
57	87a61679-0689-444e-a473-6b8719057a59	nishad	
58	2543ad2b-162e-483d-88a0-fa9b3332c1d4	nishah	
59	59cacfc9-84e6-4c3e-9756-647437b9e25b	nishagsg	
60	173fcb4b-35cc-474e-8061-fbb997cfb68d	new-compo	dsg
61	237325a7-97e9-4f5c-bdcb-884d6999e3af	testing-new	dgs
62	9a685c04-89ba-4d30-a404-b5c2bbbc1c00	today-new	dfh
\.


--
-- Data for Name: component_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.component_version (id, uuid, component_id, version, information, entry_file, publisher) FROM stdin;
39	deb3e17c-1211-4fc7-ae61-9a9367fbe13f	30	urturt		germination.jpeg	j
40	08b7e85b-757a-4171-a05d-a5ed3f562bee	31	urturt45		lion copy.jpeg	j
1	5d32ab40-c98b-440f-afc2-3f9299b38678	1	45	<p>sdghd</p>	example.js	\N
2	722f44be-d218-48a5-852f-24dd5e8d78c1	2	54	<p>ncv</p>	secondExample.js	\N
3	9eb887ec-2d76-43e5-93c4-9fd52756b05e	3	585	<p>hgjklghjlh</p>	example.js	\N
4	09257810-5ee8-49a5-9bd1-3bc9471d8e8f	4	6588	<p>hfhfj</p>	thirdExample.js	\N
5	fe22de0b-1b7e-438e-a73f-d941beae6dd3	6	fdhdf	<p>fgjfgj</p>	secondExample.js	\N
6	f796dfeb-5c6d-48e4-b558-4cdb5637c2be	7	ztu65	<p>5474</p>	example.js	\N
7	8ef61f64-f9f1-41a2-9714-16bea4efd9cb	8	5475	<p>tutru</p>	example.js	\N
8	159cec07-1364-4834-b720-a6a707842b7d	9	trurtu	<p>tutrurt</p>	secondExample.js	\N
41	6dd43748-8a3a-4db0-b632-8ed18cef625e	32	87.79.97		baby elephant Small.png	ghk
9	4633f8d1-0ba6-4b94-b05d-91a103cf9f01	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
10	dac804cb-0e78-4f2d-8a68-7ccaaba4fd2c	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
42	5a3f0f6a-8419-4d90-ba06-f487f7906840	33	4.6.8		baby elephant.jpeg	d
15	35c390c2-97bf-4f66-981a-d237c3beee0f	11	23		bouquet.jpeg	\N
16	6006bf3e-f7ef-4fe8-8209-5a873ba55ef0	11	24		bouquet.jpeg	\N
17	a499bc5a-c875-4929-8acc-da1c44a09b1e	11	25		bouquet.jpeg	\N
19	7f246930-e1bd-4de7-b176-8d51631554bc	12	tjfg	<p>ghk</p>	flower.jpeg	\N
20	7ac8949a-2d3d-4e6a-b905-7add33ef6867	13	tjfg5555	<p>ghk</p>	lion copy.jpeg	\N
21	a4cb5847-b609-4aaa-b0bf-ce59f9675dfa	1	46		baby elephant Small.png	\N
22	bd246db6-9e44-47bc-ac99-cb2a3b46c5d6	14	34	<p>fdh</p>	bouquet.jpeg	\N
23	35a69354-c608-4ff5-8b3a-9a60eb5b256a	15	345	<p>sdfg</p>	bookshelves-q copy.jpeg	\N
24	9e8b6b14-b148-4b33-9784-43de457d047e	17	356	<p>ad</p>	germination.jpeg	nisha shukla
25	f835731b-41d0-430f-8bd9-5ff9b5c52730	18	456		baby elephant.jpeg	
26	d724447e-fc10-43e7-a92d-78fbe99969f9	19	87uz		lion copy.jpeg	
27	54c7f50c-1c9f-44af-97fd-06131f98f735	20	56		food.jpeg	
28	c3dfc9fe-346f-4a5b-85b2-b37ab34630bb	21	465745		indian thali.jpeg	
31	44f98918-2e0b-4b02-8810-825eaf623fe2	22	1.2.3	<p>f</p>	baby elephant.jpeg	nisha
32	1e5c8537-af77-40b7-af17-b06e80268bbe	23	1.2	<p>f</p>	germination.jpeg	nisha new
33	606e8be4-9b0d-4e04-b5d7-7a772ea2529f	24	1fdh67	<p>f</p>	baby elephant.jpeg	nisha new
34	11d85f50-1db4-4ef1-93bf-827715fd5c97	25	gg		flower.jpeg	
35	b2c6c3c7-d83b-43e3-aa36-876d3f311f5c	26	g	<p>hgj</p>	Golden_Temple copy.jpeg	
36	16771df5-5eb4-47ae-9534-6f02cd79311b	27	gddfgsd	<p>n</p>	germination.jpeg	
37	da88e736-e360-4c61-ab9f-b2fd3f6634e7	28	version		flower.jpeg	dgs
38	cbea70f5-9b54-424c-9de0-013a473186ae	29	uru	<p>dh</p>	baby elephant Small.png	
43	35256e4f-d4f5-4327-bda5-95b8fbcc0e5d	34	1.6.9		flower.jpeg	nisha
44	8ec7c4fe-994a-4595-a1db-3ce0bbf1bacc	35	1.0.0		germination.jpeg	nisha 
45	87e0a7bc-6f17-4184-99a3-03fde5aa4a0a	36	1.2.3		lion copy.jpeg	nisha
46	a7649dee-51e1-4fab-97f4-da935bb2a3ef	37	1.45.9		plant.jpeg	nisha
47	e3673fc2-6c55-47b1-b3e5-9f859c245c76	38	1.0.8	<p>rtu</p>	bouquet.jpeg	nish
48	1cb1d464-77ee-4ead-bef6-e2358107f995	39	1.2.3		flower.jpeg	rzez
49	fcd0b8ce-b203-4a72-9e38-beb529362890	40	4.0.9		bouquet (1).jpeg	df
50	f09ac878-4801-4087-b53a-62f5239e7fd9	41	2.8.9		bouquet (1).jpeg	nisha shukla
51	6c4d14a2-902d-4b74-8629-d447fca2b9ea	42	1.2.3-p		baby elephant Small (5).png	mjl
52	adc8d97b-f62a-47b6-9ed3-5550de9328a0	43	2.9.0		bouquet (1).jpeg	cxb
53	2f999549-1b93-4d0c-b918-ebef6a1985b9	44	1.2.3		baby elephant Small (5).png	dfhdf
54	1a8a2a4b-63df-4b55-8239-dddb7b62858f	45	1.2.0		filter-solid.svg	zt
55	2892a937-3f8a-45a2-8cee-261bb23946b5	46	2.8.9		flower.jpeg	gk
56	68cd430e-5c06-4cef-b47c-d131e9be0928	47	45.0.9		qubidoo.svg	b,
57	d29b43e4-6247-4345-bb97-7d250d35ccc0	48	1.2.3		bouquet (1).jpeg	ZO
58	3026e7b1-59bd-444c-a774-0ae1af7576c3	49	3.8.90		filter-solid.svg	ggk
59	4ccf1733-ce2b-47f0-a0b7-74fc978cdc7b	50	5.7.9		bouquet.jpeg	NISHA SHUKLA
60	3b4c2b05-47d8-4734-9504-7efb2f067952	51	1.8.0		germination.jpeg	nisha shukla
61	d2bcd3be-6908-466e-9cac-da242a691072	52	1.2.3		indian thali.jpeg	NISHA SHUKLA
62	ac92a1a5-afe0-47b0-b455-a063edcade43	53	1099.909.0		lion copy.jpeg	jghj
63	350a2329-042f-41c4-8591-63a7b59e8117	54	1.0.9		baby elephant Small.png	nisha
64	7a4640bf-be2b-4d12-b857-1ca9bbcc6328	55	1.2.30		flower.jpeg	ghdchj
65	c781ac4e-9c74-4f09-bd98-2407ec5d950b	56	2.9.0		Screenshot 2023-01-26 at 10.43.03.png	jg
66	c97f96c4-bda8-43f7-af39-e1e04716282a	57	1.7.9		Screenshot 2023-01-27 at 16.27.20.png	nisha
67	8c902190-f703-449f-8e12-f52f4de5d209	58	1.6.9		Screenshot 2023-01-27 at 09.39.32.png	rzrz
68	321f89bf-ec2a-471d-9000-794f50d42b6f	59	2.8.9		Screenshot 2023-01-18 at 10.15.05.png	zuztut
69	c1679046-6b3f-43ab-b234-368ab90b9b50	40	6.8.0	<p>urt</p>	germination.jpeg	rti
70	29aac947-1e53-4612-a957-1a6fd86ceaf6	39	4.6.6	<p>gdfh</p>	lion copy.jpeg	fd
71	40c0098f-609d-4337-882e-eb1e8c2a2e53	39	4.7.6	<p>gdfh</p>	puppy copy.jpeg	fd updated
72	036d3eb4-abb4-4811-b39c-c75b39c51771	60	2.9.0	<p>dsg</p>	lion copy.jpeg	dfg
73	70276bad-7cf1-4135-9dee-07fa31a64182	60	3.9.0	<p>updated</p>	germination.jpeg	updated
74	f3884f23-02bb-420b-93e3-f211043ad676	61	1.2.3	<p>ds</p>	indian thali.jpeg	rz
75	1a07baf5-26fd-49fb-9713-653fb938fb18	61	2.7.9	<p>wtrds</p>	germination.jpeg	updated
76	95d301ec-3ba9-4b71-b9d1-0fcfacec76a4	10	1.3.4	<p>fhdfh</p>	baby elephant Small.png	updated
77	d462a08b-7b83-4609-9cc6-390c41c5f3b5	62	1.2.22	<p>dsghdsh</p>	flower.jpeg	nisha
11	e607e351-7f7f-4c31-b189-e7e08ffcfaca	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
12	1d3237b8-c5db-464b-af6c-df13d2db0208	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
13	c94c6213-9021-47b1-91ce-103d9d785277	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
14	febefd97-8a0f-41a9-b737-d4b7fe8545ef	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
18	769f4c3d-149e-46bb-b88d-59b477c3cdaa	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
29	a025c87a-af52-4b33-a3d6-d1a80d83da63	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
30	4983a368-7aac-40d1-900c-472ba12c6b3e	10	2.67.9	<p>utzu</p>	tukanMitKrone.png	tu
78	ce27e700-9d50-4d5d-99ee-bd95a7fab5ab	62	3.3.3	<p>sdgsd</p>	bookshelves-q copy.jpeg	updated nisha
\.


--
-- Name: component component_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT component_pkey PRIMARY KEY (id);


--
-- Name: component_version component_version_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component_version
    ADD CONSTRAINT component_version_pkey PRIMARY KEY (id);


--
-- Name: component_version component_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component_version
    ADD CONSTRAINT component_id FOREIGN KEY (component_id) REFERENCES public.component(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

