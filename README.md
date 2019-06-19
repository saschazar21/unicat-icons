# :unicorn: :cat2: Unicat icons

> a collection of `.svg` icons for [React](https://reactjs.org/), [React Native](https://facebook.github.io/react-native/) and [react-sketchapp](http://airbnb.io/react-sketchapp/) with **TypeScript** support.

## Prerequisites

* [React](https://www.npmjs.com/package/react) v16.8 and up, or
* [React Native](https://www.npmjs.com/package/react-native) v59.9 and up, or
* [react-sketchapp](https://www.npmjs.com/package/react-sketchapp) v3.0.0-beta.9 and up
* optionally a working [TypeScript](https://www.npmjs.com/package/typescript) setup

(of course a [Next.js](https://nextjs.org) also works, when using React for the web)

## Install

`npm install @saschazar/unicat-icons` or `yarn add @saschazar/unicat-icons` respectively.

## Usage

### React (default)

```jsx
import { KeyIcon } from '@saschazar/unicat-icons';

export default function () {
  return <h1>A Headline with a key icon <KeyIcon /></h1>;
}
```

### React Native

```jsx
import { Text, View } from 'react-native';
import { KeyIcon } from '@saschazar/unicat-icons/native';

export default function () {
  return (
    <View>
      <Text>A Text with a key icon <KeyIcon /></Text>
    </View>
  );
}
```

### react-sketchapp

```jsx
import { Artboard, Text } from 'react-sketchapp';
import { KeyIcon } from '@saschazar/unicat-icons/sketchapp';

export default function () {
  return (
    <Artboard>
      <Text>A Text with a key icon <KeyIcon /></Text>
    </Artboard>
  );
}
```

## License

MIT
