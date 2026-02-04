-- Donut Vote USA - Seed Data
-- Run this after schema.sql to populate with real donut shops and donuts

-- ============================================
-- SHOPS - Real donut shops across America
-- ============================================

INSERT INTO shops (name, slug, description, city, state, state_code, is_chain, doordash_url, website) VALUES

-- National Chains
('Krispy Kreme', 'krispy-kreme', 'Home of the Original Glazed doughnut since 1937', 'Winston-Salem', 'North Carolina', 'NC', TRUE, 'https://www.doordash.com/store/krispy-kreme', 'https://www.krispykreme.com'),
('Dunkin''', 'dunkin', 'America runs on Dunkin. Coffee and donuts since 1950', 'Canton', 'Massachusetts', 'MA', TRUE, 'https://www.doordash.com/store/dunkin', 'https://www.dunkindonuts.com'),

-- Oregon
('Voodoo Doughnut', 'voodoo-doughnut', 'The magic is in the hole. Keep Portland weird since 2003', 'Portland', 'Oregon', 'OR', TRUE, 'https://www.doordash.com/store/voodoo-doughnut', 'https://www.voodoodoughnut.com'),
('Blue Star Donuts', 'blue-star-donuts', 'Brioche-based donuts made with local ingredients', 'Portland', 'Oregon', 'OR', FALSE, 'https://www.doordash.com/store/blue-star-donuts', 'https://www.bluestardonuts.com'),

-- California
('Sidecar Doughnuts', 'sidecar-doughnuts', 'Handcrafted daily using fresh, local ingredients', 'Costa Mesa', 'California', 'CA', FALSE, 'https://www.doordash.com/store/sidecar-doughnuts', 'https://www.sidecardoughnuts.com'),
('Randy''s Donuts', 'randys-donuts', 'Iconic giant donut on the roof since 1953', 'Inglewood', 'California', 'CA', FALSE, 'https://www.doordash.com/store/randys-donuts', 'https://www.randysdonuts.com'),
('Donut Friend', 'donut-friend', 'Vegan-friendly punk rock donut shop', 'Los Angeles', 'California', 'CA', FALSE, 'https://www.doordash.com/store/donut-friend', 'https://www.donutfriend.com'),
('Psycho Donuts', 'psycho-donuts', 'Crazy delicious donuts in a mental hospital theme', 'San Jose', 'California', 'CA', FALSE, NULL, 'https://www.psychodonuts.com'),

-- New York
('Doughnut Plant', 'doughnut-plant', 'NYC''s original artisan donut shop since 1994', 'New York', 'New York', 'NY', FALSE, 'https://www.doordash.com/store/doughnut-plant', 'https://www.doughnutplant.com'),
('Dominique Ansel Bakery', 'dominique-ansel', 'Home of the original Cronut', 'New York', 'New York', 'NY', FALSE, NULL, 'https://www.dominiqueanselbakery.com'),
('Peter Pan Donut & Pastry Shop', 'peter-pan-donut', 'Brooklyn institution since 1953', 'Brooklyn', 'New York', 'NY', FALSE, NULL, NULL),
('The Donut Pub', 'donut-pub', 'NYC 24-hour donut destination since 1964', 'New York', 'New York', 'NY', FALSE, 'https://www.doordash.com/store/the-donut-pub', NULL),

-- Texas
('Shipley Do-Nuts', 'shipley-do-nuts', 'Texas donut chain since 1936', 'Houston', 'Texas', 'TX', TRUE, 'https://www.doordash.com/store/shipley-do-nuts', 'https://www.shipleydonuts.com'),
('Round Rock Donuts', 'round-rock-donuts', 'Famous for the Texas-sized orange donut', 'Round Rock', 'Texas', 'TX', FALSE, NULL, 'https://www.roundrockdonuts.com'),
('Gourdough''s', 'gourdoughs', 'Over-the-top gourmet donuts from a food truck turned institution', 'Austin', 'Texas', 'TX', FALSE, 'https://www.doordash.com/store/gourdoughs', 'https://www.gourdoughs.com'),
('Hurts Donut Company', 'hurts-donut', 'Open 24 hours with outrageous flavors', 'Frisco', 'Texas', 'TX', TRUE, 'https://www.doordash.com/store/hurts-donut', 'https://www.hurtsdonutco.com'),

