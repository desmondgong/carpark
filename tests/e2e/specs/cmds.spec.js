import TEST_CMDS from '../../test-data/e2eCmds';

describe('CMDs test', () => {
  const parkSize = 5;
  const elems = {
    cmdInput: '#cmd-input',
    execBtn: '#cmd-exec',
    parkUints: 'div.park-unit',
    report: '#report',
    tabCmd: '.tab-cmd',
  };
  beforeAll(() => {
    browser.get('/carpark');
  });

  it('should show carpark page with cmd tab.', () => {
    expect(element(by.css('.carpark-container')).isPresent()).toBe(true);
    const cmdTabElem = element(by.css(elems.tabCmd));
    cmdTabElem.click();
    expect(element(by.css('.cmd-controller')).isPresent()).toBe(true);
    expect(element(by.css('#cmd-input')).isPresent()).toBe(true);
  });

  describe('should display the correct buses in carpark, according to the cmds', () => {
    beforeEach(() => {
      browser.refresh();
      const cmdTabElem = element(by.css(elems.tabCmd));
      cmdTabElem.click();
    });
    TEST_CMDS.forEach(({ cmd = '', buses = [], report = '' }, i) => {
      it(`should passed according to CMD ${i + 1}`, () => {
        const cmdInputElem = element(by.css(elems.cmdInput));
        const execBtnElem = element(by.css(elems.execBtn));
        cmdInputElem.sendKeys(cmd);
        execBtnElem.click();
        const parkUnitElems = element.all(by.css(elems.parkUints));
        buses.forEach((bus) => {
          const index = bus.posX + ((parkSize - 1 - bus.posY) * parkSize);
          // TODO need to compare the bus id and direction once the bus display is finialized.
          expect(parkUnitElems.get(index).getAttribute('class')).toContain('bus');
        });
        const reportElem = element(by.css(elems.report));
        // TODO handle multiple reports
        expect(reportElem.getText()).toEqual(report);
      });
    });
  });
});
