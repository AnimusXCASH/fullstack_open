### Part2 code 

- https://github.com/fullstack-hy2020/part2-notes-frontend/tree/part2-1 

### Making json dev server 

https://github.com/typicode/json-server

After installing run the following command to run the json-server. The json-server starts running on port 3000 by default; we will now define an alternate port 3001, for the json-server. The --watch option automatically looks for any saved changes to db.json

json-server --port 3001 --watch db.jsoncopy
However, a global installation is not necessary. From the root directory of your app, we can run the json-server using the command npx:

npx json-server --port 3001 --watch db.jsoncopy
Let's navigate to the address http://localhost:3001/notes in the browser. We can see that json-server serves the notes we previously wrote to the file in JSON format:

  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "server": "json-server -p3001 --watch db.json"
  },
  
  than use npm run server

// TODO Conytinues https://fullstackopen.com/en/part2/getting_data_from_server#the-browser-as-a-runtime-environment

json-server --port 3001 --watch db.json


### Axios and promises notes

```js
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```

<!-- get methor -->
```js
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```

<!-- put method -->
```js
axios.put(url, changedNote).then(response => {
  setNotes(notes.map(note => note.id !== id ? note : response.data))
})
```


<!-- ostal 
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors

 -->