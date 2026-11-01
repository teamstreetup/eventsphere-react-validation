import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function capture() {
  const executablePath = CHROME_PATH;
  console.log('Launching browser with:', executablePath);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  const url = 'https://teamstreetup.github.io/eventsphere-react-validation/';
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // 1. Figure 1: Landing Page
  const fig1Path = path.join(__dirname, 'fig1_landing.png');
  await page.screenshot({ path: fig1Path });
  console.log('Saved:', fig1Path);

  // 2. Figure 2: Validation Errors (Click "Test Error States" button)
  // Look for button with text "Test Error States"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const testErrBtn = buttons.find(b => b.textContent.includes('Test Error States'));
    if (testErrBtn) testErrBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const fig2Path = path.join(__dirname, 'fig2_validation_errors.png');
  await page.screenshot({ path: fig2Path });
  console.log('Saved:', fig2Path);

  // 3. Figure 3: Valid State & Digital Pass Modal (Click "Fill Valid Data" and submit)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const validBtn = buttons.find(b => b.textContent.includes('Fill Valid Data'));
    if (validBtn) validBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Navigate to Step 4 and submit
  // Click step 4 button or advance
  await page.evaluate(() => {
    // Step indicator button for step 4
    const stepButtons = Array.from(document.querySelectorAll('.step-item'));
    if (stepButtons[3]) {
      stepButtons[3].click();
    }
  });
  await new Promise(r => setTimeout(r, 500));

  // Submit form
  await page.evaluate(() => {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const fig3Path = path.join(__dirname, 'fig3_success_pass.png');
  await page.screenshot({ path: fig3Path });
  console.log('Saved:', fig3Path);

  // Close modal if open
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 4. Figure 4: Confirmed Attendees Directory
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.nav-tab-btn'));
    const attTab = tabs.find(t => t.textContent.includes('Confirmed Attendees'));
    if (attTab) attTab.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const fig4Path = path.join(__dirname, 'fig4_attendees_list.png');
  await page.screenshot({ path: fig4Path });
  console.log('Saved:', fig4Path);

  // 5. Figure 5: Validation Architecture Guide
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.nav-tab-btn'));
    const guideTab = tabs.find(t => t.textContent.includes('Validation Architecture'));
    if (guideTab) guideTab.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const fig5Path = path.join(__dirname, 'fig5_validation_guide.png');
  await page.screenshot({ path: fig5Path });
  console.log('Saved:', fig5Path);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});

