const isClass = (_) => `${_}`.split(/\s/)[0] === 'class';
const getName = (_) => _.name;

const DEPS = new Map();
const INSTS = new Map();

export default function DependencyRegistry(...registrations) {
  registrations.forEach((registration) => register(...registration));

  return {
    register,
    create,
    remove,
    deregister,
  };

  function register(instantiator, instArgs) {
    const ref = getName(instantiator);

    if (DEPS.has(ref)) {
      throw ReferenceError(
        `An instantiator has already been registered for ${ref}`
      );
    }
    DEPS.set(
      ref,
      isClass(instantiator) ? (args) => new instantiator(args) : instantiator
    );
    if (instArgs) {
      INSTS.set(ref, DEPS.get(ref)(...instArgs));
    }
  }

  function create(instantiator, instRef, ...instArgs) {
    const ref = getName(instantiator);

    if (!DEPS.has(ref)) {
      throw ReferenceError(`No instantiator registered for ${ref}`);
    }

    if (instRef) {
      if (INSTS.has(instRef)) {
        if (!instArgs) return INSTS.get(instRef);
        throw ReferenceError(`No instantiance found for singleton ${ref}`);
      }
      INSTS.set(instRef, DEPS.get(ref)(...instArgs));
      return INSTS.get(instRef);
    } else {
      if (INSTS.has(ref)) {
        return INSTS.get(ref);
      }
      throw ReferenceError(`No instantiance found for singleton ${ref}`);
    }
  }

  function remove(instRef) {
    if (!INSTS.has(instRef)) {
      throw ReferenceError(`No instantiator registered as ${instRef}`);
    }
    INSTS.delete(instRef);
  }

  function deregister() {
    DEPS.clear();
    INSTS.clear();
  }
}

export function getInternalStores() {
  return {
    DEPS,
    INSTS,
  };
}
