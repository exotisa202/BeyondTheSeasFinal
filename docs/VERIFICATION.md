# Verification log — November 2026

Environment: isolated cloud workspace, Node.js 24; temporary synthetic HTTP servers on loopback. No production credentials or external database used.

- `npm ci --prefix client`: passed with legacy dependency warnings.
- `npm run build --prefix client`: passed with existing lint and Create React App deprecation warnings.
- `node --test Server/test/*.test.js`: passed, including catalogue, shortlist state, malformed input and unsupported feature handling.
- `npm ci --prefix Server --ignore-scripts`: passed.
- Node syntax checks for server JavaScript: passed.
- Full PostgreSQL API: **blocked**; complete schema/migrations are absent.
- Browser interaction and visual verification: **not yet performed**.
- Docker/Podman: unavailable in the preparation workspace; Dockerfile is supplied but not executed.

The synthetic adapter is not a replacement for validating original recommendations, user authorization, forum or calendar workflows. Do not describe those workflows as tested.
