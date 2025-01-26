# ✨ multicmd-runner

### A simple CLI helper for run multiple commands at the same time.

### 🚀 Quickstart

Install via NPM:

```bash
# Using Yarn:
yarn global multicmd-runner

# or, using NPM
npm i -g multicmd-runner
```

Navigate to the root of your project directory and initialize multicmd-runner:

```bash
mcr init
or
multicmd-runner init
```

Now, a file named multicmd-runner.config.json is created in the root directory. It looks something like this 👇🏻 and you can customized as per your need.

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

#### Run the commands

```bash
mcr <your_key>
or
multicmd-runner <your_key>

// like:
mcr dev
mcr build

multicmd-runner dev
multicmd-runner build
```

Alternatively, you can directly create an array of command objects.

```json
[
  {
    "title": "Dashboard Development Server",
    "command": "pnpm dev",
    "location": "/dashboard"
  }
]
```

You can also run an array of commands directly if you don't specify any key.

```bash
mcr
or
multicmd-runner
```

The command object must follow this format 👇🏻

```json
{
  "title": "Your title",
  "command": "Specify you command command",
  "location": "path where command is run."
}

// The title is an optional field. If not provided, the location will be taken by default.
```
