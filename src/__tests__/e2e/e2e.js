jest.setTimeout(30000);

describe('Login user', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should log the user correctly', async () => {
    await page.click('input#name');
    await page.keyboard.type('admin');
    await page.click('input#psw');
    await page.keyboard.type('pass');
    await Promise.all([
      page.click('button#sub'),
      page.waitForNavigation({waitUntil: 'load'}),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    const url = page.url();
    expect(url).toBe('http://localhost:3000/home');
  });
});

describe('Project creation successful', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/home');
  });

  it('should log the user correctly', async () => {
    await Promise.all([
      page.click('a#createProject'),
      page.waitForNavigation({waitUntil: 'load'}),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    await page.click('input#name');
    await page.keyboard.type('Mon projet');
    await Promise.all([
      page.click('button#sendProject'),
      page.waitForNavigation({waitUntil: 'load'}),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    const url = page.url();
    expect(url).toBe('http://localhost:3000/project/add');
  });
});

describe('Sprint creation successful', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/home');
  });

  it('should log the user correctly', async () => {
    await Promise.all([
      page.click('a#createSprint'),
      page.waitForNavigation({waitUntil: 'load'}),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    await page.click('input#name');
    await page.keyboard.type('Mon sprint');
    await page.click('input#projectId');
    await page.keyboard.type('1');
    await Promise.all([
      page.click('button#sendSprint'),
      page.waitForNavigation({waitUntil: 'load'}),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    const url = page.url();
    expect(url).toBe('http://localhost:3000/sprint/add');
  });
});
