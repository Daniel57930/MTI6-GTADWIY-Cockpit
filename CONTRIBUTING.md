# Contributing to MTI6-GTADWIY-Cockpit

Thanks for your interest in contributing!

How to contribute

1. Fork the repository.
2. Create a branch with a descriptive name: `git checkout -b feat/your-feature`.
3. Commit your changes with clear messages.
4. Push and open a pull request against `main`.

Guidelines
- Keep changes focused and small.
- Include tests for new behavior where practical.
- Follow the code style in `.eslintrc.json`.

Reporting bugs
- Open an issue and include steps to reproduce, expected vs actual behavior, and any relevant logs.

## Security and Secrets

**Important**: Never commit secrets or API keys to the repository.

- Use `.env.local` for local development (this file is gitignored)
- Use `.env.example` with placeholder values only (no real secrets)
- For CI/CD, use GitHub Secrets to store sensitive values
- If you accidentally commit a secret, notify the maintainer immediately and rotate the credential
- See [docs/ci-and-docker.md](./docs/ci-and-docker.md) for detailed guidance on managing secrets

Leaked secrets in Git history may require special cleanup using tools like `git-filter-repo` or BFG Repo-Cleaner.
