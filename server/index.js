const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' })); // Allows the React app to talk to this server
app.use(express.json());

const checkKeys = () => {
    const keys = ['RENDER_API_KEY', 'VERCEL_TOKEN', 'NETLIFY_TOKEN', 'AIVEN_TOKEN'];
    keys.forEach(key => {
        if (!process.env[key]) console.warn(`⚠️ Warning: ${key} is not defined in .env`);
    });
};
checkKeys();

// 1. Test Route 
app.get('/', (req, res) => res.send('MCM Backend is running! 🚀'));

// 2. Render
app.get('/api/render/services', async(req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: { 'Authorization': `Bearer ${process.env.RENDER_API_KEY}` }
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({error: 'Render fetch failed!'});
    }
});

// 3. Vercel 
app.get('/api/vercel/projects', async (req, res) => {
    try {
        const response = await axios.get('https://api.vercel.com/v9/projects', {
            headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` }
        });
        res.json(response.data.projects);
    }
    catch (error){
        res.status(500).json({ error: 'Vercel fetch failed!' });
    }
});

// 4. Netlify 
app.get('/api/netlify/sites', async (req, res) => {
    try {
        const response = await axios.get('https://api.netlify.com/api/v1/sites', {
            headers: { 'Authorization': `Bearer ${process.env.NETLIFY_TOKEN}` }
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Netlify fetch failed!' });
    }
});

// 5. Aiven
app.get('/api/aiven/all-services', async (req, res) => {
    try {
        // 1. Get all projects linked to your token
        const projectRes = await axios.get('https://api.aiven.io/v1/project', {
            headers: { 'Authorization': `Bearer ${process.env.AIVEN_TOKEN}` }
        });
        
        const projects = projectRes.data.projects; // Array of projects

        // 2. Fetch services for EVERY project at the same time
        const allServicesRequests = projects.map(proj => 
            axios.get(`https://api.aiven.io/v1/project/${proj.project_name}/service`, {
                headers: { 'Authorization': `Bearer ${process.env.AIVEN_TOKEN}` }
            })
        );

        const responses = await Promise.allSettled(allServicesRequests);
        
        // 3. Combine all services into one master list
        const allServices = responses
            .filter(r => r.status === 'fulfilled')
            .flatMap(r => r.value.data.services);
        
        res.json(allServices);
    } catch (error) {
        res.status(500).json({ error: 'Aiven.io fetch failed' });
    }
});

// Adding '0.0.0.0' tells the server to accept connections from any IP on your Wi-Fi
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✅ MCM Backend Active on:`);
    console.log(`- Local:   http://localhost:${PORT}`);
    console.log(`- Network: http://10.137.114.76:${PORT}`);
});