# ✨ multicmd-runner

### A CLI helper for run multiple commands at the same time.

### 🚀 Quickstart

Install via NPM:

```bash
# Using Yarn:
$ yarn global multicmd-runner

# or, using NPM
$ npm i -g multicmd-runner
```

`cd` into your root of project's directory, and try initialize the multicmd-runner

```bash
$ multicmd-runner init
```

Now in root directory there is created a file `multicmd-runner.config.json` Something look like this 👇🏻

```json
{
  "dev": [
    {
      "title": "Dashboard Development Server",
      "command": "pnpm dev",
      "location": "/dashboard"
    }
  ],
  "build": [
    {
      "title": "Dashboard Build",
      "command": "pnpm build",
      "location": "/dashboard"
    }
  ],
  ...
}
```

or you can create direclty array of commands objects.

```json
[
  {
    "title": "Dashboard Development Server",
    "command": "pnpm dev",
    "location": "/dashboard"
  }
]
```

Object must follows as this format 👇🏻

```json
{
  "title": "Your title",
  "command": "Specify command",
  "location": "path where command is run."
}
```
