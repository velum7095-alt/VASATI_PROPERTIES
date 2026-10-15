const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'properties.db');
const db = new DatabaseSync(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    locality TEXT,
    price REAL NOT NULL,
    priceLabel TEXT NOT NULL,
    bhk INTEGER NOT NULL,
    area TEXT NOT NULL,
    baths INTEGER NOT NULL,
    status TEXT NOT NULL,
    image TEXT NOT NULL,
    video_url TEXT,
    alt TEXT,
    listed TEXT,
    kind TEXT,
    possession TEXT,
    description TEXT,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id TEXT,
    property_title TEXT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    status TEXT DEFAULT 'New',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS featured_projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    builder_name TEXT NOT NULL,
    builder_logo TEXT,
    price_range TEXT,
    bhk_types TEXT,
    location TEXT,
    offer_text TEXT,
    image TEXT,
    video_url TEXT,
    link TEXT
  );

  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Try adding video_url column if database already existed
try { db.exec("ALTER TABLE properties ADD COLUMN video_url TEXT;"); } catch (e) {}
try { db.exec("ALTER TABLE featured_projects ADD COLUMN video_url TEXT;"); } catch (e) {}

// Seed default settings if empty
const settingsCountStmt = db.prepare('SELECT COUNT(*) as count FROM site_settings');
if (settingsCountStmt.get().count === 0) {
  const defaultSettings = [
    { key: 'hero_tag', value: '✨ Premium Bengaluru Real Estate Portfolio' },
    { key: 'hero_title', value: 'Find Your Dream Space in the Silicon Valley of India' },
    { key: 'hero_subtitle', value: 'Verified builder developments, luxury gated communities, and prime resale apartments across Bengaluru\'s top tech corridors.' },
    { key: 'contact_phone', value: '+91 98765 43210' },
    { key: 'whatsapp_number', value: '919876543210' },
    { key: 'contact_email', value: 'contact@vasatiproperties.com' },
    { key: 'stat_active_listings', value: '150+' },
    { key: 'stat_hubs', value: '15+' },
    { key: 'stat_trust', value: '100%' }
  ];
  const insertSetting = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?)');
  for (const s of defaultSettings) {
    insertSetting.run(s.key, s.value);
  }
}

