import { ServerAPI } from './ServerAPI';

test('ServerAPI is singleton', () => {
  const firstInstance = ServerAPI.getInstance();
  const secondInstance = ServerAPI.getInstance();
  expect(firstInstance).toBe(secondInstance);
});