-- Illinois
('Stan''s Donuts', 'stans-donuts', 'Chicago''s favorite for chef-crafted donuts', 'Chicago', 'Illinois', 'IL', FALSE, 'https://www.doordash.com/store/stans-donuts', 'https://www.stansdonutschicago.com'),
('Do-Rite Donuts', 'do-rite-donuts', 'Old-fashioned donuts made right', 'Chicago', 'Illinois', 'IL', FALSE, 'https://www.doordash.com/store/do-rite-donuts', 'https://www.doritedonuts.com'),
('Firecakes Donuts', 'firecakes-donuts', 'Small-batch artisan donuts', 'Chicago', 'Illinois', 'IL', FALSE, 'https://www.doordash.com/store/firecakes', 'https://www.firecakesdonuts.com'),

-- Washington
('Top Pot Doughnuts', 'top-pot-doughnuts', 'Hand-forged doughnuts in Seattle since 2002', 'Seattle', 'Washington', 'WA', FALSE, 'https://www.doordash.com/store/top-pot-doughnuts', 'https://www.toppotdoughnuts.com'),
('Mighty-O Donuts', 'mighty-o-donuts', 'Organic, vegan donuts in Seattle', 'Seattle', 'Washington', 'WA', FALSE, 'https://www.doordash.com/store/mighty-o-donuts', 'https://www.mightyo.com'),

-- Pennsylvania
('Federal Donuts', 'federal-donuts', 'Donuts + fried chicken = genius', 'Philadelphia', 'Pennsylvania', 'PA', FALSE, 'https://www.doordash.com/store/federal-donuts', 'https://www.federaldonuts.com'),
('Beiler''s Doughnuts', 'beilers-doughnuts', 'Amish-style donuts at Reading Terminal Market', 'Philadelphia', 'Pennsylvania', 'PA', FALSE, NULL, NULL),

-- Florida
('The Salty Donut', 'the-salty-donut', 'Miami''s artisan donut shop', 'Miami', 'Florida', 'FL', FALSE, 'https://www.doordash.com/store/the-salty-donut', 'https://www.thesaltydonut.com'),

-- Colorado
('Voodoo Doughnut Denver', 'voodoo-doughnut-denver', 'The magic is in the hole - Denver location', 'Denver', 'Colorado', 'CO', TRUE, 'https://www.doordash.com/store/voodoo-doughnut-denver', 'https://www.voodoodoughnut.com'),
('LaMar''s Donuts', 'lamars-donuts', 'Colorado''s favorite since 1993', 'Denver', 'Colorado', 'CO', TRUE, 'https://www.doordash.com/store/lamars-donuts', 'https://www.lamars.com'),

-- Louisiana
('Cafe Du Monde', 'cafe-du-monde', 'World-famous beignets since 1862', 'New Orleans', 'Louisiana', 'LA', FALSE, NULL, 'https://www.cafedumonde.com'),
('District Donuts', 'district-donuts', 'Sliders and donuts in the Garden District', 'New Orleans', 'Louisiana', 'LA', FALSE, 'https://www.doordash.com/store/district-donuts', 'https://www.districtdonuts.com'),

-- Georgia
('Sublime Doughnuts', 'sublime-doughnuts', 'Atlanta''s best since 2008', 'Atlanta', 'Georgia', 'GA', FALSE, 'https://www.doordash.com/store/sublime-doughnuts', 'https://www.sublimedoughnuts.com'),

-- Ohio
('Buckeye Donuts', 'buckeye-donuts', '24-hour Columbus institution since 1969', 'Columbus', 'Ohio', 'OH', FALSE, NULL, NULL),
('Holtman''s Donuts', 'holtmans-donuts', 'Cincinnati''s favorite since 1960', 'Cincinnati', 'Ohio', 'OH', FALSE, NULL, 'https://www.holtmansdonutshop.com'),

-- Arizona
('Hurts Donut Phoenix', 'hurts-donut-phoenix', '24/7 outrageous donuts', 'Phoenix', 'Arizona', 'AZ', TRUE, 'https://www.doordash.com/store/hurts-donut-phoenix', 'https://www.hurtsdonutco.com'),
('BoSa Donuts', 'bosa-donuts', 'Arizona chain with cult following', 'Phoenix', 'Arizona', 'AZ', TRUE, NULL, NULL),

-- Minnesota
('Glam Doll Donuts', 'glam-doll-donuts', 'Handmade donuts with vintage flair', 'Minneapolis', 'Minnesota', 'MN', FALSE, 'https://www.doordash.com/store/glam-doll-donuts', 'https://www.glamdolldonuts.com'),

-- Michigan
('Dutch Girl Donuts', 'dutch-girl-donuts', 'Detroit classic since 1947', 'Detroit', 'Michigan', 'MI', FALSE, NULL, NULL),

