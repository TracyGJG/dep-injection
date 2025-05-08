export default function DependencyRegistry() {
  const DEPS = new Map();
  const INSTS = new Map();

  return {
    set(ref, instantiator, isSingleton = false) {
      const _instance = new instantiator();
      DEPS.set(ref, {
        isSingleton,
        createInstance(...args) {
          return _instance instanceof instantiator
            ? new instantiator(...args)
            : instantiator(...args);
        },
      });
    },
    get(ref, ...args) {
      if (!DEPS.has(ref)) {
        throw ReferenceError(`No instantiator registered for ${ref}`);
      }
      const { isSingleton, createInstance } = DEPS.get(ref);
      const _instRef = isSingleton ? `${ref}_SINGLETON` : ref;

      if (!INSTS.has(_instRef)) {
        INSTS.set(_instRef, createInstance(...args));
      }
      return INSTS.get(_instRef);
    },
    clear(instRef) {
      if (!INSTS.has(instRef)) {
        throw ReferenceError(`No instantiator registered as ${instRef}`);
      }
      INSTS.delete(instRef);
    },
    delete() {
      DEPS.clear();
      INSTS.clear();
    },
  };
}

export const SINGLETON = true;
