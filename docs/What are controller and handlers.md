# Controller

They are singleton classes; They provided a way for a centralized control. They allow the UI to be separate from the app logic, while the UI provides some dependencies which the UI satisfies for the working of the app logic. These are the `dependencies`.

These dependencies are not set in the constructor of the controller class, because the dependencies are available at various point in the UI so a generalizing is not possible. Because of this they manually set at the available place of the dependency.

## Handlers

They are not a general class, they are used by a specific controller class for offloading the total code size. They are used for a specific task, and they are not meant to be used by any other controller class other than the one they are intended for. They are created inside the controller class that needs them;
The main purpose of the handlers is to offload the code size of the controller class and makes the controller class easier to read, and to provide a way to separate the code into different files.

This example shows the purpose of handler class;

```typescript
class SomeController {

	namespace1: {
		fn1: () => void;
		fn2: () => void;
	}

	namespace2: {
		fn1: () => void;
		fn2: () => void;
	}
}
```

This controller controller controller something, the functionality is split into different namespaces for better hierarchy. But as the functionality grows the code size of the controller class grows too. This is where the handlers come in;

```typescript
class SomeController {
	namespace1: Namespace1Handler;
	namespace2: Namespace2Handler;

	constructor() {
		namespace1 = new Namespace1Handler();
		namespace2 = new Namespace2Handler();
	}
}

class Namespace1Handler {
	fn1: () => void;
	fn2: () => void;
}

class Namespace2Handler {
	fn1: () => void;
	fn2: () => void;
}
```

These `Namespace1Handler` and `Namespace2Handler` could be in different files. Thus providing a way to separate the code into different files. And offer more readability to the controller class.