import { Selector } from 'testcafe';

fixture `Make the form schedule a call`
  .page `https://jmlevick.me/`
  .beforeEach(async (t) => {
    t.ctx = {
      scheduleBtn: Selector('button.calendar-btn.button-primary'),
      inputName: Selector('input[name=name]'),
      inputEmail: Selector('input[name=email]'),
      iconCalendar: Selector('span.ui-button-icon-left.ui-c.fa.fa-fw.fa-calendar'),
      calendarDay: Selector('.ui-datepicker-calendar > tbody > tr:nth-child(3) > td:nth-child(4)'),
      slcTime: Selector('select[name=time]'),
      txtAreaReason: Selector('textarea[name=reason]'),
      btnSubmit: Selector('button[type=submit]'),
    }
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
})