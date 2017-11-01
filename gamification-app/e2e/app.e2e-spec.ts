import { GamificationAppPage } from './app.po';

describe('gamification-app App', function() {
  let page: GamificationAppPage;

  beforeEach(() => {
    page = new GamificationAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
