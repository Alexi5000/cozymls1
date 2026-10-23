# CodeQL ownership migration

The workflow scans JavaScript/TypeScript and GitHub Actions with security-and-quality queries on every pull request, main push, and weekly schedule. Action revisions are pinned. SARIF artifacts are retained even while dashboard uploads are disabled.

Current staged state: GitHub default setup remains the dashboard owner. `CODEQL_ADVANCED_UPLOAD` is unset, so this workflow generates genuine SARIF without uploading duplicate analyses.

After merging and verifying both language jobs and their non-empty SARIF artifacts:

1. Record default setup state, languages, query suite, and the current repository variable value.
2. Disable GitHub default CodeQL setup using its supported API (`state: not-configured`).
3. Set repository variable `CODEQL_ADVANCED_UPLOAD` to `true`.
4. Dispatch Security Scan on main. Verify both language jobs succeed and dashboard analyses reference the actual main commit.
5. Verify repaired historical alerts close from genuine analysis. Do not dismiss fixed findings or delete historical analyses.

Rollback: unset the variable first, then restore default setup with its recorded languages and extended query suite. Dispatch/verify default scanning. There is a short handoff interval, so execute these steps together and monitor completion.

The JavaScript category remains `/language:javascript`, and the original non-matrix workflow/job identity `.github/workflows/security.yml:codeql-analysis` remains intact. Actions uses a separate job/category. Verify the resulting analysis identities before claiming reconciliation.
