import test from 'node:test';
import assert from 'node:assert/strict';
import { extractTriageUpdates, mapPestToServiceId, TriageExtractionState } from './triageLogic';

const emptyState: TriageExtractionState = {
  pest: null,
  propertyType: null,
  suburb: null,
  fullName: null,
  phone: null,
  email: null,
};

test('extractTriageUpdates detects residential kitchen cockroaches without forcing Commercial', () => {
  const updates = extractTriageUpdates('Cockroaches in my kitchen', emptyState);
  assert.equal(updates.pest, 'Cockroaches');
  assert.equal(updates.propertyType, undefined);
});

test('extractTriageUpdates avoids false-positive fullName extraction on non-name phrases', () => {
  const urgent = extractTriageUpdates('This is urgent, we have rats in Camps Bay', emptyState);
  assert.equal(urgent.fullName, undefined);
  assert.equal(urgent.pest, 'Rats & Rodents');
  assert.equal(urgent.suburb, 'Camps Bay');

  const inSuburb = extractTriageUpdates('I am in Rondebosch', emptyState);
  assert.equal(inSuburb.fullName, undefined);
  assert.equal(inSuburb.suburb, 'Rondebosch');
});

test('extractTriageUpdates parses "Sarah, 082 123 4567" and "My name is Thabo Mokoena"', () => {
  const commaFormat = extractTriageUpdates('Sarah, 082 123 4567', emptyState);
  assert.equal(commaFormat.fullName, 'Sarah');
  assert.equal(commaFormat.phone, '0821234567');

  const introFormat = extractTriageUpdates('My name is Thabo Mokoena and my number is +27 82 555 1234', emptyState);
  assert.equal(introFormat.fullName, 'Thabo Mokoena');
  assert.equal(introFormat.phone, '+27825551234');
});

test('mapPestToServiceId always maps to valid SERVICES_DATA IDs', () => {
  const validIds = new Set([
    'cockroaches',
    'ants',
    'rats-mice',
    'mole-treatment',
    'bedbugs-fleas',
    'bird-proofing',
    'bat-removal',
  ]);
  for (const pest of ['Cockroaches', 'Ants', 'Rats & Rodents', 'Mole Treatment', 'Bed Bugs & Fleas', 'Bird Proofing', 'Bat Removal', 'Wasps & Bees', null]) {
    assert.equal(validIds.has(mapPestToServiceId(pest)), true);
  }
});