-- Utah
('Banbury Cross Donuts', 'banbury-cross-donuts', 'Utah''s favorite since 1986', 'Salt Lake City', 'Utah', 'UT', FALSE, NULL, 'https://www.banburycross.com'),

-- Nevada
('Pinkbox Doughnuts', 'pinkbox-doughnuts', 'Pink and proud in Las Vegas', 'Las Vegas', 'Nevada', 'NV', FALSE, 'https://www.doordash.com/store/pinkbox-doughnuts', 'https://www.pinkboxdoughnuts.com'),

-- Hawaii
('Leonard''s Bakery', 'leonards-bakery', 'Home of the original Hawaiian malasada since 1952', 'Honolulu', 'Hawaii', 'HI', FALSE, NULL, 'https://www.leonardshawaii.com')

ON CONFLICT (slug) DO NOTHING;


-- ============================================
-- DONUTS - Popular donuts from these shops
-- ============================================

INSERT INTO donuts (name, slug, description, shop_id, flavor_category, is_signature) VALUES

-- Krispy Kreme
('Original Glazed', 'krispy-kreme-original-glazed', 'The one that started it all - light, fluffy, and perfectly glazed', (SELECT id FROM shops WHERE slug = 'krispy-kreme'), 'glazed', TRUE),
('Chocolate Iced Glazed', 'krispy-kreme-chocolate-iced', 'Original glazed topped with rich chocolate icing', (SELECT id FROM shops WHERE slug = 'krispy-kreme'), 'glazed', FALSE),
('Strawberry Iced with Sprinkles', 'krispy-kreme-strawberry-sprinkles', 'Strawberry icing with colorful sprinkles', (SELECT id FROM shops WHERE slug = 'krispy-kreme'), 'glazed', FALSE),

-- Dunkin'
('Boston Cream', 'dunkin-boston-cream', 'Bavarian cream filled, chocolate frosted classic', (SELECT id FROM shops WHERE slug = 'dunkin'), 'filled', TRUE),
('Glazed', 'dunkin-glazed', 'Classic glazed donut', (SELECT id FROM shops WHERE slug = 'dunkin'), 'glazed', FALSE),
('Jelly', 'dunkin-jelly', 'Filled with strawberry jelly, powdered sugar coating', (SELECT id FROM shops WHERE slug = 'dunkin'), 'filled', FALSE),
('Chocolate Frosted', 'dunkin-chocolate-frosted', 'Topped with rich chocolate frosting', (SELECT id FROM shops WHERE slug = 'dunkin'), 'glazed', FALSE),

-- Voodoo Doughnut
('Bacon Maple Bar', 'voodoo-bacon-maple-bar', 'Maple glazed raised yeast bar with bacon strips', (SELECT id FROM shops WHERE slug = 'voodoo-doughnut'), 'gourmet', TRUE),
('Voodoo Doll', 'voodoo-voodoo-doll', 'Chocolate filled, topped with chocolate frosting and pretzel stake', (SELECT id FROM shops WHERE slug = 'voodoo-doughnut'), 'filled', TRUE),
('Old Dirty Bastard', 'voodoo-old-dirty-bastard', 'Raised yeast with chocolate, peanut butter, and Oreos', (SELECT id FROM shops WHERE slug = 'voodoo-doughnut'), 'gourmet', FALSE),
('Mango Tango', 'voodoo-mango-tango', 'Vanilla frosted with Tang powder', (SELECT id FROM shops WHERE slug = 'voodoo-doughnut'), 'gourmet', FALSE),

-- Sidecar Doughnuts
('Huckleberry', 'sidecar-huckleberry', 'Huckleberry glaze with fresh huckleberries', (SELECT id FROM shops WHERE slug = 'sidecar-doughnuts'), 'glazed', TRUE),
('Maple Bacon', 'sidecar-maple-bacon', 'Maple glaze with thick-cut bacon', (SELECT id FROM shops WHERE slug = 'sidecar-doughnuts'), 'gourmet', FALSE),
('Butter & Salt', 'sidecar-butter-salt', 'Brown butter glaze with Maldon sea salt', (SELECT id FROM shops WHERE slug = 'sidecar-doughnuts'), 'glazed', TRUE),

-- Dominique Ansel
('Cronut', 'dominique-ansel-cronut', 'The original croissant-donut hybrid that started it all', (SELECT id FROM shops WHERE slug = 'dominique-ansel'), 'cronut', TRUE),
('DKA', 'dominique-ansel-dka', 'Dominique''s Kouign Amann - caramelized croissant', (SELECT id FROM shops WHERE slug = 'dominique-ansel'), 'gourmet', TRUE),