// Seed default properties if table is empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM properties');
if (countStmt.get().count === 0) {
  const seedProperties = [
    {
      id: "a",
      title: "Modern living in Whitefield",
      location: "Whitefield, East Bengaluru",
      locality: "Whitefield",
      price: 95,
      priceLabel: "₹95 L",
      bhk: 2,
      area: "1,240 sqft",
      baths: 2,
      status: "New",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=78",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      alt: "Bright contemporary home with spacious living and dining areas",
      listed: "Agent listing · Verified",
      kind: "Apartment",
      possession: "Ready to move",
      description: "A bright, thoughtfully laid-out premium home in Whitefield close to tech parks, international schools, and metro stations.",
      featured: 1
    },
    {
      id: "b",
      title: "Room to grow in Sarjapur",
      location: "Sarjapur Road, South Bengaluru",
      locality: "Sarjapur Road",
      price: 125,
      priceLabel: "₹1.25 Cr",
      bhk: 3,
      area: "1,685 sqft",
      baths: 3,
      status: "New",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=78",
      video_url: "",
      alt: "Contemporary residence with generous living space and natural light",
      listed: "Agent listing · Verified",
      kind: "Apartment",
      possession: "Under construction",
      description: "A spacious luxury apartment listing on Sarjapur Road. Premium amenities, club house, swimming pool, and quick connectivity to Outer Ring Road.",
      featured: 1
    },
    {
      id: "c",
      title: "A home with character",
      location: "HSR Layout, South Bengaluru",
      locality: "HSR Layout",
      price: 220,
      priceLabel: "₹2.2 Cr",
      bhk: 3,
      area: "2,140 sqft",
      baths: 3,
      status: "Resale",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=78",
      video_url: "",
      alt: "Airy modern family home with a garden-side patio",
      listed: "Resale · Verified",
      kind: "Villa",
      possession: "Ready to move",
      description: "A premium resale family home in prime HSR Layout Sector 2. Quiet residential avenue with landscaped garden, private parking, and high rental yield.",
      featured: 1
    },
    {
      id: "d",
      title: "A brighter start in Electronic City",
      location: "Electronic City, South Bengaluru",
      locality: "Electronic City",
      price: 68,
      priceLabel: "₹68 L",
      bhk: 2,
      area: "1,090 sqft",
      baths: 2,
      status: "New",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=78",
      video_url: "",
      alt: "Sunlit apartment interior with a calm neutral palette",
      listed: "Agent listing · Verified",
      kind: "Apartment",
      possession: "Ready to move",
      description: "A welcoming apartment near Electronic City Phase 1. Close to major IT campuses with fast access via the elevated expressway.",
      featured: 0
    },
    {
      id: "e",
      title: "A cosy home in Thanisandra",
      location: "Thanisandra, North Bengaluru",
      locality: "Thanisandra",
      price: 52,
      priceLabel: "₹52 L",
      bhk: 1,
      area: "710 sqft",
      baths: 1,
      status: "Resale",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=78",
      video_url: "",
      alt: "Compact modern home with an inviting living room",
      listed: "Resale · Verified",
      kind: "Apartment",
      possession: "Ready to move",
      description: "A compact modern resale apartment in Thanisandra Main Road, ideal for young professionals or investors seeking high rental returns near Manyata Tech Park.",
      featured: 0
    },
    {
      id: "f",
      title: "The Yelahanka family villa",
      location: "Yelahanka, North Bengaluru",
      locality: "Yelahanka",
      price: 245,
      priceLabel: "₹2.45 Cr",
      bhk: 4,
      area: "3,050 sqft",
      baths: 4,
      status: "Villa",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=78",
      video_url: "",
      alt: "Contemporary villa with clean architecture and landscaped greenery",
      listed: "Agent listing · Verified",
      kind: "Villa",
      possession: "Ready to move",
      description: "A grand duplex family villa in scenic Yelahanka. Peaceful gated community with round-the-clock security, private terrace garden, and clubhouse access.",
      featured: 1
    }
  ];

  const insertProp = db.prepare(`
    INSERT INTO properties (
      id, title, location, locality, price, priceLabel, bhk, area, baths, status,
      image, video_url, alt, listed, kind, possession, description, featured
    ) VALUES (
      @id, @title, @location, @locality, @price, @priceLabel, @bhk, @area, @baths, @status,
      @image, @video_url, @alt, @listed, @kind, @possession, @description, @featured
    )
  `);

  for (const prop of seedProperties) {
    insertProp.run(prop);
  }
}

// Seed featured projects
const countProjStmt = db.prepare('SELECT COUNT(*) as count FROM featured_projects');
if (countProjStmt.get().count === 0) {
  const seedProjects = [
    {
      id: "proj-1",
      name: "Prestige City Serenity",
      builder_name: "Prestige Group",
      builder_logo: "PRESTIGE",
      price_range: "₹ 1.2 Cr - 2.8 Cr",
      bhk_types: "2, 3 & 4 BHK Luxury Apartments",
      location: "Sarjapur Road, Bengaluru",
      offer_text: "Festive Offer: Zero Stamp Duty on Booking this month",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=78",
      video_url: "",
      link: "#propertiesSection"
    },
    {
      id: "proj-2",
      name: "Sobha Dream Acres",
      builder_name: "Sobha Limited",
      builder_logo: "SOBHA",
      price_range: "₹ 75 L - 1.45 Cr",
      bhk_types: "1 & 2 BHK Pre-crafted Homes",
      location: "Panathur, Outer Ring Road, Bengaluru",
      offer_text: "Ready to Move Options Available · Instant Loan Approval",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=78",
      video_url: "",
      link: "#propertiesSection"
    },
    {
      id: "proj-3",
      name: "Godrej Woodscapes",
      builder_name: "Godrej Properties",
      builder_logo: "GODREJ",
      price_range: "₹ 98 L - 2.1 Cr",
      bhk_types: "2, 3 & 3.5 BHK Forest Theme Residences",
      location: "Budigere Cross, Old Madras Road, Bengaluru",
      offer_text: "Exclusive Launch Benefits with 10:90 Payment Plan",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=78",
      video_url: "",
      link: "#propertiesSection"
    }
  ];

  const insertProj = db.prepare(`
    INSERT INTO featured_projects (
      id, name, builder_name, builder_logo, price_range, bhk_types, location, offer_text, image, video_url, link
    ) VALUES (
      @id, @name, @builder_name, @builder_logo, @price_range, @bhk_types, @location, @offer_text, @image, @video_url, @link
    )
  `);

  for (const proj of seedProjects) {
    insertProj.run(proj);
  }
}

