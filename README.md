# dep-injection

Implementation of a Dependency Injection (DI) mechanism to support the Dependency Inversion principle.

This module exports two items:

- DependencyRegistry: is the default export and is a factory function to create a mechanism for managing Dependencies.
- SINGLETON: is a constant of the value (true) used as the optional thrid argument.

The DependencyRegistry factory function employs the [Revealing Module Pattern](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s03.html) to expose four methods for manipulating dependencies. Internally the function maintains two maps, one for dependency constructors and the other for actual dependency instances. Dependency constructors can be either JS Classes or Factory function.

## add(ref, instantiator, isSingleton = false)

### Parameters

- ref: A reference to an instantiator (Class or Factory function).
- instantiator: An instantiator to be used to create new obejcts.
- isSingleton: An optional Boolean parameter indicating if the instantiator is to be used to create a singleton or not.

### Return

None.

## get(ref, ...args)

### Parameters

- ref:
- args:

### Exceptions

- ReferenceError: When there is no instantiator registered for the given instance reference.

### Return

## remove(instRef)

Releases the specified instance from the DI mechanism.

### Parameters

- instRef: Reference to an instance that is to be released from the DI mechanism.

### Exceptions

- ReferenceError: When there is no instantiator registered for the given instance reference.

### Return

None.

## clear()

Releases all instatiators and instances retained by the DI mechanism.

### Parameters

None.

### Return

None.

Thoughts

1. Singleton objects are not limited or controlled properly.
2. Need to be able remove instantiators and delete instances from the registry.
3. Need to control the instantiator reference name - should not start with an underscore.

If an instantiator is to be a singleton, prefix underscore to the instantiator reference.
When instantiating:
If instantiator reference found, create a fresh instance and return it.
If \_instantiator reference found,
If instance exists, return it.
If instance does not exist

add(instantiatorName, instantiator)
get(instantiatorName, instanceName?) - no instanceName, treat as singleton.
del(instanceName) - not applicable to singletons.
remove(instantiatorName) - If no instances, delete instantiator.
clear() - drop all instances and instantiators.
