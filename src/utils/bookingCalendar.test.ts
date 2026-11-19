import test from 'node:test';
import assert from 'node:assert/strict';
import { isPastCalendarDate, canNavigateToPrevMonth } from './bookingCalendar';

test('isPastCalendarDate handles past months, current month, and future months', () => {
  const ref = new Date(2026, 10, 19); // Nov 19, 2026

  // Past month & past year
  assert.equal(isPastCalendarDate(2026, 9, 25, ref), true);
  assert.equal(isPastCalendarDate(2025, 11, 31, ref), true);

  // Current month
  assert.equal(isPastCalendarDate(2026, 10, 18, ref), true);
  assert.equal(isPastCalendarDate(2026, 10, 19, ref), false);
  assert.equal(isPastCalendarDate(2026, 10, 20, ref), false);

  // Future month & future year
  assert.equal(isPastCalendarDate(2026, 11, 1, ref), false);
  assert.equal(isPastCalendarDate(2027, 0, 5, ref), false);
});

test('canNavigateToPrevMonth blocks navigating into past months', () => {
  const ref = new Date(2026, 10, 19); // Nov 2026

  assert.equal(canNavigateToPrevMonth(2026, 10, ref), false);
  assert.equal(canNavigateToPrevMonth(2026, 9, ref), false);
  assert.equal(canNavigateToPrevMonth(2026, 11, ref), true);
  assert.equal(canNavigateToPrevMonth(2027, 0, ref), true);
});
