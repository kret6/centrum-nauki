# Key rotation manual (Centrum Nauki + julia-hub)

This site has no secrets in its files anymore. All keys live in two places:

1. **On the server** — the Cloud Run service `julia-hub` (region `europe-west1`,
   project number `161045418771`). It decides which keys are valid.
2. **In the browser** of each device (localStorage), put there once by a private
   link to `klucz.html`.

Rotating a key therefore means: change it on the server, then re-open the
private link on each device.

## The three keys

| Key | Stored in browser as | Used by | What a thief could do with it |
|---|---|---|---|
| Quiz key | `klucz_klasowki` | quiz pages (`kartkowka_*`, `sprawdzian_*`, `test_*`, `powtorka_*`, `praca_domowa_*`) to download quiz content + answer key from `/k/dane/<id>` | read every quiz with answers |
| Hub key | `klucz_huba` | "Piszemy razem" / "Piszemy zaproszenie" tiles on `index.html` and the Zemsta page (`?k=` parameter) | use the AI writing helper on your account (cost) |
| Results token | `token_wynikow` | learning pages (`*_nauka_*`, `edb_*`, `slowka_*`, …) to POST scores to `/results`; quiz pages to POST sheets to `/kartka` | post fake results and fake sheets into the parent panel |

The two values that were leaked (committed to the public repo until
2026-10-26) are the **hub key** and the **results token**. They remain in git
history forever, so they must be treated as public until rotated.

## Step 0 — find where the server keeps the keys

The hub's source is not in this repo. Check the service configuration first:

```bash
gcloud config set project 161045418771
gcloud run services describe julia-hub --region europe-west1 \
  --format="yaml(spec.template.spec.containers[0].env)"
```

You will see one of three situations:

- **A.** Plain environment variables with the key values visible → Step 2A.
- **B.** Environment variables that reference Secret Manager (`valueFrom.secretKeyRef`) → Step 2B.
- **C.** Nothing key-related in the env → the keys are hard-coded in the hub's
  source or stored in its database → Step 2C.

Note the variable names; the examples below use `HUB_KEY`, `RESULTS_TOKEN`
and `QUIZ_KEY` — replace with the real ones.

## Step 1 — generate new values

One command per key. Use long random values; never reuse an old one.

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(24))"
```

Keep them in a password manager, not in a file in this repo.

## Step 2 — replace them on the server

### 2A — environment variables

```bash
gcloud run services update julia-hub --region europe-west1 \
  --update-env-vars HUB_KEY=NEW_HUB,RESULTS_TOKEN=NEW_RESULTS
```

This deploys a new revision; traffic moves to it automatically.

### 2B — Secret Manager

```bash
printf %s "NEW_HUB"     | gcloud secrets versions add hub-key       --data-file=-
printf %s "NEW_RESULTS" | gcloud secrets versions add results-token --data-file=-
# a new revision is needed so Cloud Run picks up ":latest"
gcloud run services update julia-hub --region europe-west1 \
  --update-secrets HUB_KEY=hub-key:latest,RESULTS_TOKEN=results-token:latest
```

Afterwards disable the old secret versions:

```bash
gcloud secrets versions list hub-key
gcloud secrets versions disable <OLD_VERSION> --secret hub-key
```

### 2C — hard-coded in the hub source

Change the values in the hub's code or its config file, redeploy with the
hub's usual deploy command, and move the keys into environment variables or
Secret Manager while you are there, so the next rotation is 2A or 2B.

## Step 3 — confirm the old keys are dead

Run with the **old** values. Each must return 401 or 403; anything else means
the old key still works and the rotation did not take effect.

```bash
H=https://julia-hub-161045418771.europe-west1.run.app

# hub key
curl -s -o /dev/null -w "%{http_code}\n" "$H/chat?k=OLD_HUB_KEY"

# results token
curl -s -o /dev/null -w "%{http_code}\n" -X POST "$H/results" \
  -H "Content-Type: application/json" \
  -d '{"token":"OLD_RESULTS_TOKEN","subject":"test","title":"rotation check","score":0,"total":1}'

# quiz key (only if you rotated it too)
curl -s -o /dev/null -w "%{http_code}\n" -H "X-Klucz: OLD_QUIZ_KEY" "$H/k/klucz"
```

If the `/results` check returned 200, delete that "rotation check" entry from
the parent panel.

## Step 4 — update every device

Build the private link with the **new** values:

```
https://kret6.github.io/centrum-nauki/klucz.html#klucz=NEW_QUIZ&hub=NEW_HUB&wyniki=NEW_RESULTS
```

- Leave out `klucz=` if the quiz key did not change — the saved one stays.
- Send the link through a private channel (not a group chat, not e-mail you
  forward). The part after `#` never reaches GitHub or any server; the page
  deletes it from the address bar as soon as it is saved.
- Open it **once in every browser** the child uses. Chrome and Edge on the
  same laptop count as two. A private/incognito window forgets it on close.
- The page shows "✅ Gotowe!" when the quiz key is accepted. A "⚠️ Serwer
  chwilowo nie odpowiada" message means the keys were saved but the server
  could not be reached — try a quiz later.

What happens on a device that was not updated:

- quizzes keep working (the quiz key is unchanged) and, on first open, they
  overwrite the stored results token with the new one from the server, so
  score reporting fixes itself;
- learning pages stop reporting scores until a quiz is opened or the link is used;
- the writing-helper tiles show "🔒 brak klucza" until the link is used.

## Step 5 — look for misuse

```bash
gcloud logging read \
  'resource.type="cloud_run_revision" AND resource.labels.service_name="julia-hub"
   AND (httpRequest.requestUrl:"/chat" OR httpRequest.requestUrl:"/pisanie" OR httpRequest.requestUrl:"/results")' \
  --freshness=30d --limit=200 \
  --format="table(timestamp,httpRequest.remoteIp,httpRequest.requestUrl,httpRequest.status)"
```

Look for IP addresses or hours that do not match your household. Also skim the
parent panel for results you do not recognise.

## Optional — scrub git history

Rotation makes the old values worthless, so this is cosmetic. If you still
want them gone from history, rewrite it and force-push; every clone must then
be re-cloned.

```bash
pip install git-filter-repo
cd centrum-nauki
printf '%s\n' 'OLD_HUB_KEY==>REMOVED' 'OLD_RESULTS_TOKEN==>REMOVED' > /tmp/replacements.txt
git filter-repo --replace-text /tmp/replacements.txt
git push --force --all origin
```

GitHub may keep the old commits reachable by hash for a while; contact GitHub
support to purge them if that matters.

## Checklist

- [ ] new values generated and stored in a password manager
- [ ] server updated (2A / 2B / 2C) and new revision serving traffic
- [ ] old hub key returns 401/403
- [ ] old results token returns 401/403
- [ ] new link opened in every browser on every device
- [ ] writing-helper tile opens the hub without a "brak klucza" message
- [ ] a learning page score shows up in the parent panel
- [ ] logs checked for unknown use
- [ ] date of rotation noted below

## Rotation log

| Date | Keys rotated | By |
|---|---|---|
| | | |
