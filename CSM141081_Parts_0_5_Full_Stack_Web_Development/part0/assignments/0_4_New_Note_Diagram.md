```mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client: User posts note: animus

    Client->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Server-->>Client: 302 Found (Redirect to /notes)
    deactivate Server

    Client->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Client: 200 OK (notes document)
    deactivate Server

    Client->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Client: 200 OK (main.css)
    deactivate Server

    Client->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server-->>Client: 200 OK (main.js)
    deactivate Server

    Note over Client: JS fetches updated notes data

    Client->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json (XHR)
    activate Server
    Server-->>Client: 200 OK (data.json)
    deactivate Server
```