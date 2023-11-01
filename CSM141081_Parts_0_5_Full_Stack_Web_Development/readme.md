## Notes

### JS material 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview
- https://github.com/getify/You-Dont-Know-JS
- https://javascript.info/
- https://eloquentjavascript.net/
- https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP
- https://egghead.io/courses/react-with-class-components-fundamentals-4351f8bb
- https://egghead.io/courses/the-beginner-s-guide-to-react
- https://github.com/getify/You-Dont-Know-JS/tree/1st-ed

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors 

### installing react applcation through vite 

```cmd
npm create vite@latest part --template react
cd part1
npm install
```

```cmd
npm run dev 
```

### constructing classes in js

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const janja = new Person('Janja Garnbret', 23)
janja.greet()
```


# React 

## Component state, event handlers

### Object spread 
```js
const handleLeftClick = () => {
  const newClicks = { 
    ...clicks, 
    left: clicks.left + 1 
  }
  setClicks(newClicks)
}

const handleRightClick = () => {
  const newClicks = { 
    ...clicks, 
    right: clicks.right + 1 
  }
  setClicks(newClicks)
}
```

or 

```js
    const handleLeftClick = () =>
    setClicks({ ...clicks, left: clicks.left + 1 })
  
    const handleRightClick = () =>
        setClicks({ ...clicks, right: clicks.right + 1 })
```

### handling arrays 

```js

const array = [{name:'funny', id:12}]


// Find in array 
const note = array.find(n=> n.id===id)

// map array 
notes.map(note => note.id !== id ? note : response.data)
```

### Creating new objects 

```js
const changedNote = { ...note, important: !note.important }
```

### Removing from list 

```js
notes.filter(n => n.id !== id)
```