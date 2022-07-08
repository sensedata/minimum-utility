Minimum viable replacement of react-router for apps using react-redux.

# Usage

```shell
npm add 'github:sensedata/minimum-utility'
```

```javascript
import {changeHandler} from "@minimum/utility";
```

# Components

Notes:

* All components supply their own CSS classes and accept additional classes via
`className`.

## ButtonConfirmable

First click swaps `props.children` for `confirmingMessage` and adds the CSS
class `confirming` to itself. Second click executes `onClick`, swaps back
`props.children` `confirmingMessage`, and removes the class. After
`confirmingTimeout`, does the same as a second click sans `onClick`;

Props and any defaults when undefined or null:

* `confirmingMessage: "Confirm"`
* `confirmingTimeout: 5000`
* `onClick` _optional, but pointless without.

Minimum use case:
```html
<ButtonConfirmable onClick={handleDelete}>
  Delete This
</ButtonConfirmable>
```

## ButtonCopy

Copies `props.text` to the clipboard and adds the CSS class `copied` to itself.
After `props.copiedTimeout`, removes the class.

Props and any defaults when undefined or null:

* `copiedTimeout: 3000`
* `text` _required, no default_

Minimum use case:
```html
<ButtonCopy text="Copy This!">
  Copy This
</ButtonCopy>
```

## InputValidatable

Presents an input with all `props` applied and
[`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninput)
and
[`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninvalid)
linked to
[`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/setCustomValidity).

When `onInvalid` fires, adds the CSS class `invalid`, calls
`setCustomValidity(props.invalidMessage)`, and then calls `props.onInvalid`.
When `onInput` fires, removes the class, calls `setCustomValidity("")`, and then
calls `props.onInput`.

Props and any defaults when undefined or null:

* `copiedTimeout: 3000`
* `text` _required, no default_

Minimum use case:
```html
<ButtonCopy text="Copy This!">
  Copy This
</ButtonCopy>
```

# Functions

## changeHandler

```javascript
function changeHandler(setStateItem, setState, event)
```

Calls `setStateItem` with the `stateItem` object merged with an object composed
from `event.target`'s name and value. It's meant to be used with React's
[`useState` hook](https://reactjs.org/docs/hooks-state.html).

_Curried for separation of state closure from listener binding._

Minimum use case:

```javascript
  let [user, setUser] = useState({name: "Jane", email: "jane@doe.example"})
  let handleChange = changeHandler(setUser, user) // curried and now accepting (event)

  return (
    <input name="email" onChange={handleChange} value={user.email}/>
  )

  // when onChange fires, handleChange calls setUser({name: "Jane", email: input.value})
```

## submitStopper

```javascript
function submitStopper(onSubmit)
```

Merely precedes calling the given `onSubmit` function with calls to
[`preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
and
[`stopPropagation`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).
Meant to be used on `<form>` elements to allow making use of standard submits
without the standard behaviors.

Minimum use case:

```javascript
  let handleSubmit = (event) => {console.debug("submitted", event)}

  return (
    <form onSubmit={submitStopper(handleSubmit)}>
  )
```
