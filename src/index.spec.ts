import { helloWorld } from './index';

it('should return hello world msg', () => {
  expect(helloWorld()).toBe('Hello world!');
});