module.exports = {
  db,
  // Property methods
  getAllProperties: (filters = {}) => {
    let sql = 'SELECT * FROM properties WHERE 1=1';
    const params = [];

    if (filters.locality && filters.locality !== 'all' && filters.locality !== 'Bengaluru' && filters.locality !== 'Bangalore') {
      sql += ' AND (location LIKE ? OR locality LIKE ?)';
      params.push(`%${filters.locality}%`, `%${filters.locality}%`);
    }
    if (filters.bhk && filters.bhk !== 'any') {
      const bhkNum = parseInt(filters.bhk, 10);
      if (bhkNum >= 4) {
        sql += ' AND bhk >= 4';
      } else {
        sql += ' AND bhk = ?';
        params.push(bhkNum);
      }
    }
    if (filters.status && filters.status !== 'any') {
      sql += ' AND status = ?';
      params.push(filters.status);
    }
    if (filters.kind && filters.kind !== 'Buy' && filters.kind !== 'any') {
      sql += ' AND kind = ?';
      params.push(filters.kind);
    }
    if (filters.minPrice) {
      sql += ' AND price >= ?';
      params.push(Number(filters.minPrice));
    }
    if (filters.maxPrice && filters.maxPrice < 500) {
      sql += ' AND price <= ?';
      params.push(Number(filters.maxPrice));
    }
    if (filters.budget && filters.budget !== 'any') {
      sql += ' AND price <= ?';
      params.push(Number(filters.budget));
    }
    if (filters.search) {
      sql += ' AND (title LIKE ? OR location LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.sort === 'price') {
      sql += ' ORDER BY price ASC';
    } else if (filters.sort === 'price-desc') {
      sql += ' ORDER BY price DESC';
    } else {
      sql += ' ORDER BY featured DESC, created_at DESC';
    }

    const stmt = db.prepare(sql);
    return stmt.all(...params);
  },

  getPropertyById: (id) => {
    const stmt = db.prepare('SELECT * FROM properties WHERE id = ?');
    return stmt.get(id);
  },

  createProperty: (prop) => {
    const id = prop.id || 'prop_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const stmt = db.prepare(`
      INSERT INTO properties (
        id, title, location, locality, price, priceLabel, bhk, area, baths, status,
        image, video_url, alt, listed, kind, possession, description, featured
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);
    const price = Number(prop.price);
    const priceLabel = prop.priceLabel || (price >= 100 ? `₹${(price/100).toFixed(2)} Cr` : `₹${price} L`);
    stmt.run(
      id,
      prop.title,
      prop.location,
      prop.locality || prop.location.split(',')[0].trim(),
      price,
      priceLabel,
      Number(prop.bhk),
      prop.area,
      Number(prop.baths || 2),
      prop.status || 'New',
      prop.image || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=78',
      prop.video_url || '',
      prop.alt || prop.title,
      prop.listed || 'Agent listing · Verified',
      prop.kind || 'Apartment',
      prop.possession || 'Ready to move',
      prop.description || '',
      prop.featured ? 1 : 0
    );
    return id;
  },

  updateProperty: (id, prop) => {
    const stmt = db.prepare(`
      UPDATE properties SET
        title = ?,
        location = ?,
        locality = ?,
        price = ?,
        priceLabel = ?,
        bhk = ?,
        area = ?,
        baths = ?,
        status = ?,
        image = ?,
        video_url = ?,
        alt = ?,
        listed = ?,
        kind = ?,
        possession = ?,
        description = ?,
        featured = ?
      WHERE id = ?
    `);
    const price = Number(prop.price);
    const priceLabel = prop.priceLabel || (price >= 100 ? `₹${(price/100).toFixed(2)} Cr` : `₹${price} L`);
    stmt.run(
      prop.title,
      prop.location,
      prop.locality || prop.location.split(',')[0].trim(),
      price,
      priceLabel,
      Number(prop.bhk),
      prop.area,
      Number(prop.baths || 2),
      prop.status,
      prop.image,
      prop.video_url || '',
      prop.alt || prop.title,
      prop.listed || 'Verified Listing',
      prop.kind || 'Apartment',
      prop.possession || 'Ready to move',
      prop.description || '',
      prop.featured ? 1 : 0,
      id
    );
    return true;
  },

  deleteProperty: (id) => {
    const stmt = db.prepare('DELETE FROM properties WHERE id = ?');
    stmt.run(id);
    return true;
  },

  // Featured Projects (Hero Slider) Methods
  getFeaturedProjects: () => {
    return db.prepare('SELECT * FROM featured_projects').all();
  },

  createFeaturedProject: (proj) => {
    const id = proj.id || 'slide_' + Date.now().toString(36);
    const stmt = db.prepare(`
      INSERT INTO featured_projects (
        id, name, builder_name, builder_logo, price_range, bhk_types, location, offer_text, image, video_url, link
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);
    stmt.run(
      id,
      proj.name,
      proj.builder_name || 'Premier Builder',
      proj.builder_logo || 'PARTNER',
      proj.price_range || 'Contact for Price',
      proj.bhk_types || '2, 3 BHK Luxury Apartments',
      proj.location || 'Bengaluru',
      proj.offer_text || 'Exclusive Launch Benefits',
      proj.image,
      proj.video_url || '',
      proj.link || '#propertiesSection'
    );
    return id;
  },

  updateFeaturedProject: (id, proj) => {
    const stmt = db.prepare(`
      UPDATE featured_projects SET
        name = ?,
        builder_name = ?,
        builder_logo = ?,
        price_range = ?,
        bhk_types = ?,
        location = ?,
        offer_text = ?,
        image = ?,
        video_url = ?,
        link = ?
      WHERE id = ?
    `);
    stmt.run(
      proj.name,
      proj.builder_name,
      proj.builder_logo,
      proj.price_range,
      proj.bhk_types,
      proj.location,
      proj.offer_text,
      proj.image,
      proj.video_url || '',
      proj.link || '#propertiesSection',
      id
    );
    return true;
  },

  deleteFeaturedProject: (id) => {
    const stmt = db.prepare('DELETE FROM featured_projects WHERE id = ?');
    stmt.run(id);
    return true;
  },

  // Site Settings Methods
  getSiteSettings: () => {
    const rows = db.prepare('SELECT key, value FROM site_settings').all();
    const settings = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    return settings;
  },

  updateSiteSettings: (settingsObj) => {
    const stmt = db.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)');
    for (const [key, value] of Object.entries(settingsObj)) {
      stmt.run(key, String(value));
    }
    return true;
  },

  // Enquiries methods
  getAllEnquiries: (status = null) => {
    let sql = 'SELECT * FROM enquiries';
    const params = [];
    if (status) {
      sql += ' WHERE status = ?';
      params.push(status);
    }
    sql += ' ORDER BY created_at DESC';
    const stmt = db.prepare(sql);
    return stmt.all(...params);
  },

  createEnquiry: (enquiry) => {
    const stmt = db.prepare(`
      INSERT INTO enquiries (property_id, property_title, name, phone, email, message, status)
      VALUES (?, ?, ?, ?, ?, ?, 'New')
    `);
    const info = stmt.run(
      enquiry.property_id || null,
      enquiry.property_title || 'General Enquiry',
      enquiry.name,
      enquiry.phone,
      enquiry.email || '',
      enquiry.message || ''
    );
    return info.lastInsertRowid;
  },

  updateEnquiryStatus: (id, status) => {
    const stmt = db.prepare('UPDATE enquiries SET status = ? WHERE id = ?');
    stmt.run(status, id);
    return true;
  },

  deleteEnquiry: (id) => {
    const stmt = db.prepare('DELETE FROM enquiries WHERE id = ?');
    stmt.run(id);
    return true;
  },

  getStats: () => {
    const totalProps = db.prepare('SELECT COUNT(*) as count FROM properties').get().count;
    const newProps = db.prepare("SELECT COUNT(*) as count FROM properties WHERE status = 'New'").get().count;
    const resaleProps = db.prepare("SELECT COUNT(*) as count FROM properties WHERE status = 'Resale'").get().count;
    const villaProps = db.prepare("SELECT COUNT(*) as count FROM properties WHERE status = 'Villa'").get().count;
    const totalSlides = db.prepare('SELECT COUNT(*) as count FROM featured_projects').get().count;
    const totalEnquiries = db.prepare('SELECT COUNT(*) as count FROM enquiries').get().count;
    const newEnquiries = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'New'").get().count;

    return {
      totalProperties: totalProps,
      newHomes: newProps,
      resaleHomes: resaleProps,
      villas: villaProps,
      totalSlides,
      totalEnquiries,
      newEnquiries
    };
  }
};
