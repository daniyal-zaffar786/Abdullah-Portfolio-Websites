---
name: Portfolio contact delivery
description: The portfolio has no configured mail integration or durable submission backend.
---

The contact form must not claim that a message was delivered when the site has no configured mail service. Use an explicit email-draft flow or a clearly labeled external contact method until a real delivery backend is added.

**Why:** A client-side form pointed at an unavailable API route would fail silently or present a false success state.

**How to apply:** If email delivery is added later, replace the draft flow only after configuring and verifying the server-side provider, validation, abuse controls, and success response.