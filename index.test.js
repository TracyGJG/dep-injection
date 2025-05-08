import { describe, it, mock, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';

import DEPS_REGISTRY, { SINGLETON } from './index.js';

describe('DEPS REGISTRY', () => {
  describe('SINGLETON', () => {
    it('defaults to true', () => {
      assert.strictEqual(SINGLETON, true);
    });
  });

  describe('registry', () => {
    let depsRegistry = null;

    beforeEach(() => {
      depsRegistry = DEPS_REGISTRY();
    });

    afterEach(() => {
      depsRegistry.delete();
    });

    it('can be instantiated', () => {
      assert.notStrictEqual(depsRegistry, undefined);
    });

    it('throws an exception when there is nothing to clear', () => {
      try {
        depsRegistry.clear('exception');
      } catch (error) {
        assert.strictEqual(error instanceof ReferenceError, true);
        assert.strictEqual(
          error.message,
          'No instantiator registered as exception'
        );
      }
    });

    it('throws an exception when there is nothing to get', () => {
      try {
        depsRegistry.get('exception');
      } catch (error) {
        assert.strictEqual(error instanceof ReferenceError, true);
        assert.strictEqual(
          error.message,
          'No instantiator registered for exception'
        );
      }
    });

    describe('Using a ES6 Class', () => {
      class Greeter {
        constructor() {
          this.welcome = 'Hi';
        }
        greet(person) {
          return `${this.welcome} ${person}`;
        }
      }

      it('can be registered, retreived and cleared (singleton)', () => {
        depsRegistry.set('instanceName', Greeter, SINGLETON);
        const instance1 = depsRegistry.get('instanceName');
        const instance2 = depsRegistry.get('instanceName');
        assert.strictEqual(instance1, instance2);
      });

      it('can be registered, retreived and cleared', () => {
        depsRegistry.set('instanceName', Greeter);
        const instance1 = depsRegistry.get('instanceName');
        assert.notStrictEqual(instance1, null);
        depsRegistry.clear('instanceName');
      });
    });

    describe('Using a Factory function', () => {
      function Greeter(welcome) {
        return {
          greet(person) {
            return `${welcome} ${person}`;
          },
        };
      }

      it('can be registered, retreived and cleared (singleton)', () => {
        depsRegistry.set('instanceName', Greeter, SINGLETON);
        const instance1 = depsRegistry.get('instanceName');
        const instance2 = depsRegistry.get('instanceName');
        assert.strictEqual(instance1, instance2);
      });

      it('can be registered, retreived and cleared', () => {
        depsRegistry.set('instanceName', Greeter);
        const instance1 = depsRegistry.get('instanceName');

        assert.notStrictEqual(instance1, null);
        depsRegistry.clear('instanceName');
      });
    });
  });
});
