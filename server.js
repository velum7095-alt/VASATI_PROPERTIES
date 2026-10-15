const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static assets from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// ----------------- SITE SETTINGS APIS -----------------

app.get('/api/settings', (req, res) => {
  try {
    const settings = db.getSiteSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, message: 'Server error fetching settings' });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    db.updateSiteSettings(req.body);
    const updated = db.getSiteSettings();
    res.json({ success: true, message: 'Settings updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, message: 'Server error updating settings' });
  }
});

// ----------------- PROPERTY APIS -----------------

// 1. GET /api/properties (Filter, Search, Sort)
app.get('/api/properties', (req, res) => {
  try {
    const { locality, bhk, status, kind, minPrice, maxPrice, budget, search, sort } = req.query;
    const properties = db.getAllProperties({
      locality,
      bhk,
      status,
      kind,
      minPrice,
      maxPrice,
      budget,
      search,
      sort
    });
    res.json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ success: false, message: 'Server error fetching properties' });
  }
});

// 2. GET /api/properties/:id (Single property)
app.get('/api/properties/:id', (req, res) => {
  try {
    const property = db.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ success: false, message: 'Server error fetching property' });
  }
});

// 3. POST /api/properties (Create new property)
app.post('/api/properties', (req, res) => {
  try {
    const { title, location, price, bhk, area } = req.body;
    if (!title || !location || !price || !bhk || !area) {
      return res.status(400).json({ success: false, message: 'Missing required property fields' });
    }

    const newId = db.createProperty(req.body);
    const created = db.getPropertyById(newId);
    res.status(201).json({ success: true, message: 'Property created successfully', data: created });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ success: false, message: 'Server error creating property' });
  }
});

// 4. PUT /api/properties/:id (Update property)
app.put('/api/properties/:id', (req, res) => {
  try {
    const existing = db.getPropertyById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    db.updateProperty(req.params.id, req.body);
    const updated = db.getPropertyById(req.params.id);
    res.json({ success: true, message: 'Property updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ success: false, message: 'Server error updating property' });
  }
});

// 5. DELETE /api/properties/:id (Delete property)
app.delete('/api/properties/:id', (req, res) => {
  try {
    const existing = db.getPropertyById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    db.deleteProperty(req.params.id);
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ success: false, message: 'Server error deleting property' });
  }
});

// ----------------- FEATURED PROJECTS (HERO SLIDES) APIS -----------------

app.get('/api/featured-projects', (req, res) => {
  try {
    const projects = db.getFeaturedProjects();
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Server error fetching projects' });
  }
});

app.post('/api/featured-projects', (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({ success: false, message: 'Project name and Image URL are required' });
    }
    const id = db.createFeaturedProject(req.body);
    res.status(201).json({ success: true, message: 'Slide created successfully', id });
  } catch (error) {
    console.error('Error creating slide:', error);
    res.status(500).json({ success: false, message: 'Server error creating slide' });
  }
});

app.put('/api/featured-projects/:id', (req, res) => {
  try {
    db.updateFeaturedProject(req.params.id, req.body);
    res.json({ success: true, message: 'Slide updated successfully' });
  } catch (error) {
    console.error('Error updating slide:', error);
    res.status(500).json({ success: false, message: 'Server error updating slide' });
  }
});

app.delete('/api/featured-projects/:id', (req, res) => {
  try {
    db.deleteFeaturedProject(req.params.id);
    res.json({ success: true, message: 'Slide deleted successfully' });
  } catch (error) {
    console.error('Error deleting slide:', error);
    res.status(500).json({ success: false, message: 'Server error deleting slide' });
  }
});

// ----------------- BROCHURE PDF UPLOAD API -----------------
app.post('/api/upload-pdf', (req, res) => {
  try {
    const { filename, fileData } = req.body;
    if (!fileData) {
      return res.status(400).json({ success: false, message: 'No file data provided' });
    }

    const uploadDir = path.join(__dirname, 'public', 'uploads', 'brochures');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const baseName = (filename || 'brochure.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueFilename = `${Date.now()}_${baseName}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    const base64Content = fileData.includes('base64,') ? fileData.split('base64,')[1] : fileData;
    const buffer = Buffer.from(base64Content, 'base64');
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/brochures/${uniqueFilename}`;
    res.json({ success: true, message: 'PDF uploaded successfully', url: publicUrl });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ success: false, message: 'Failed to upload PDF' });
  }
});

// ----------------- ENQUIRIES / LEADS APIS -----------------

// Submit new enquiry (Public)
app.post('/api/enquiries', (req, res) => {
  try {
    const { name, phone, email, message, property_id, property_title } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone number are required' });
    }

    const id = db.createEnquiry({
      name,
      phone,
      email,
      message,
      property_id,
      property_title
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your viewing request has been recorded. Our agent will contact you shortly.',
      enquiryId: id
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({ success: false, message: 'Server error submitting enquiry' });
  }
});

// Get all enquiries (Admin)
app.get('/api/enquiries', (req, res) => {
  try {
    const { status } = req.query;
    const enquiries = db.getAllEnquiries(status);
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ success: false, message: 'Server error fetching enquiries' });
  }
});

// Update enquiry status (Admin)
app.patch('/api/enquiries/:id', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    db.updateEnquiryStatus(req.params.id, status);
    res.json({ success: true, message: `Enquiry status updated to ${status}` });
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    res.status(500).json({ success: false, message: 'Server error updating enquiry' });
  }
});

// Delete enquiry (Admin)
app.delete('/api/enquiries/:id', (req, res) => {
  try {
    db.deleteEnquiry(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ success: false, message: 'Server error deleting enquiry' });
  }
});

// ----------------- ANALYTICS & STATS APIS -----------------

app.get('/api/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Server error fetching stats' });
  }
});

// Admin Route (Private direct link only)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Fallback to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Vasati Properties Server is running at http://localhost:${PORT}`);
  console.log(`📊 Admin Panel directly accessible at http://localhost:${PORT}/admin`);
});