-- Stan's Donuts
('Biscoff Pocket', 'stans-biscoff-pocket', 'Filled with Biscoff cookie butter', (SELECT id FROM shops WHERE slug = 'stans-donuts'), 'filled', TRUE),
('Pistachio Pocketful', 'stans-pistachio-pocketful', 'Pistachio cream filled, pistachio topped', (SELECT id FROM shops WHERE slug = 'stans-donuts'), 'filled', FALSE),
('Glazed Old Fashioned', 'stans-glazed-old-fashioned', 'Sour cream cake donut with vanilla glaze', (SELECT id FROM shops WHERE slug = 'stans-donuts'), 'cake', FALSE),

-- Top Pot Doughnuts
('Old Fashioned', 'top-pot-old-fashioned', 'Classic sour cream cake donut', (SELECT id FROM shops WHERE slug = 'top-pot-doughnuts'), 'cake', TRUE),
('Maple Bar', 'top-pot-maple-bar', 'Raised bar with maple glaze', (SELECT id FROM shops WHERE slug = 'top-pot-doughnuts'), 'glazed', FALSE),
('Apple Fritter', 'top-pot-apple-fritter', 'Classic apple fritter with cinnamon glaze', (SELECT id FROM shops WHERE slug = 'top-pot-doughnuts'), 'cake', FALSE),

-- Federal Donuts
('Fancy Donut', 'federal-fancy', 'Daily rotating fancy flavors', (SELECT id FROM shops WHERE slug = 'federal-donuts'), 'gourmet', TRUE),
('Strawberry Lavender', 'federal-strawberry-lavender', 'Strawberry glaze with lavender sugar', (SELECT id FROM shops WHERE slug = 'federal-donuts'), 'glazed', FALSE),
('Cinnamon Brown Sugar', 'federal-cinnamon-brown-sugar', 'Warm cinnamon with brown sugar coating', (SELECT id FROM shops WHERE slug = 'federal-donuts'), 'cake', FALSE),

-- The Salty Donut
('Maple Bacon', 'salty-maple-bacon', 'House maple glaze with Nueske''s bacon', (SELECT id FROM shops WHERE slug = 'the-salty-donut'), 'gourmet', TRUE),
('Brown Butter Key Lime', 'salty-brown-butter-key-lime', 'Brown butter glaze with key lime curd', (SELECT id FROM shops WHERE slug = 'the-salty-donut'), 'glazed', TRUE),

-- Donut Friend (Vegan)
('Bacon 182', 'donut-friend-bacon-182', 'Vegan maple with coconut bacon', (SELECT id FROM shops WHERE slug = 'donut-friend'), 'vegan', TRUE),
('Green Teagan & Sara', 'donut-friend-green-tea', 'Matcha green tea glazed', (SELECT id FROM shops WHERE slug = 'donut-friend'), 'vegan', FALSE),

-- Cafe Du Monde
('Beignet', 'cafe-du-monde-beignet', 'Iconic New Orleans square donut covered in powdered sugar', (SELECT id FROM shops WHERE slug = 'cafe-du-monde'), 'other', TRUE),

-- Leonard's Bakery
('Original Malasada', 'leonards-original-malasada', 'Traditional Portuguese fried dough, sugar-coated', (SELECT id FROM shops WHERE slug = 'leonards-bakery'), 'other', TRUE),
('Haupia Malasada', 'leonards-haupia-malasada', 'Filled with coconut pudding', (SELECT id FROM shops WHERE slug = 'leonards-bakery'), 'filled', FALSE),

-- Round Rock Donuts
('Texas Donut', 'round-rock-texas-donut', 'Giant orange-glazed donut, Texas-sized', (SELECT id FROM shops WHERE slug = 'round-rock-donuts'), 'glazed', TRUE),

-- Shipley Do-Nuts
('Kolache', 'shipley-kolache', 'Czech-style pastry with sausage filling', (SELECT id FROM shops WHERE slug = 'shipley-do-nuts'), 'filled', TRUE),
('Glazed Donut', 'shipley-glazed', 'Classic Shipley glazed', (SELECT id FROM shops WHERE slug = 'shipley-do-nuts'), 'glazed', FALSE)

ON CONFLICT (slug) DO NOTHING;


-- ============================================
-- Initialize vote counter if not exists
-- ============================================
INSERT INTO vote_counter (id, total_votes, last_winner_vote)
VALUES (1, 0, 0)
ON CONFLICT (id) DO NOTHING;
