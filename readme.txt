Deployment & Ad integration notes

1. To deploy:
   - Upload the folder to GitHub and enable Pages, or drag to Netlify for instant hosting.
   - Ensure paths remain: index.html, project1.html, project2.html, project3.html, assets/styles.css, assets/scripts.js

2. Adding ads:
   - Replace the inner HTML of elements with IDs: header-ad, reel-ad, contact-ad, footer-ad, case-ad with your ad provider script.
   - Example (Google AdSense responsive unit):
     <div class="ad-slot">YOUR AD CODE HERE</div>
   - Do not place ads inside modal overlays or in ways that violate provider policies.

3. Replacing content:
   - Change placeholder images (picsum) to your own CDN-hosted images for performance.
   - Update YouTube playlist IDs and Instagram links to real accounts.

4. Accessibility & privacy:
   - Add a GDPR consent banner if serving EU users before loading personalized ads.
   - Add analytics script in index.html head/footer as needed.

5. Extending:
   - Duplicate project1.html to create more case studies; update titles and images.
   - For dynamic sites, convert to a static site generator (Hugo/Eleventy) or a small CMS.
