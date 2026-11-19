import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, escapeHtml } from './validation';

test('validateContactForm catches invalid name, email, and phone', () => {
  const invalid = validateContactForm({
    fullName: 'A',
    email: 'not-an-email',
    phone: '123',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);

  const valid = validateContactForm({
    fullName: 'Sarah Jenkins',
    email: 'sarah@domain.co.za',
    phone: '082 555 1234',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('escapeHtml neutralizes HTML injection characters', () => {
  assert.equal(
    escapeHtml('<script>alert("xss")</script> & \'test\''),
    '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#39;test&#39;'
  );
});
