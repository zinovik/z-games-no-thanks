import { NoThanks } from '../src';

test('create new game instance', () => {
  const noThanks = NoThanks.Instance;
  expect(noThanks).not.toBeNull();
  expect(noThanks).not.toBeUndefined();
});
