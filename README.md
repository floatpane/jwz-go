<div align="center">

# jwz-go

**Jamie Zawinski's mail-threading algorithm for Go.**

[![Go Version](https://img.shields.io/github/go-mod/go-version/floatpane/jwz-go)](https://golang.org)
[![Go Reference](https://pkg.go.dev/badge/github.com/floatpane/jwz-go.svg)](https://pkg.go.dev/github.com/floatpane/jwz-go)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/floatpane/jwz-go)](https://github.com/floatpane/jwz-go/releases)
[![CI](https://github.com/floatpane/jwz-go/actions/workflows/ci.yml/badge.svg)](https://github.com/floatpane/jwz-go/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

`jwz-go` groups a flat list of email headers into conversation threads using
[Jamie Zawinski's algorithm](https://www.jwz.org/doc/threading.html) — the same
threading model that ships in Mozilla Thunderbird and most modern MUAs.
It joins messages by `Message-ID` / `In-Reply-To` / `References`, and falls
back to a locale-aware subject match (`Re:`, `Fwd:`, `AW:`, `SV:`, `RV:`,
`Odp:`, …) when reference data is missing.

## Features

- **Pure Go, zero dependencies.** Drop-in for any mail client, archive viewer, or mailing-list tool.
- **Deterministic output.** Threads sort newest-first by `LatestAt` with a stable EmailID tiebreaker.
- **Locale-aware subject fallback.** Groups orphans across `Re:`, `Fwd:`, `AW:`, `SV:`, `RV:`, `Odp:`, `Antw:` and more.
- **Loop-safe.** Cycle detection in `link()` prevents pathological reply chains from blowing the stack.
- **Application-defined IDs.** Carry your own row/UID through the tree via `EmailID` — no extra lookup needed.

## Install

```bash
go get github.com/floatpane/jwz-go
```

Requires Go 1.26+.

## Usage

```go
package main

import (
    "fmt"
    "time"

    "github.com/floatpane/jwz-go"
)

func main() {
    base := time.Now()
    threads := jwz.Build([]jwz.EmailHeader{
        {ID: "<a@example>", Subject: "Release plan",       Date: base,                  EmailID: "1", Sender: "alice"},
        {ID: "<b@example>", InReplyTo: "<a@example>",
                            Subject: "Re: Release plan",   Date: base.Add(time.Minute), EmailID: "2", Sender: "bob"},
        {ID: "<c@example>", References: []string{"<a@example>", "<b@example>"},
                            Subject: "Re: Re: Release plan", Date: base.Add(2*time.Minute), EmailID: "3", Sender: "carol"},
    })

    for _, t := range threads {
        fmt.Printf("%s (%d messages, last %s)\n", t.Subject, t.Count, t.LatestAt)
    }
}
```

### Types

| Type | Description |
|------|-------------|
| `EmailHeader` | Input. Subset of RFC 5322 headers required for threading. |
| `Thread` | Output. Conversation root + aggregate metadata. |
| `ThreadNode` | One message inside a `Thread`, with children. |

### Subject canonicalization

`CanonicalSubject(s)` is exported for callers that want the same subject
normalization rules outside of threading — e.g. for search dedup or
mailing-list digest collapse.

```go
jwz.CanonicalSubject("Re: AW: SV: Release plan") // -> "release plan"
```

## How it works

1. **Parse references.** Each header's `References` list is walked left→right; every consecutive pair is linked parent→child.
2. **Resolve parent.** `In-Reply-To` wins; otherwise the last `References` entry.
3. **Prune empty containers.** Tree is collapsed so that placeholder nodes with no real message disappear unless they have multiple children (which we keep, so siblings stay siblings).
4. **Subject grouping.** Roots that share a canonical subject are merged under one tree — this catches forwarded threads and clients that drop References.
5. **Sort.** Children by Date (stable); threads newest-first by `LatestAt`.

## Documentation

Full API reference: [pkg.go.dev/github.com/floatpane/jwz-go](https://pkg.go.dev/github.com/floatpane/jwz-go)

## Contributing

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

Report vulnerabilities privately via [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE](LICENSE).
