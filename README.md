# useMemo-demonstration
This explains why we need `useMemo` hook and how it works.

#### 1. In this code base, we have two counter with two different state.

```
import "./App.css";
import { useState} from "react";

export default function App() {
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);

  const handleCountOne = () => {
    setCountOne(countOne + 1);
  };

  const handleCountTwo = () => {
    setCountTwo(countTwo + 1);
  };

  return (
    <div className="App">
      <div className="mb">
        <button onClick={handleCountOne}>CountOne - {countOne}</button>
      </div>

      <div>
        <button onClick={handleCountTwo}>CountTwo - {countTwo}</button>
      </div>
    </div>
  );
}
```

#### 2. For the 1st counter `CountOne`, we have added a function `isEven` which checks for countOne is even or odd.

```
export default function App() {
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);

  const handleCountOne = () => {
    setCountOne(countOne + 1);
  };

  const handleCountTwo = () => {
    setCountTwo(countTwo + 1);
  };

  + const isEven = () => {
  +  let i = 0;
  +  while (i < 200000000) i++;
  +  return countOne % 2 === 0;
  + };

  return (
    <div className="App">
      <div className="mb">
        <button onClick={handleCountOne}>CountOne - {countOne}</button>
   +      &nbsp; {isEven ? "Even" : "Odd"}
      </div>

      <div>
        <button onClick={handleCountTwo}>CountTwo - {countTwo}</button>
      </div>
    </div>
  );
}
```

#### 3. In the real world scenario, sometimes, any function can take considerable amount of time. So, let's induce some slowness into `isEven`.

#### 4. Now, we find that there is some delay in UI update of `CountOne`. That is ovious because of that iterations.

#### 5. However, we also find that UI update of `CountTwo` is also slow. The reason is everytimes the state updates, the component re-renders, which result in execution of `isEven` function which is quite expensive computationally.

#### 6. So, we have to optimize these re-renders when `countTwo` state update. This is where `useMemo` comes into picture.

```
+ import { useState, useMemo } from "react";

export default function App() {
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);

  const handleCountOne = () => {
    setCountOne(countOne + 1);
  };

  const handleCountTwo = () => {
    setCountTwo(countTwo + 1);
  };

 + const isEven = useMemo(() => {
 +  let i = 0;
 +   while (i < 200000000) i++;
 +   return countOne % 2 === 0;
 + }, [countOne]);

  return (
    <div className="App">
      <div className="mb">
        <button onClick={handleCountOne}>CountOne - {countOne}</button>
        &nbsp; {isEven ? "Even" : "Odd"}
      </div>

      <div>
        <button onClick={handleCountTwo}>CountTwo - {countTwo}</button>
      </div>
    </div>
  );
}

```

#### 7. `useMemo` recompute the cached value only when one of the its dependecies has changed.

#### 8. After binding the `isEven` function with `useMemo`, we have prevented the invocation `isEven` func when we update `CountTwo`.

