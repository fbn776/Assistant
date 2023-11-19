# Assistant ✨

The Assistant is a personal project for learning and experimenting with `typescript`. The project is a chatbot like application that responds to user given commands. These commands are defined using a custom built instruction language. The commands can be chained together to create more complex instructions. These are then executed by a custom executor, and the results are returned to the user via messages in the chat.

## Usage

The web application is hosted [here](https://assistant-ebon.vercel.app/). Once opened, you can type commands. Currently [^date] there are only a few commands supported.

Eg:
```
add 10 20
```
Outputs 30

  NOTE: More documentation is needed

## Workings

TODO; This section is incomplete and will be updated soon.


Try reading

- [file naming scheme](./docs/File_naming_scheme.md)
- [controllers and handlers](./docs/What%20are%20controller%20and%20handlers.md)

## Tech stack

- ReactJS
- Typescript
- Tailwindcss
- Vite

## Local installations

git clone/download this project, then open the terminal and cd into this project. Then in the terminal run;

```bash
npm install
npm run dev
```

## TODO

- [ ] Documentations
- [ ] Keyboard controlls
- [ ] Better command parsing
- [ ] More commands
- [ ] Better desktop UI
- [ ] Refactors


[^date]: Last updated at 22/09/2023
