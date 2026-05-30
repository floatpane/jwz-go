package jwz

import (
	"regexp"
	"strings"
)

var subjectPrefixRE = regexp.MustCompile(`(?i)^(Re|Fwd|Fw|AW|WG|Tr|Reé|Resp|SV|VS|RV|ENC|Antw|Odp|R|I)\s*:\s*`)

// CanonicalSubject lowercases a subject and strips repeated locale-aware
// reply/forward prefixes (Re:, Fwd:, AW:, SV:, RV:, Odp:, etc.) so that
// related messages can be grouped when they share no Message-ID lineage.
func CanonicalSubject(s string) string {
	return canonicalSubject(s)
}

func canonicalSubject(s string) string {
	s = strings.TrimSpace(s)
	for {
		next := subjectPrefixRE.ReplaceAllString(s, "")
		if next == s {
			break
		}
		s = strings.TrimSpace(next)
	}
	return strings.ToLower(strings.TrimSpace(s))
}
