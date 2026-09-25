# Launch video script (24 September 2026)

Replaces the 23 September intro script, which the owner rejected. One continuous voice-over, 485 words: about 3 minutes 30 seconds at a natural pace, up to 4 minutes at 2 words a second. Written by Claude as a digital marketer from the owner's brief of 24 September. The owner does the editing. Every number was measured by DeepSeek (`job24b-video-facts.md`).

AI Studio: Despina, temperature 0.7, style Vocal Smile, pace Natural, accent Neutral. One take, expression "confident warmth". Each blank line is a pause.

```
Introducing The Bridge Balance.
A free book that takes you from zero to leading AI agents with engineering judgment.

AI now writes code in seconds. So many students are asking: is learning to build software still worth it?
It is, but not the way it has always been taught.
Some people resist AI. Others trust whatever it writes. Both habits are failing.

The Bridge Balance takes a third road. Instead of resisting the most advanced AI models and coding agents, like Claude Code, OpenCode, Codex and Cursor, we teach you to use them better. That is our specialty, not an afterthought.

And you learn it in parallel, not step by step. Traditional learning puts the fundamentals first and AI later. Here, the same chapter teaches you how software really works, and how to lead the AI agents that build it.

At its heart is one skill. Code Literacy: reading and judging code, whoever or whatever wrote it. Because when AI writes the code, the person who can judge it is the one who leads.

Its method is Spec-Driven Engineering. You describe exactly what to build, an AI agent builds it, and you judge the result.

Three stages take you from the first basics, to real software built with AI agents, to advanced AI agents of your own.

You don't need a technical background. Whether you're a student, a doctor, a teacher or a business owner, we respect the experience you bring. So we built it for someone starting from zero.

Behind it are nearly three months of research and planning, and more than five weeks of development. We studied the books, documentaries and ideas of industry leaders like Andrew Ng, David Malan and Irfan Malik, and many more. Then we spent hours discussing it all with working experts, to find what all of them missed.

More than 2.4 billion AI tokens went into researching and building this platform. That costs real money. We spent it so the content could be 100% free for you.

Now, the honest part. The Bridge Balance is in Alpha, and the real content of Stage Zero is being written right now.
For now, it lives at this temporary address. Soon it moves to its official domain, most likely thebridgebalance.com. Got a better name? Tell us in the comments.
Then comes Beta, with the starting content ready to read.

We're building it in the open, and every advancement will be announced and shared. We warmly welcome your critique and your suggestions.

And more is coming. MCP servers that connect AI to your tools. Agent Skills that give AI agents new abilities. And an end-to-end AI learning platform with more than ten features: deep research, deep thinking, help with your code, separate modes for students and professionals, working with your own documents, and learning from the book and far beyond it.

So stay tuned. We'll see you at Beta.

The Bridge Balance.
```

## Where each claim comes from
- Nearly three months of research and planning: the Official docs start 29 June 2026. More than five weeks of development: the first prompt record is 19 August 2026.
- 2.4 billion tokens: Claude Code 1.56 billion plus DeepSeek 0.90 billion, measured from the logs on 24 September. About 96% of them are cached re-reads, which cost less per token than fresh ones. The figure counts every token the models processed.
- Parallel learning: canon CS-9, `curriculum-state/canon/course-structure.md:101` (programming, AI-agent skills and their tools learned together, in the same chapter).
- The three stages: CS-13 to CS-16, `course-structure.md:131-134`.
- The experts: identities checked (Andrew Ng: DeepLearning.AI, Coursera; David J. Malan: professor of computer science; Irfan Malik: founder and CEO of Xeven Solutions). The script says "we studied", never that they are involved.
- The platform's features: `specs/012-chatbot-tutor/spec.md` (116 functional requirements; deep research, six modes, Student and Professional levels, the book plus general knowledge plus the web).

## Pronunciation
If AI Studio says "Andrew N-G", type "Andrew Ing". If it stumbles on the domain, type "the bridge balance dot com".

## Editing notes
- "this temporary address": zoom on the Vercel URL.
- While the experts are named, add a small on-screen line: "Studied, not affiliated."
- Keep the homepage section "Built with Claude Code, in the open" off camera.
- Natural shorts: the opening question (is learning still worth it?), parallel learning, the 2.4 billion tokens for free content, the Alpha and domain scene, and what's coming.
