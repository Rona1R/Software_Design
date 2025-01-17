USE [ECommerce_SoftwareDesignDatabase]
GO 

SET IDENTITY_INSERT [dbo].[Kategoria] ON 

INSERT [dbo].[Kategoria] ([Kategoria_ID], [EmriKategorise], [Pershkrimi], [CreatedAt]) VALUES (68, N'Accessories', N'pershkrimi i accessories', CAST(N'2024-07-20T02:07:05.9430822' AS DateTime2))
INSERT [dbo].[Kategoria] ([Kategoria_ID], [EmriKategorise], [Pershkrimi], [CreatedAt]) VALUES (72, N'Luggage & Travel ', N'Luggage and travel products ', CAST(N'2024-07-20T02:09:19.0641731' AS DateTime2))
INSERT [dbo].[Kategoria] ([Kategoria_ID], [EmriKategorise], [Pershkrimi], [CreatedAt]) VALUES (78, N'Electronics', N'Pershkrimi.......', CAST(N'2024-07-20T02:14:52.5675486' AS DateTime2))
INSERT [dbo].[Kategoria] ([Kategoria_ID], [EmriKategorise], [Pershkrimi], [CreatedAt]) VALUES (126, N'Clothes', N'test1Pershkrimi', CAST(N'2024-07-24T22:36:43.7442787' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Kategoria] OFF
GO
SET IDENTITY_INSERT [dbo].[NenKategoria] ON 

INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (2, N'Phones', 78, CAST(N'2024-07-20T22:59:00.3745209' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (3, N'Necklaces', 68, CAST(N'2024-07-20T22:59:31.7987390' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (4, N'Rings', 68, CAST(N'2024-07-20T23:42:29.5430928' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (7, N'Tablets', 78, CAST(N'2024-07-21T01:39:34.8900562' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (8, N'Headphones', 78, CAST(N'2024-07-21T01:40:17.4947317' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (30, N'Men''s Clothing', 126, CAST(N'2024-07-24T22:37:06.6866148' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (31, N'Women''s Clothing', 126, CAST(N'2024-07-24T22:44:59.9787356' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (38, N'Computers', 78, CAST(N'2024-07-25T00:47:43.8624732' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (43, N'Suitcases', 72, CAST(N'2024-07-25T14:46:07.8584063' AS DateTime2))
INSERT [dbo].[NenKategoria] ([NenKategoria_ID], [EmriNenkategorise], [Kategoria_ID], [CreatedAt]) VALUES (44, N'Carry On Bags', 72, CAST(N'2024-07-25T14:46:27.6929346' AS DateTime2))
SET IDENTITY_INSERT [dbo].[NenKategoria] OFF
GO
SET IDENTITY_INSERT [dbo].[Kompania] ON 

INSERT [dbo].[Kompania] ([Kompania_ID], [Kompania_Emri], [CreatedAt]) VALUES (1, N'Kompania A', CAST(N'2024-07-22T20:59:13.0232333' AS DateTime2))
INSERT [dbo].[Kompania] ([Kompania_ID], [Kompania_Emri], [CreatedAt]) VALUES (2, N'Kompania B', CAST(N'2024-07-22T20:59:22.4548707' AS DateTime2))
INSERT [dbo].[Kompania] ([Kompania_ID], [Kompania_Emri], [CreatedAt]) VALUES (3, N'Kompania C', CAST(N'2024-07-22T20:59:34.2436587' AS DateTime2))
INSERT [dbo].[Kompania] ([Kompania_ID], [Kompania_Emri], [CreatedAt]) VALUES (9, N'Kompania D', CAST(N'2024-07-24T23:04:33.4442038' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Kompania] OFF
GO
SET IDENTITY_INSERT [dbo].[Zbritja] ON 

INSERT [dbo].[Zbritja] ([Zbritja_ID], [ZbritjaEmri], [PerqindjaZbritjes], [DataKrijimit], [DataSkadimit]) VALUES (2, N'Zbritje Aksion', 50, CAST(N'2024-07-30T18:46:50.0655499' AS DateTime2), CAST(N'2024-10-11T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[Zbritja] ([Zbritja_ID], [ZbritjaEmri], [PerqindjaZbritjes], [DataKrijimit], [DataSkadimit]) VALUES (6, N'Zbritja Sezonale Verore', 10, CAST(N'2024-08-01T17:00:54.8117459' AS DateTime2), CAST(N'2024-10-11T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[Zbritja] ([Zbritja_ID], [ZbritjaEmri], [PerqindjaZbritjes], [DataKrijimit], [DataSkadimit]) VALUES (11, N'Back To School', 45, CAST(N'2024-08-09T23:04:23.7724535' AS DateTime2), CAST(N'2024-10-04T12:00:00.0000000' AS DateTime2))
INSERT [dbo].[Zbritja] ([Zbritja_ID], [ZbritjaEmri], [PerqindjaZbritjes], [DataKrijimit], [DataSkadimit]) VALUES (12, N'Test2', 10, CAST(N'2024-08-09T23:06:07.2514781' AS DateTime2), CAST(N'2024-10-04T12:00:00.0000000' AS DateTime2))
INSERT [dbo].[Zbritja] ([Zbritja_ID], [ZbritjaEmri], [PerqindjaZbritjes], [DataKrijimit], [DataSkadimit]) VALUES (13, N'Test3', 25, CAST(N'2024-08-09T23:09:33.0023785' AS DateTime2), CAST(N'2024-10-12T12:00:35.0000000' AS DateTime2))
INSERT [dbo].[Zbritja] ([Zbritja_ID], [ZbritjaEmri], [PerqindjaZbritjes], [DataKrijimit], [DataSkadimit]) VALUES (16, N'Test4', 50, CAST(N'2024-08-09T23:34:44.1094992' AS DateTime2), CAST(N'2024-10-13T00:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Zbritja] OFF
GO
SET IDENTITY_INSERT [dbo].[Produkti] ON 

INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (11, N'IPhone 15', N'iphone15Black.jpg', N'Pershkrimi i produktit', 7, CAST(900.99 AS Decimal(18, 2)), 2, 78, 2, 1, CAST(N'2024-07-24T23:05:46.1181858' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (12, N'Macbook', N'mac.jpg', N'Pershkrimi i produktit Macbook', 23, CAST(1200.99 AS Decimal(18, 2)), 1, 78, 38, 1, CAST(N'2024-07-24T23:06:18.4775777' AS DateTime2), CAST(N'2024-09-14T03:13:55.4378749' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (13, N'IPad', N'tablet.jpeg', N'Pershkrimi i produktit IPad', 11, CAST(1000.00 AS Decimal(18, 2)), 3, 78, 7, 1, CAST(N'2024-07-24T23:07:16.0795020' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (14, N'Gold Necklace', N'placeholder-image.jpg', N'Gold Necklace pershkrimi', 1, CAST(500.00 AS Decimal(18, 2)), 1, 68, 3, 1, CAST(N'2024-07-24T23:08:10.5747736' AS DateTime2), CAST(N'2024-09-14T03:13:35.3408526' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (22, N'JBL Tune 660NC', N'JBL660.jpeg', N'The Tune 660NC wireless headphones feature renowned JBL Pure Bass sound, which can be found in the most famous venues all around the world. Keep the noise out and enjoy your music with active noise cancellation With Wireless Bluetooth 5.0 Streaming, you can stream wirelessly from your device and even switch between two devices so that you don''t miss a call.', 1, CAST(120.00 AS Decimal(18, 2)), 2, 78, 8, 1, CAST(N'2024-07-25T14:49:45.4029764' AS DateTime2), CAST(N'2024-07-30T16:52:22.5119392' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (23, N'Gaming Headset ', N'GamingHeadset.jpeg', N'Gaming Headset with 7 Color LED Backlight 3.5mm Stereo Over-Ear Headphones with Mic Description: 7 kinds of circular breathing lamp effect 40mm super-shock large unit is adopted Hidden ear-mic design, refuse to be bound Retractable and adjustable head beam function Ultra high cost performance game exclusive earphone 3.5mm jack is for Audio input, and USB port is for LED Wired 7 Color Backlit Stereo Gaming Headset is connected by two 3.5mm and one USB interface. It adopts top 40mm speakers, self-adjusting elastic headband, hidden microphone, big earbuds, 2.2m cord will bring you better audio experience in game, wort and music', 4, CAST(20.99 AS Decimal(18, 2)), 3, 78, 8, 1, CAST(N'2024-07-25T15:17:54.2777859' AS DateTime2), CAST(N'2024-07-30T16:50:00.3734699' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (24, N'Silver Ring', N'placeholder-image.jpg', N'Silver Ring with Green emerald stone', 3, CAST(50.99 AS Decimal(18, 2)), 9, 68, 4, 1, CAST(N'2024-07-25T15:20:01.2811432' AS DateTime2), CAST(N'2024-09-14T03:13:42.0553423' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (25, N'Beige Suitcase', N'Suitcase.jpg', N'Large beige suitcase , perfect for Traveling', 7, CAST(200.99 AS Decimal(18, 2)), 3, 72, 43, 1, CAST(N'2024-07-25T15:22:34.9090136' AS DateTime2), CAST(N'2024-09-14T03:13:26.4131376' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (26, N'Carry On Bag', N'placeholder-image.jpg', N'Carry on bag for traveling ', 0, CAST(20.00 AS Decimal(18, 2)), 2, 72, 44, 1, CAST(N'2024-07-25T15:23:33.7303989' AS DateTime2), CAST(N'2024-08-21T20:13:37.1672842' AS DateTime2), 13)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (27, N'Black Suitcase', N'black_suitcase.webp', N'Carry on bag for traveling ', 5, CAST(160.00 AS Decimal(18, 2)), 2, 72, 43, 1, CAST(N'2024-07-25T18:37:15.3384295' AS DateTime2), CAST(N'2024-07-30T16:43:32.2271980' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (28, N'Cardigan', N'cardigan.jpeg', N'Folklore Cardigan ', 0, CAST(20.18 AS Decimal(18, 2)), 3, 126, 31, 1, CAST(N'2024-07-25T21:26:27.8414497' AS DateTime2), CAST(N'2024-08-21T20:12:39.4455755' AS DateTime2), 16)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (29, N'Suits', N'placeholder-image.jpg', N'Suits pershkrimi', 0, CAST(100.99 AS Decimal(18, 2)), 1, 126, 30, 1, CAST(N'2024-07-25T21:27:07.7545702' AS DateTime2), CAST(N'2024-09-14T03:13:50.0997976' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (30, N'Lenovo ideapad S340', N'lenovo.webp', N'15.6" Laptop, Intel Core i5-8265U Quad-Core Processor, 1TB Solid State Drive, Windows 10 - Dark Orchid - 81N800SLUS', 1, CAST(660.00 AS Decimal(18, 2)), 9, 78, 38, 1, CAST(N'2024-07-25T21:30:18.8544847' AS DateTime2), CAST(N'2024-08-21T20:13:30.7821781' AS DateTime2), 2)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (31, N'test', N'placeholder-image.jpg', N'test pershkrimi i produktit', 2, CAST(10.00 AS Decimal(18, 2)), 9, 78, 7, 1, CAST(N'2024-07-26T02:26:44.6555927' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (32, N'test2', N'placeholder-image.jpg', N'test', 3, CAST(120.00 AS Decimal(18, 2)), 3, 78, 2, 1, CAST(N'2024-07-26T02:26:58.5116939' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (33, N'test3', N'placeholder-image.jpg', N'test', 4, CAST(50.65 AS Decimal(18, 2)), 2, 78, 7, 1, CAST(N'2024-07-26T02:27:11.7624907' AS DateTime2), CAST(N'2024-08-21T20:13:45.1114787' AS DateTime2), 16)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (34, N'testest', N'placeholder-image.jpg', N'pershkrim test', 3, CAST(20.77 AS Decimal(18, 2)), 3, 72, 44, 1, CAST(N'2024-07-26T02:34:07.5986672' AS DateTime2), CAST(N'2024-09-02T14:01:23.8442472' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (35, N'Beats Headphones', N'BeatsHeadphones.jpeg', N'mmmmmmmm', 0, CAST(20.92 AS Decimal(18, 2)), 2, 78, 8, 1, CAST(N'2024-07-26T17:52:51.3486515' AS DateTime2), CAST(N'2024-08-03T20:26:28.3285819' AS DateTime2), 6)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (42, N'Lenovo Tablet', N'lenovoTablet.jpg', N'Your family tablet: A tablet that suits all your family’s needs with dedicated user profiles, parental controls and a Kids Mode for your peace of mind', 12, CAST(500.99 AS Decimal(18, 2)), 9, 78, 7, 1, CAST(N'2024-09-16T18:42:54.5574555' AS DateTime2), CAST(N'2024-09-30T22:01:39.2329153' AS DateTime2), 16)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (43, N'Wireless Keyboard', N'desktop_keyboard.jpeg', N'This wireless keyboard mouse combo has a comfortable touch and typing feel, this wireless keyboard design with palm rest and folding holder that can protect your wrists from injury even when typing for a long time. Note: The USB receiver is in the battery compartment of the keyboard, you can find it when open the keyboard battery cover.Full-Sized 2.4GHz Wireless Keyboard with Comfortable Palm Rest and Optical Wireless Mouse for Windows, Mac OS PC/Desktops/Computer/Laptops (Black)', 2, CAST(40.99 AS Decimal(18, 2)), 9, 78, 38, 1, CAST(N'2024-09-16T18:48:33.5068531' AS DateTime2), CAST(N'2024-09-30T22:31:29.1876614' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (44, N'Android Gaming Phone', N'gaming_phone.jpg', N'The device has built-in capacitive shoulder buttons which can be custom-mapped by the user and features a hardware switch for enabling the Red Magic Game Space, i.e. a customized gaming-oriented dashboard where users can quick-launch Android games. The dashboard also promises to improve gaming performance through a “high-performance mode” and by automatically minimizing background applications', 3, CAST(200.00 AS Decimal(18, 2)), 2, 78, 2, 1, CAST(N'2024-09-16T18:59:46.6262153' AS DateTime2), CAST(N'2024-09-16T19:00:44.1670242' AS DateTime2), 13)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (45, N'2019 Apple MacBook Pro', N'macbook_pro_2019.jpg', N'Ninth-generation 6-Core Intel Core i7 Processor, Stunning 16-inch Retina Display with True Tone technology .Touch Bar and Touch ID Amd Radeon Pro 5300M Graphics with GDDR6 memory .Ultrafast SSD.Color: Silver ,Hard Disk Size:512 GB. CPU Model: Core i7 ,Ram Memory Installed : Size 16 GB', 10, CAST(1100.99 AS Decimal(18, 2)), 1, 78, 38, 1, CAST(N'2024-09-16T19:25:47.2002067' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (49, N'AnotherTest', N'tablet_img.jpg', N'Your family tablet: A tablet that suits all your family’s needs with dedicated user profiles, parental controls and a Kids Mode for your peace of mind dddddddddddddd ddddddddddd dddddddddddddd ddddddddddd dddddddd', 2, CAST(10.99 AS Decimal(18, 2)), 9, 78, 7, 1, CAST(N'2024-09-16T22:09:04.6207387' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Produkti] ([Produkti_ID], [EmriProdukti], [FotoProduktit], [PershkrimiProduktit], [SasiaNeStok], [CmimiPerCope], [Kompania_ID], [Kategoria_ID], [NenKategoria_ID], [NeShitje], [CreatedAt], [DataVendsojesNeZbritje], [Zbritja_ID]) VALUES (51, N'TestingForCartt', N'placeholder-image.jpg', N'aaaaaaaaa', 1, CAST(30.00 AS Decimal(18, 2)), 3, 78, 38, 1, CAST(N'2024-09-30T01:41:21.8123450' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), NULL)
SET IDENTITY_INSERT [dbo].[Produkti] OFF
GO

SET IDENTITY_INSERT [dbo].[Atributi] ON 

INSERT [dbo].[Atributi] ([Id], [Name], [DataType]) VALUES (2, N'CPU Model', N'text')
INSERT [dbo].[Atributi] ([Id], [Name], [DataType]) VALUES (3, N'Cache Size', N'number')
INSERT [dbo].[Atributi] ([Id], [Name], [DataType]) VALUES (4, N'Memory Storage Capacity', N'option-list')
INSERT [dbo].[Atributi] ([Id], [Name], [DataType]) VALUES (5, N'Graphics Card Description', N'text')
INSERT [dbo].[Atributi] ([Id], [Name], [DataType]) VALUES (6, N'Additional Features', N'text')
INSERT [dbo].[Atributi] ([Id], [Name], [DataType]) VALUES (10, N'Operating System', N'option-list')
INSERT [dbo].[Atributi] ([Id], [Name], [DataType]) VALUES (14, N'Size', N'option-list')
INSERT [dbo].[Atributi] ([Id], [Name], [DataType]) VALUES (16, N'Color', N'text')
SET IDENTITY_INSERT [dbo].[Atributi] OFF
GO
SET IDENTITY_INSERT [dbo].[ProduktiAtributi] ON 

INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (2, N'Touchscreen', 45, 6)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (3, N'512 GB', 45, 4)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (4, N'Integrated', 45, 5)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (6, N'Mac OS', 45, 10)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (7, N'4', 49, 3)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (8, N'512 GB', 49, 4)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (9, N'Functional Touchscreen, 2 years insurance', 49, 6)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (10, N'Windows', 49, 10)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (11, N'Integrated', 49, 5)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (13, N'Windows', 30, 10)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (14, N'4', 30, 3)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (15, N'Integrated', 30, 5)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (16, N'1 TB', 30, 4)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (17, N'S', 28, 14)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (18, N'Beige', 28, 16)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (19, N'Limited Edition Taylor Swift Merch', 28, 6)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (22, N'Integrated', 51, 5)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (23, N'Windows', 51, 10)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (24, N'1 TB', 51, 4)
INSERT [dbo].[ProduktiAtributi] ([Id], [AtributiValue], [ProduktiId], [AtributiId]) VALUES (25, N'1 year Insurance', 51, 6)
SET IDENTITY_INSERT [dbo].[ProduktiAtributi] OFF
GO
SET IDENTITY_INSERT [dbo].[AchievementBadge] ON 

INSERT [dbo].[AchievementBadge] ([Badge_Id], [Badge_Name], [CreatedAt]) VALUES (6, N'New User', CAST(N'2024-07-30T21:40:06.2958265' AS DateTime2))
INSERT [dbo].[AchievementBadge] ([Badge_Id], [Badge_Name], [CreatedAt]) VALUES (7, N'Active Contributor', CAST(N'2024-08-15T17:58:49.8930211' AS DateTime2))
INSERT [dbo].[AchievementBadge] ([Badge_Id], [Badge_Name], [CreatedAt]) VALUES (8, N'Best Costumer', CAST(N'2024-08-20T19:02:36.0353012' AS DateTime2))
INSERT [dbo].[AchievementBadge] ([Badge_Id], [Badge_Name], [CreatedAt]) VALUES (9, N'Verified Buyer', CAST(N'2024-08-20T19:06:30.2866134' AS DateTime2))
SET IDENTITY_INSERT [dbo].[AchievementBadge] OFF
GO
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'3f05ad53-4040-498f-aa5e-4141de8f2755', N'laliHyseni', N'LALIHYSENI', N'laliHyseni@gmail.com', N'LALIHYSENI@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEGnhNOuqFoxMYa/Q1NDsoVfWYgBQQorTZlrebvfNyx1MfRXVfOVLyRLAZ/3MwU7ECw==', N'5TRJI3OZ7GUGJKECX2WVJCYXAU3CQ2OT', N'b1ea5a70-cdf8-47c8-a243-c4aeb7b9f3e1', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'5d9c4dee-4001-483f-bc62-5188d897b125', N'JonaJahaj', N'JONAJAHAJ', N'jonajahaj@gmail.com', N'JONAJAHAJ@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEKSthde1OA6a+mYAGfY8qkZyFwRWl4OTotn8cZaRLT0Cmgczvz1SE0X2xoMfLsnTwA==', N'7ZRT4Q5ZHELCXMP7IFFVXZT74F2XGVLC', N'c845d014-11d8-48e3-bc67-847b3a4dd1a9', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'63ea9dc4-61f4-4319-8115-10a4ec984b4c', N'LisJahajj', N'LISJAHAJJ', N'lisjahaj@gmail.com', N'LISJAHAJ@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEK0lWeel3jYuLdtJF55SE8vqjL7Glkntym5Wzj+jSDUJU1kC+jhok0X7M0fcc1woZw==', N'4IOZEWH7NBW2GGH3VYLS7JB2G3K6QFYF', N'62e1517e-fd73-4f64-a919-c1af1e4290c5', N'38344555555', 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'b6f94208-166d-4e43-96a9-39d91b9dfdaf', N'RifatHyseni', N'RIFATHYSENI', N'rifathyseni@gmail.com', N'RIFATHYSENI@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEBFo8ceHMfGL6uVZY3Vdep3thF2oBBa25dORqV96YkEBlK9hp/BumPdxiQtOdYCZvw==', N'Q3DEL2RD45PGZHUBTUP6OIASRG76REGU', N'2dc1daab-5c24-46d4-9458-9f7671e22cef', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'bf592811-5047-41bd-b6e5-49a8cf1c9ac4', N'BlertaGerxhaliu', N'BLERTAGERXHALIU', N'blertaGerxhaliu@gmail.com', N'BLERTAGERXHALIU@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAECcU07EJZ2oDlG4ir2PEsGEEj8YXSI6iHvK9f6TS4LqiguL0q69u9kDI7599T17ubw==', N'UFTLHIKZE2BU6IKO3LYJ75Z4RXL62GX5', N'04f6eab6-03b7-437b-9d99-8b8c307678de', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'c0654b0f-b4e8-4dd7-a6f7-fea43640e3ea', N'FatimeRushiti', N'FATIMERUSHITI', N'fatime2006@gmail.com', N'FATIME2006@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEH0aaIt/rfyI5QJWAI9KUBnXIh1GLJ4CtzSV7Cd0O8sT3PZY0B5tN3RjPCNeySZ98w==', N'LBEPNAU4BKIBBF64XBCFEWCRGQXXN3JU', N'261c6ce3-9ef7-4bec-bc7c-2faefca5ece5', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'c205696e-f77c-4a7d-a76f-773d84d19888', N'ArtRushiti', N'ARTRUSHITI', N'rushitiart@gmail.com', N'RUSHITIART@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAENb9mMUYl59kvaOD44JcQb2MOHWlWwhGO9INd4e2Hep/vQu1ZQGQUvVG9iBHPE67nw==', N'VKIKKO66IA6UKA6HS2IBHZC2VT7SLLMN', N'9849fd59-4f3a-416a-8827-81267b397c35', N'38344777777', 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'd9be41d1-6915-4e6b-b347-7af1734dd6f7', N'RinaRushiti', N'RINARUSHITI', N'rushitirina@gmail.com', N'RUSHITIRINA@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEIExI0rV5jHVkLb9/ZG8JuWM3DT+vuxZmy2VFKnx6m40mBi2O4LNrpfBecEcdkxrhQ==', N'EAGGWRJQZKT2ONGKF3HMHBB6Z4LND77F', N'4136b5b7-9ec5-4517-8163-216a7514e7e2', N'38344864680', 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'f6046788-dc7c-4ec3-926c-61e0a80c9053', N'FatmirRushiti', N'FATMIRRUSHITI', N'fatmiri2006@gmail.com', N'FATMIRI2006@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEAFKvkx/eZcC9yQjiTv9J92LwaGgaMmODZGGLEE8YtZ1Dd0pZ2Q/3ikPFCZL+TfA1w==', N'QYQMHVOUB32VFBCYDNC4EYP7F6ESNB73', N'a49acb79-fa6b-497c-b03b-c37549d46703', N'38344177188', 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'f97f67bb-5363-425d-9e9a-6e8e8f4b9388', N'RonaRushiti', N'RONARUSHITI', N'rushitirona@gmail.com', N'RUSHITIRONA@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEJKM0CZiARvM/OzQuMIV13b+zmnl8om7bLpGeMv8yo7Rd4jjU8BRMHlYYyujDJ44YA==', N'IM76IHYGSCSUNVNUSUA3YMB3SJ5VHIHW', N'bb6a562f-a829-45f0-895b-25fadb48c839', N'38344864660', 0, 0, NULL, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1016, N'f97f67bb-5363-425d-9e9a-6e8e8f4b9388', N'ProfilePic.jpg', CAST(N'2024-07-30T21:40:46.4201574' AS DateTime2), 7, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1017, N'd9be41d1-6915-4e6b-b347-7af1734dd6f7', N'defaultProfilePic.png', CAST(N'2024-07-30T22:38:45.0425654' AS DateTime2), 8, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1018, N'c205696e-f77c-4a7d-a76f-773d84d19888', N'defaultProfilePic.png', CAST(N'2024-07-30T23:42:47.8562224' AS DateTime2), 9, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1019, N'f6046788-dc7c-4ec3-926c-61e0a80c9053', N'defaultProfilePic.png', CAST(N'2024-07-31T22:52:37.8137488' AS DateTime2), 6, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1020, N'c0654b0f-b4e8-4dd7-a6f7-fea43640e3ea', N'defaultProfilePic.png', CAST(N'2024-07-31T22:54:45.1172332' AS DateTime2), 7, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1021, N'b6f94208-166d-4e43-96a9-39d91b9dfdaf', N'defaultProfilePic.png', CAST(N'2024-07-31T22:56:27.8034425' AS DateTime2), 6, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1022, N'5d9c4dee-4001-483f-bc62-5188d897b125', N'defaultProfilePic.png', CAST(N'2024-07-31T23:43:35.5034413' AS DateTime2), 6, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1023, N'bf592811-5047-41bd-b6e5-49a8cf1c9ac4', N'defaultProfilePic.png', CAST(N'2024-08-14T23:09:37.4895221' AS DateTime2), 6, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1024, N'63ea9dc4-61f4-4319-8115-10a4ec984b4c', N'defaultProfilePic.png', CAST(N'2024-08-21T19:07:50.4973959' AS DateTime2), 6, NULL)
INSERT [dbo].[User] ([User_Id], [AspNetUserId], [ProfilePic], [CreatedAt], [Badge_Id], [RefreshToken]) VALUES (1025, N'3f05ad53-4040-498f-aa5e-4141de8f2755', N'defaultProfilePic.png', CAST(N'2024-09-01T16:51:44.6275147' AS DateTime2), 6, NULL)
SET IDENTITY_INSERT [dbo].[User] OFF
GO
SET IDENTITY_INSERT [dbo].[Review] ON 

INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (3, 5, N'Ky produkt ishte shume i mire dhe ja ka vlejtur per kete cmim!
Definitivisht do bleja nga ketu perseri si dhe do ia u rekomandoj te tjerve !!', CAST(N'2022-07-30T22:52:29.8715483' AS DateTime2), 1, 35, 1017)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (4, 3, N'Ky produkt ishte shume i mire', CAST(N'2024-07-30T23:43:27.5338619' AS DateTime2), 1, 35, 1018)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (6, 3, N'Ngjyra ndryshonte nga ajo qe eshte treguar ne fotografi,perndryshe me pelqeu', CAST(N'2024-07-31T00:01:37.1918716' AS DateTime2), 0, 28, 1018)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (7, 2, N'Produkti ishte i demtuar kur me erdhi porosia', CAST(N'2024-07-31T22:54:05.3207080' AS DateTime2), 0, 35, 1019)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (8, 4, N'Jam shume e kenaqur me porosine.Do e rekomandoja qe ta bleni', CAST(N'2024-07-31T22:55:44.0726002' AS DateTime2), 1, 35, 1020)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (9, 1, N'Porosia nuk kishte arritur ne kohe. Poashtu ishte i demtuar dhe dukej qe ishte i perdorur. Nuk me duket aspak ne rregull qe eshte vendosur ne shitje pa u  kontrolluar paraprakisht nga stafi pergjegjes', CAST(N'2024-07-31T22:58:17.3352533' AS DateTime2), 1, 35, 1021)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (11, 4, N'Kualiteti i ketyre Gaming headphones ishte shume i mire. E vetmja gje qe me pengoi ishte qe nuk ishin shume te rahatshme per tu mbajtur per kohe me te gjate', CAST(N'2024-08-01T02:33:23.4722419' AS DateTime2), 0, 23, 1022)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (12, 5, N'Kualiteti shume i mire ', CAST(N'2024-08-01T02:41:22.9589063' AS DateTime2), 0, 22, 1022)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (13, 3, N'Ishte e pershtatshme per udhetime te gjate , megjithate kisha pasur deshire qe materiali te ishte me i mire , sidomos duke konsideruar sa shume ka kushtuar', CAST(N'2024-08-01T02:43:39.0125360' AS DateTime2), 0, 26, 1022)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (15, 2, N'meh !!!', CAST(N'2024-08-01T02:46:21.9102421' AS DateTime2), 1, 30, 1022)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (16, 1, N'Ishte i demtuar dhe bateria nuk qendron me shume se gjysme ore . Poashtu punonte shume ngadale dhe dukej qe ishte i perdorur', CAST(N'2024-08-01T02:48:29.5774206' AS DateTime2), 1, 30, 1021)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (17, 4, N'Shume te mira per cmimin qe e kan', CAST(N'2024-08-01T13:48:45.8438899' AS DateTime2), 1, 22, 1021)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (19, 3, N'Test Review', CAST(N'2024-08-02T01:44:46.7438868' AS DateTime2), 0, 12, 1021)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (20, 4, N'test review', CAST(N'2024-08-02T01:46:27.9962605' AS DateTime2), 0, 13, 1021)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (21, 4, N'test koment i edituar !!!!!!!!!!!!!!!!!!!!', CAST(N'2024-08-02T01:47:42.5574644' AS DateTime2), 1, 33, 1022)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (34, 2, N'New Comment', CAST(N'2024-08-02T15:39:23.5082328' AS DateTime2), 1, 31, 1022)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (35, 4, N'First Review Edited !', CAST(N'2024-08-03T13:10:21.7287588' AS DateTime2), 1, 24, 1022)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (40, 3, N'loved this one !!', CAST(N'2024-08-03T16:10:59.3749285' AS DateTime2), 1, 31, 1021)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (41, 5, N'Loved these headphones !
', CAST(N'2024-08-03T16:15:12.3178623' AS DateTime2), 1, 23, 1021)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (42, 5, N'Loved this suitcase', CAST(N'2024-08-03T17:38:40.3451792' AS DateTime2), 1, 25, 1021)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (44, 5, N'Kualiteti ishte shume i mire !', CAST(N'2024-08-08T21:28:16.6661066' AS DateTime2), 1, 28, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (48, 2, N'Nuk mka pelqy  shume !', CAST(N'2024-08-14T22:57:08.8552040' AS DateTime2), 1, 13, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (49, 4, N'loved this !!', CAST(N'2024-08-18T01:27:42.2538410' AS DateTime2), 1, 23, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (50, 2, N'mehh ! kom pa ma mire ', CAST(N'2024-08-18T01:36:36.7806017' AS DateTime2), 1, 27, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (52, 5, N'Excellent !!', CAST(N'2024-08-21T21:14:44.0710158' AS DateTime2), 1, 31, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (53, 4, N'Nuk me pelqeu aq!', CAST(N'2024-08-23T13:40:22.0040850' AS DateTime2), 1, 30, 1024)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (57, 5, N'Test comment i edituar', CAST(N'2024-09-19T18:41:00.7386621' AS DateTime2), 1, 12, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (58, 4, N'Me ka pelqeyer shume !', CAST(N'2024-09-26T15:58:26.8355172' AS DateTime2), 1, 14, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (60, 5, N'Porosia erdhi shume shpejt dhe dukej ashtu siq e kam pritur. Ne pergjithsi duket qe eshte mire dhe duke marr parasysh qe ishte ne zbritje ja vlejti shume qe ta provoja. Sigurisht qe do te ja u rekomandoja edhe te tjerve qe ta blinin !', CAST(N'2024-09-27T12:18:55.4440945' AS DateTime2), 0, 35, 1023)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (61, 3, N'Ishte ok ', CAST(N'2024-09-27T12:22:48.2214736' AS DateTime2), 0, 35, 1024)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (62, 4, N'Test review comment', CAST(N'2024-09-27T22:33:38.9613809' AS DateTime2), 0, 49, 1024)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (63, 4, N'ka qene ne rregull', CAST(N'2024-09-30T23:45:02.7469837' AS DateTime2), 1, 29, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (64, 5, N'I really liked this product !! Ishte cmimi shume i pershtatshem dhe ne raport me pritshmerite e mija. Edhe pse fillimisht kisha dyshime pasi qe nuk kisha porositur nga ketu ndonjehere.Gjithsesi jam e kenaqur me kete blerje dhe do ia rekomdandoja edhe te tjerve !!', CAST(N'2024-10-10T18:22:06.0310962' AS DateTime2), 0, 35, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (66, 4, N'Funksionte mire, vetem qe bateria nuk qendron me shume se 1 or e gjysme ? Nuk kam ndonje vrejtje tjeter ', CAST(N'2024-10-10T18:25:50.9498871' AS DateTime2), 1, 30, 1016)
INSERT [dbo].[Review] ([Review_ID], [Rating], [ReviewContent], [CreatedAt], [IsEdited], [Produkti_ID], [User_Id]) VALUES (68, 4, N'Leaving a test review', CAST(N'2024-10-10T18:28:16.3785906' AS DateTime2), 0, 51, 1016)
SET IDENTITY_INSERT [dbo].[Review] OFF
GO
SET IDENTITY_INSERT [dbo].[Wishlist] ON 

INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (3, 1016)
INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (4, 1017)
INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (7, 1018)
INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (5, 1019)
INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (2, 1021)
INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (1, 1022)
INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (9, 1023)
INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (6, 1024)
INSERT [dbo].[Wishlist] ([WishlistId], [IdKlienti]) VALUES (8, 1025)
SET IDENTITY_INSERT [dbo].[Wishlist] OFF
GO
SET IDENTITY_INSERT [dbo].[WishlistItem] ON 

INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (17, 1, 23)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (29, 2, 14)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (30, 1, 35)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (31, 1, 27)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (41, 4, 28)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (42, 4, 14)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (44, 4, 29)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (47, 3, 29)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (50, 3, 25)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (51, 6, 22)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (54, 7, 26)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (55, 8, 23)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (58, 3, 30)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (60, 4, 30)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (61, 9, 35)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (63, 3, 44)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (65, 3, 28)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (68, 6, 26)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (69, 3, 43)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (74, 3, 35)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (75, 5, 29)
INSERT [dbo].[WishlistItem] ([WishlistItemId], [WishlistId], [Produkti_ID]) VALUES (76, 5, 28)
SET IDENTITY_INSERT [dbo].[WishlistItem] OFF
GO
SET IDENTITY_INSERT [dbo].[Porosia] ON 

INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (25, N'Pranuar nga Klienti', 1, CAST(50.42 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-07-09T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (26, N'Anuluar', 2, CAST(1585.09 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-07-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (27, N'Nen Procesim', 1, CAST(991.09 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-07-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (28, N'Nen Procesim', 1, CAST(991.09 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-06-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (29, N'Nen Procesim', 1, CAST(15.40 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-05-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (30, N'Nen Procesim', 1, CAST(26.40 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-05-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (31, N'Nen Procesim', 1, CAST(442.18 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2023-12-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (32, N'Nen Procesim', 1, CAST(112.18 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2023-12-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (34, N'Nen Procesim', 1, CAST(26.60 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2023-11-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (35, N'Nen Procesim', 1, CAST(73.44 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-04-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (36, N'Nen Procesim', 2, CAST(2005.27 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-04-08T22:58:07.7927797' AS DateTime2), 1022, N'049-176-188', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (37, N'Rruges Per Dorezim', 1, CAST(2973.27 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-03-08T22:58:07.7927797' AS DateTime2), 1022, N'044-176-160', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (38, N'Nen Procesim', 1, CAST(112.18 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-02-08T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (39, N'Nen Procesim', 2, CAST(95.63 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-01-15T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (40, N'Nen Procesim', 1, CAST(176.00 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-01-15T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (41, N'Nen Procesim', 2, CAST(409.02 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-08-13T02:40:08.1607965' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (42, N'Rruges Per Dorezim', 1, CAST(111.43 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-08-13T02:51:02.2487831' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (44, N'Nen Procesim', 3, CAST(212.50 AS Decimal(18, 2)), N'31 Random Street ', N'Kosova', N'Vushtrri', N'42000', CAST(N'2024-08-13T23:10:35.3286947' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (45, N'Rruges Per Dorezim', 2, CAST(104.88 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-08-14T22:58:07.7927797' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (46, N'Nen Procesim', 1, CAST(27.49 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-08-14T18:25:26.4251357' AS DateTime2), 1016, N'044-864-660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (47, N'Nen Procesim', 1, CAST(132.00 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-08-14T20:15:35.6636446' AS DateTime2), 1016, N'38344862660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (48, N'Nen Procesim', 2, CAST(50.26 AS Decimal(18, 2)), N'33 MadeUp Street', N'AL', N'Tirana', N'1001', CAST(N'2024-08-14T22:32:57.4316627' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (49, N'Pranuar nga Klienti', 1, CAST(1100.00 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-08-14T22:55:40.5842127' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (50, N'Nen Procesim', 1, CAST(442.18 AS Decimal(18, 2)), N'31 Random Street ', N'Kosova', N'Vushtrri', N'42000', CAST(N'2024-08-15T16:46:32.5698445' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (51, N'Nen Procesim', 2, CAST(374.85 AS Decimal(18, 2)), N'31 Random Street ', N'Kosova', N'Vushtrri', N'42000', CAST(N'2024-08-18T23:50:03.3452959' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (52, N'Derguar', 2, CAST(770.40 AS Decimal(18, 2)), N'37 Example Street', N'Kosova', N'Pristina', N'10000', CAST(N'2024-08-18T23:58:21.4200913' AS DateTime2), 1017, N'38344864680', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (53, N'Rruges Per Dorezim', 2, CAST(1232.00 AS Decimal(18, 2)), N'37 Example Street', N'Kosova', N'Pristina', N'10000', CAST(N'2024-08-19T00:12:11.9300527' AS DateTime2), 1017, N'38344864680', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (54, N'Nen Procesim', 2, CAST(385.20 AS Decimal(18, 2)), N'33 Cornelia Street', N'AT', N'Altmünster', N'4813', CAST(N'2024-08-21T21:29:00.1481043' AS DateTime2), 1024, N'43111444787', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (55, N'Nen Procesim', 1, CAST(15.50 AS Decimal(18, 2)), N'33 Cornelia Street', N'GB', N'Abbots Bromley', N'4177', CAST(N'2024-08-23T06:21:55.0726165' AS DateTime2), 1018, N'383441781999', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (56, N'Pranuar nga Klienti', 5, CAST(838.08 AS Decimal(18, 2)), N'31 Random Street ', N'Kosova', N'Vushtrri', N'42000', CAST(N'2024-08-23T07:08:12.2517606' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (57, N'Rruges Per Dorezim', 1, CAST(20.90 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-01T17:57:31.4536374' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (58, N'Nen Procesim', 2, CAST(116.79 AS Decimal(18, 2)), N'30 Rruga Shembull', N'Kosova', N'Pejë', N'30000', CAST(N'2024-09-02T01:18:35.4923630' AS DateTime2), 1025, N'38344555178', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (59, N'Nen Procesim', 2, CAST(1871.09 AS Decimal(18, 2)), N'31 Random Street ', N'Kosova', N'Vushtrri', N'42000', CAST(N'2024-09-02T15:15:01.8588083' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (60, N'Rruges Per Dorezim', 1, CAST(45.82 AS Decimal(18, 2)), N'31 Random Street ', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-02T16:01:50.1243732' AS DateTime2), 1018, N'38344177177', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (61, N'Nen Procesim', 2, CAST(474.09 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-02T19:44:04.7803041' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (62, N'Nen Procesim', 2, CAST(231.72 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-11T16:29:15.7522058' AS DateTime2), 1016, N'38344864660', N'Pas Pranimit')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (63, N'Nen Procesim', 1, CAST(27.25 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-11T16:30:00.3690231' AS DateTime2), 1016, N'38344864660', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (64, N'Nen Procesim', 2, CAST(584.09 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Istog', N'31000', CAST(N'2024-09-13T02:14:30.1131366' AS DateTime2), 1025, N'35545177188', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (65, N'Nen Procesim', 2, CAST(383.71 AS Decimal(18, 2)), N'123 Main Street', N'Kosova', N'Pristina', N'1000', CAST(N'2024-09-14T13:30:02.7779553' AS DateTime2), 1024, N'38344177188', N'Pas Pranimit')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (66, N'Derguar', 1, CAST(363.00 AS Decimal(18, 2)), N'123 Main Street', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-14T13:31:12.0561122' AS DateTime2), 1024, N'383177188', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (67, N'Rruges Per Dorezim', 1, CAST(25.11 AS Decimal(18, 2)), N'35 Example Road', N'AL', N'Tirana', N'12000', CAST(N'2024-09-15T23:46:34.5392480' AS DateTime2), 1017, N'38344864680', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (68, N'Rruges Per Dorezim', 1, CAST(25.11 AS Decimal(18, 2)), N'123 Main Street', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-15T23:52:10.5029657' AS DateTime2), 1023, N'38344555555', N'Pas Pranimit')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (69, N'Derguar', 1, CAST(16.49 AS Decimal(18, 2)), N'123 Main Street', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-27T22:17:13.9630277' AS DateTime2), 1024, N'38344555555', N'Pas Pranimit')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (70, N'Rruges Per Dorezim', 3, CAST(94.53 AS Decimal(18, 2)), N'123 Main Street', N'Kosova', N'Pristina', N'10000', CAST(N'2024-09-27T22:36:09.5716458' AS DateTime2), 1024, N'38344555555', N'Pas Pranimit')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (71, N'Nen Procesim', 2, CAST(77.63 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-10-07T21:19:16.0187006' AS DateTime2), 1019, N'38344177188', N'Pas Pranimit')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (72, N'Nen Procesim', 1, CAST(16.49 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-10-07T21:34:40.6886063' AS DateTime2), 1019, N'38344177188', N'Stripe')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (73, N'Nen Procesim', 1, CAST(111.09 AS Decimal(18, 2)), N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', CAST(N'2024-10-07T21:41:28.7118156' AS DateTime2), 1019, N'38344177188', N'Pas Pranimit')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (74, N'Nen Procesim', 1, CAST(70.40 AS Decimal(18, 2)), N'31 Random Street ', N'Kosova', N'Vushtrri', N'42000', CAST(N'2024-10-10T18:23:13.2993266' AS DateTime2), 1016, N'38344864660', N'Pas Pranimit')
INSERT [dbo].[Porosia] ([Porosia_ID], [Statusi_Porosise], [TotaliProdukteve], [CmimiTotal], [Adresa], [Shteti], [Qyteti], [ZipKodi], [DataPorosise], [UserId], [NrKontaktues], [MetodaPageses]) VALUES (75, N'Nen Procesim', 2, CAST(383.71 AS Decimal(18, 2)), N'123 Main Street', N'Kosova', N'Pristina', N'10000', CAST(N'2024-10-10T20:21:56.8329070' AS DateTime2), 1024, N'38344555555', N'Stripe')
SET IDENTITY_INSERT [dbo].[Porosia] OFF
GO
SET IDENTITY_INSERT [dbo].[PorosiaItem] ON 

INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (30, 2, 25, 35, CAST(20.92 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (31, 1, 26, 12, CAST(1200.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (32, 2, 26, 22, CAST(120.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (33, 1, 27, 11, CAST(900.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (34, 1, 28, 11, CAST(900.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (35, 1, 29, 31, CAST(10.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (36, 1, 30, 26, CAST(20.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (37, 2, 31, 25, CAST(200.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (38, 2, 32, 24, CAST(50.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (39, 1, 34, 28, CAST(20.18 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (40, 3, 35, 35, CAST(20.92 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (41, 2, 36, 11, CAST(900.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (42, 1, 36, 23, CAST(20.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (43, 3, 37, 11, CAST(900.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (44, 2, 38, 24, CAST(50.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (45, 1, 39, 28, CAST(20.18 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (46, 3, 39, 35, CAST(20.92 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (47, 1, 40, 27, CAST(160.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (48, 1, 41, 30, CAST(330.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (49, 2, 41, 35, CAST(20.92 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (50, 2, 42, 33, CAST(50.65 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (52, 1, 44, 29, CAST(100.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (53, 1, 44, 33, CAST(50.65 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (54, 2, 44, 34, CAST(20.77 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (55, 1, 45, 24, CAST(50.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (56, 2, 45, 28, CAST(20.18 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (57, 1, 46, 23, CAST(20.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (58, 1, 47, 22, CAST(120.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (59, 1, 48, 34, CAST(20.77 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (60, 1, 48, 35, CAST(20.92 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (61, 1, 49, 13, CAST(1000.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (62, 2, 50, 25, CAST(200.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (63, 2, 51, 27, CAST(160.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (64, 1, 51, 34, CAST(20.77 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (65, 2, 52, 28, CAST(20.18 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (66, 1, 52, 30, CAST(660.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (67, 1, 53, 13, CAST(1000.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (68, 1, 53, 22, CAST(120.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (69, 2, 54, 28, CAST(10.09 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (70, 1, 54, 30, CAST(330.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (71, 1, 55, 28, CAST(10.09 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (72, 1, 56, 25, CAST(200.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (73, 1, 56, 28, CAST(10.09 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (74, 2, 56, 29, CAST(100.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (75, 1, 56, 30, CAST(330.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (76, 1, 56, 35, CAST(18.83 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (77, 1, 57, 26, CAST(15.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (78, 1, 58, 26, CAST(15.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (79, 2, 58, 33, CAST(45.59 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (80, 1, 59, 12, CAST(1200.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (81, 1, 59, 14, CAST(500.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (82, 2, 60, 35, CAST(18.83 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (83, 1, 61, 29, CAST(100.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (84, 1, 61, 30, CAST(330.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (85, 1, 62, 27, CAST(160.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (86, 2, 62, 33, CAST(25.33 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (87, 1, 63, 34, CAST(20.77 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (88, 1, 64, 25, CAST(200.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (89, 1, 64, 30, CAST(330.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (90, 1, 65, 30, CAST(330.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (91, 1, 65, 35, CAST(18.83 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (92, 1, 66, 30, CAST(330.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (93, 1, 67, 35, CAST(18.83 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (94, 1, 68, 35, CAST(18.83 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (95, 1, 69, 49, CAST(10.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (96, 2, 70, 28, CAST(10.09 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (97, 1, 70, 34, CAST(20.77 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (98, 1, 70, 43, CAST(40.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (99, 1, 71, 28, CAST(10.09 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (100, 3, 71, 35, CAST(18.83 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (101, 1, 72, 49, CAST(10.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (102, 1, 73, 29, CAST(100.99 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (103, 2, 74, 51, CAST(30.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (104, 1, 75, 30, CAST(330.00 AS Decimal(18, 2)))
INSERT [dbo].[PorosiaItem] ([Item_ID], [SasiaPorositur], [Porosia_ID], [Produkti_ID], [Cmimi]) VALUES (105, 1, 75, 35, CAST(18.83 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[PorosiaItem] OFF
GO
SET IDENTITY_INSERT [dbo].[Adresa] ON 

INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (6, N'31 Random Street ', N'Kosova', N'Vushtrri', N'42000', 1, CAST(N'2024-08-13T18:11:51.3104485' AS DateTime2), 1016)
INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (8, N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', 0, CAST(N'2024-08-13T22:15:38.3438470' AS DateTime2), 1016)
INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (9, N'34 MadeUp Street ', N'AL', N'Tirana', N'1001', 0, CAST(N'2024-08-13T22:18:43.5992080' AS DateTime2), 1016)
INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (10, N'35 Example Road', N'AL', N'Tirana', N'12000', 0, CAST(N'2024-08-18T01:22:21.6963069' AS DateTime2), 1017)
INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (11, N'36 Example Road', N'Kosova', N'Vushtrri', N'42000', 1, CAST(N'2024-08-18T01:22:43.3904317' AS DateTime2), 1017)
INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (12, N'37 Example Street', N'Kosova', N'Pristina', N'10000', 0, CAST(N'2024-08-18T01:23:32.6600127' AS DateTime2), 1017)
INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (13, N'123 Main Street', N'Kosova', N'Pristina', N'10000', 0, CAST(N'2024-09-14T13:33:12.9257795' AS DateTime2), 1024)
INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (14, N'123 Main Street', N'Kosova', N'Pristina', N'10000', 1, CAST(N'2024-09-14T16:28:45.0139907' AS DateTime2), 1018)
INSERT [dbo].[Adresa] ([Adresa_Id], [AdresaUserit], [Shteti], [Qyteti], [ZipKodi], [IsDefault], [CreatedAt], [UserId]) VALUES (15, N'30 Tefta Tashko', N'Kosova', N'Pristina', N'10000', 1, CAST(N'2024-09-30T22:20:00.1480669' AS DateTime2), 1019)
SET IDENTITY_INSERT [dbo].[Adresa] OFF
GO

INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'5f4dc3ef-637f-4869-8541-f439d09d6985', N'User', N'USER', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'7e3923bc-be8d-45cf-9a98-c2d83ea44b78', N'Admin', N'ADMIN', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'b667ae9c-592e-48e7-9637-a864c49c3b41', N'Menaxher', N'MENAXHER', NULL)
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'3f05ad53-4040-498f-aa5e-4141de8f2755', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'5d9c4dee-4001-483f-bc62-5188d897b125', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'63ea9dc4-61f4-4319-8115-10a4ec984b4c', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'b6f94208-166d-4e43-96a9-39d91b9dfdaf', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'bf592811-5047-41bd-b6e5-49a8cf1c9ac4', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'c0654b0f-b4e8-4dd7-a6f7-fea43640e3ea', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'c205696e-f77c-4a7d-a76f-773d84d19888', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'd9be41d1-6915-4e6b-b347-7af1734dd6f7', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'f6046788-dc7c-4ec3-926c-61e0a80c9053', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'f97f67bb-5363-425d-9e9a-6e8e8f4b9388', N'5f4dc3ef-637f-4869-8541-f439d09d6985')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'd9be41d1-6915-4e6b-b347-7af1734dd6f7', N'7e3923bc-be8d-45cf-9a98-c2d83ea44b78')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'f97f67bb-5363-425d-9e9a-6e8e8f4b9388', N'7e3923bc-be8d-45cf-9a98-c2d83ea44b78')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'c205696e-f77c-4a7d-a76f-773d84d19888', N'b667ae9c-592e-48e7-9637-a864c49c3b41')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'd9be41d1-6915-4e6b-b347-7af1734dd6f7', N'b667ae9c-592e-48e7-9637-a864c49c3b41')
GO

SET IDENTITY_INSERT [dbo].[AtributiOption] ON 

INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (1, N'512 GB', 4)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (2, N'250 GB', 4)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (3, N'1 TB', 4)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (6, N'600 GB', 4)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (7, N'Mac OS', 10)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (8, N'Windows', 10)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (9, N'Linux', 10)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (11, N'S', 14)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (12, N'M ', 14)
INSERT [dbo].[AtributiOption] ([Id], [OptionValue], [AtributiId]) VALUES (13, N'L', 14)
SET IDENTITY_INSERT [dbo].[AtributiOption] OFF
GO

SET IDENTITY_INSERT [dbo].[HomeVideos] ON 

INSERT [dbo].[HomeVideos] ([Id], [VideoUrl]) VALUES (4, N'oldmoney.mp4')
INSERT [dbo].[HomeVideos] ([Id], [VideoUrl]) VALUES (5, N'tennis.mp4')
INSERT [dbo].[HomeVideos] ([Id], [VideoUrl]) VALUES (7, N'eyewear.mp4')
SET IDENTITY_INSERT [dbo].[HomeVideos] OFF
GO
SET IDENTITY_INSERT [dbo].[TeDhenatBiznesit] ON 

INSERT [dbo].[TeDhenatBiznesit] ([Id], [EmriBiznesit], [EmailBiznesit], [NrKontaktues], [FacebookLink], [InstagramLink], [LinkedInLink], [TwitterLink]) VALUES (1, N'ShopExpress', N'shopExpress@gmail.com', N'38344111554', N'https://www.facebook.com/', N'https://www.instagram.com/rona.rushiti/', N'https://www.linkedin.com/', N'https://x.com/home')
SET IDENTITY_INSERT [dbo].[TeDhenatBiznesit] OFF
GO
