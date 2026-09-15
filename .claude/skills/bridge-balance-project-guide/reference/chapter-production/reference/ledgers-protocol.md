# Ledgers protocol

**Read at SKILL.md step 1, before research begins. Write at step 8, after the gate is clean.**

Four files in `curriculum-state/ledgers/`: `concept-`, `evidence-`, `example-ledger.yaml`, and `prerequisite-graph.yaml`.

This skill both reads *and* confirms, because it is the skill that ships the chapter. **When the gate is clean, entries get confirmed, not proposed.** `status: proposed` is reserved for the genuinely different case where a chapter *considered* something and didn't use it.

No single authoring session can hold what every other chapter has already decided. This is where that knowledge survives between sessions, and a chapter that finishes without writing here has not finished.

## Reading, in order

**1. `concept-ledger.yaml`.** Check whether the terms this chapter needs already carry a canonical definition. Those definitions become handoff constraints at step 3: a chapter that silently re-defines a term the book already committed to produces a vocabulary contradiction no gate will catch. If the topic sits adjacent to a `used-undefined` entry — a term used somewhere but never properly glossed — note it; this chapter may be the right place to fix it, and if it isn't, saying so is still useful.

**2. `evidence-ledger.yaml`.** Before treating a source as load-bearing, check whether a canonical source already covers the same claim. Research is deliberately broader than the canonical list — that's the point of researching — but a "new" source duplicating what's already cited well isn't earning its place. Check `unresolved_citations` too: a claim listed there needs a real source found in this run, or it needs dropping, not carrying forward on the strength of having appeared before.

Also check `questions_asked` on any source you plan to reuse. The discipline is that a shared source may be cited by several chapters **as long as each asks a genuinely different question of it.** A third chapter asking the same question of the same report is repetition the ledger exists to make visible.

**3. `example-ledger.yaml`.** Check for a `reserved` entry before inventing a worked example. Several are pre-approved and waiting. If nothing reserved fits, proposing a new one is a normal outcome, not a failure.

**4. `prerequisite-graph.yaml`.** Confirm this chapter's place: does it have an entry, and are its `requires` chapters far enough along that this chapter can honestly assume that prior knowledge? Assuming a prerequisite that is still `placeholder` is a real problem — either the assumption comes out or the sequencing does.

A missing entry is a sequencing question this skill does not resolve unilaterally. It's one of the required inputs under SKILL.md step 1's hard stop: the requester supplies a stage and rough position — `curriculum-architect` can help think it through — or the run stops and asks rather than inventing sequencing.

The graph is **a snapshot of what's decided so far, never a plan to execute against.** If this run legitimately retitled or rescoped the chapter, update the graph to match what got authored. Never bend the chapter to match a stale row.

## Writing, after the gate is clean

**`concept-ledger.yaml`** — for every term this chapter is the first to define properly, move it to `defined` with this chapter's path as `first_defined` and the canonical wording as it actually appears in the shipped prose. One canonical definition per term, reused verbatim wherever it appears; the surrounding prose may change, the definition may not. If this chapter *used* a term it didn't define, and nothing defines it yet, add it as `used-undefined` so a later chapter can pick it up.

**`evidence-ledger.yaml`** — for every source actually cited in the shipped chapter: if it was already canonical, append this chapter's question to `questions_asked` (the specific thing *this* chapter asked of it, not the topic). If it's new, add it as canonical now — the gate passed, it shipped, it's cited — with `last_verified` today, `expires` per the file's own rule, and the one-clause rationale for what it establishes that nothing already on the list does. A source that was researched but not cited goes in as `status: proposed` or not at all, depending on whether a future chapter would plausibly want it.

**`example-ledger.yaml`** — a `reserved` example actually used becomes `spent`, with this chapter's path. A new example used becomes a normal entry. An example considered and rejected is worth recording as `status: proposed` with the reason — a rejection is worth as much to the next author as a use, and this is the only place that survives.

**`prerequisite-graph.yaml`** — update this chapter's row to what actually shipped: the real title, the real `teaches` list, and `chapter_state` matching the file. If the run changed the scope, say so in `notes`.

## Writing rules

- **Append, don't rewrite.** An entry records a decision that has already shipped; silently changing it makes published chapters wrong. If something genuinely needs correcting, correct it and say so in `notes` — don't quietly overwrite.
- **One canonical definition per term.** A term needing different wording in a different context gets a variant under the same entry, never a second entry.
- **Record the omission too.** An entry saying an example was considered and rejected is worth as much as one saying it was used. This is SKILL.md Principle 5 in its concrete form: with no counts to hit, the omission record is the only thing that makes under-generation visible.
- **Write before presenting, not after.** A chapter that reaches step 9 with the ledgers unwritten is not finished, whatever the file on disk looks like.
