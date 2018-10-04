import { Selector, ClientFunction } from 'testcafe';

fixture `Test all jmlevick page`
    .page `https://jmlevick.me/`
    .beforeEach(async (t) => {
        t.ctx = {
            // superior tabs.
            tab1: Selector('a#nav0.myhref'),
            tab2: Selector('a#nav1.myhref'),
            tab3: Selector('a#nav2.myhref'),
            tab4: Selector('a#nav3.myhref'),
            tab5: Selector('a#nav4.myhref'),
            // icons about section.
            ico1: Selector('.iconset > i.phone-icon'),
            ico2: Selector('.iconset > i.email-icon'),
            ico3: Selector('.linkedin-icon'),
            ico4: Selector('.github-icon'),
            ico5: Selector('.twitter-icon'),
            ico6: Selector('.iconset > i.skype-icon'),
            ico7: Selector('.telegram-icon'),
            icoClose: Selector('.box-element-close'),
            // form section.
            scheduleBtn: Selector('button.calendar-btn.button-primary'),
            inputName: Selector('input[name=name]'),
            inputEmail: Selector('input[name=email]'),
            iconCalendar: Selector('span.ui-button-icon-left.ui-c.fa.fa-fw.fa-calendar'),
            calendarDay: Selector('.ui-datepicker-calendar > tbody > tr:nth-child(3) > td:nth-child(4)'),
            slcTime: Selector('select[name=time]'),
            txtAreaReason: Selector('textarea[name=reason]'),
            btnSubmit: Selector('button[type=submit]'),
        };
    });

test('should can enter a valid full name.', async t => {
    const { scheduleBtn:btn, inputName:name } = t.ctx;

    await t
        .hover(btn)
        .click(btn)
        .typeText(name, 'Carlos Agustín Lima Aceves', {replace: true})
        .expect(name.value).eql('Carlos Agustín Lima Aceves', 'The input value name is not the same');
});

test('should create complete form from scheduel call modal.', async t => {
    const { scheduleBtn, inputName, inputEmail, iconCalendar, calendarDay,
        slcTime, txtAreaReason, btnSubmit } = t.ctx;
    const slcTimeOption = slcTime.find('option');

    await t
        .click(scheduleBtn)
        .typeText(inputName, 'Carlos Agustín Lima Aceves')
        .typeText(inputEmail, 'carlos.lima@artisanwise.tech')
        .click(iconCalendar)
        .click(calendarDay)
        .click(slcTime)
        .click(slcTimeOption.withText('19:00 - 20:00'))
        .expect(slcTimeOption.value).eql('0: 15:00', 'Incorrect time selection.')
        .typeText(txtAreaReason, 'I\'m your friend for testing.')
        .click(btnSubmit);
});

test('should press all tabs and goes to correct section.', async (t) => {
    const { tab1, tab2, tab3, tab4, tab5 } = t.ctx;
    const speed = { speed: 0.2 };

    await t
        .click(tab1, speed)
        .click(tab2, speed)
        .click(tab3, speed)
        .click(tab4, speed)
        .click(tab5, speed);
});

test('should be open link on tab "About"', async t => {
    const { tab1, ico1, ico2, ico3, ico4, ico5, ico6, ico7, icoClose } = t.ctx;
    const goBack = ClientFunction(() => window.history.back());
    const speed = { speed: 0.5 };

    await t
        .click(tab1)
        .click(ico1, speed)
        .click(icoClose)
        .click(ico2, speed)
        .click(icoClose)
        .click(ico3);
    await goBack();
    await t.click(ico4);
    await goBack();
    await t.click(ico5);
    await goBack();
    await t
        .click(ico6)
        .click(icoClose);
    await t.click(ico7);
    await goBack();
});
