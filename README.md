# Titanium-Flux
PoC App for Flux architecture within Titanium+Alloy Projects.

## Table of Contents.

<!-- MarkdownTOC autolink=true depth=2 bracket=round -->

- [Running the app](#running-the-app)
- [Core Flux components](#core-flux-components)
	- [Dispatcher.](#dispatcher)
	- [Stores.](#stores)
	- [Actions.](#actions)
	- [Views.](#views)

<!-- /MarkdownTOC -->


## Running the app

Use the same steps as any other Titanium+Alloy app:

```bash
# Optional: Compile alloy to generate the plug-in.
$ alloy compile --config platform=[ios|android]

# Run the app in simulator
$ [appc] ti build -p [ios|android]
```

## Core Flux components
This projects aims to move away from the MVC architecture and use [Flux](https://facebook.github.io/flux/) instead. Refer to Facebook's site and its [examples](https://github.com/facebook/flux/tree/master/examples) to learn more about it.

Some new rules that must take place in order to not break the architecture are:

### Dispatcher.
This is the main mediator between the Actions and Stores, all actions **must** be dispatched and the dispatcher will be in charge of sending them to the different stores in the app.

- **Should** live under `app/lib/utils/dispatcher`.

- There **must not** be more than 1 dispatcher living in the app.

- **Should** be a singleton instance.

### Stores.
Each one contains a representation (as a plain JS Object) of one part of the app.

- All stores **should** live under `app/lib/stores/`.

- All stores **should** contain `app/lib/utils/store` as it's composed parent.

- All stores **should** be singleton instances.

- Any change to a store's inner state **must** be done through an action in the dispatcher. Altering the store's state by using private or public or private functions is forbidden.

- All business rules and functionality that is not UI/UX related **must** live in the stores.

### Actions.
Plain JS Object that represent the idea of a change in one or more stores.

- All actions **should** live under `app/lib/actions/`.

- All actions **could** be grouped by stores, screens or a single singleton with all the app's actions. Just make sure you follow the project's spec.

- All actions **should** be singleton instances.

- Actions **should not** include references to the stores directly.

- All actions **must** be invoked from a file inside the `actions/` folder.

	```javascript
	// Avoid

	// Controller.js
	$.someButton.addEventListener('click', function(_evt) {
		Dispatcher.dispatch({
			type: 'SOME_BUTTON_CLICK',
			tag: _evt.source.tag
		});
	});
	```

	```javascript
	// Use instead

	// Controller.js
	$.someButton.addEventListener('click', function(_evt) {
		Actions.buttonClick(_evt.source.tag);
	});

	// actions/actions.js
	function buttonClick(_tag) {
		Dispatcher.dispatch({
			type: 'SOME_BUTTON_CLICK',
			tag: _tag
		});
	}
	```

### Views.
Regular Alloy Controllers that serve as mediators for the changes in the stores and updates in the UI components they declare. Not all Controller should be linked with stores or the dispatcher, but only those that will handle a whole screen or **"Containers"**.

- All Containers **should** include a `Ti.UI.Window` or equivalent as the top-level container.

- All Controllers **must** declare a `render(_props)` function where all UI updates should be declared.

- All UI updates **must** live in the `render(_props)` function or a private function called from it.

- All UI updates that don't require an action to trigger (i.e UI/UX workarounds, cosmetic changes) **must** be declared using `container.setState()`.