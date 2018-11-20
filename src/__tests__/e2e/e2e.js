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
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    const url = page.url();
    expect(url).toBe('http://localhost:3000/home');
  });
});
