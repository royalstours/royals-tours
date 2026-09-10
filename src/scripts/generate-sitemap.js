const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..');

let fixedDepartures = [];
let featuredPackages = [];
try {
  const travelData = require(path.join(root, 'src', 'data', 'travelData.ts'));
  fixedDepartures = travelData.fixedDepartures || [];
  featuredPackages = travelData.featuredPackages || [];
} catch (e) {
  // If ts-node not loaded, read file with regex or fallback
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://royalstours.in";
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/packages', priority: '0.9', changefreq: 'daily' },
  { path: '/holiday', priority: '0.9', changefreq: 'daily' },
  { path: '/destinations', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.7', changefreq: 'weekly' },
  { path: '/faqs', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' }
];

const urls = new Map();

// 1. Static Pages
staticPages.forEach(p => {
  urls.set(`${baseUrl}${p.path}`, {
    loc: `${baseUrl}${p.path}`,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority
  });
});

// 2. Local Fallback Packages
featuredPackages.forEach(pkg => {
  if (pkg.id) {
    const loc = `${baseUrl}/packages/${pkg.id}`;
    urls.set(loc, {
      loc,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }
});

fixedDepartures.forEach(fd => {
  if (fd.id) {
    const pkgLoc = `${baseUrl}/packages/${fd.id}`;
    const destLoc = `${baseUrl}/destinations/${fd.id}`;
    urls.set(pkgLoc, {
      loc: pkgLoc,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    });
    urls.set(destLoc, {
      loc: destLoc,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }
});

async function run() {
  try {
    const envPath = path.join(root, '.env');
    if (fs.existsSync(envPath)) {
      const env = fs.readFileSync(envPath, 'utf8');
      const match = env.match(/MONGODB_URI=(.+)/);
      if (match) {
        const mongoose = require(path.join(root, 'node_modules', 'mongoose'));
        await mongoose.connect(match[1].trim(), { serverSelectionTimeoutMS: 2000 });
        const travelItems = await mongoose.connection.collection('travelitems').find({}).toArray();
        const holidayPackages = await mongoose.connection.collection('holidaypackages').find({}).toArray();

        travelItems.forEach(item => {
          const id = String(item.id || item._id);
          const lastmod = item.updatedAt ? new Date(item.updatedAt).toISOString().split('T')[0] : today;
          
          urls.set(`${baseUrl}/packages/${id}`, {
            loc: `${baseUrl}/packages/${id}`,
            lastmod,
            changefreq: 'weekly',
            priority: '0.8'
          });

          if (item.isFixedDeparture) {
            urls.set(`${baseUrl}/destinations/${id}`, {
              loc: `${baseUrl}/destinations/${id}`,
              lastmod,
              changefreq: 'weekly',
              priority: '0.8'
            });
          }
        });

        holidayPackages.forEach(item => {
          const id = String(item.id || item._id);
          const lastmod = item.updatedAt ? new Date(item.updatedAt).toISOString().split('T')[0] : today;
          
          urls.set(`${baseUrl}/packages/${id}`, {
            loc: `${baseUrl}/packages/${id}`,
            lastmod,
            changefreq: 'weekly',
            priority: '0.8'
          });
        });

        await mongoose.disconnect();
      }
    }
  } catch (err) {
    // Proceed with fallback
  }

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const [_, item] of urls) {
    xml += `  <url>\n`;
    xml += `    <loc>${item.loc}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml, 'utf8');
  console.log(`[SEO] Sitemap successfully written to public/sitemap.xml (${urls.size} URLs)`);
}

run();
