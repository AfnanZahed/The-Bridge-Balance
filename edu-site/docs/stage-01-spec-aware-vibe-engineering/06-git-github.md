---
sidebar_label: "6. Git & GitHub"
sidebar_position: 7
title: "A Journal of Every Change: Git, GitHub, and Reviewing What an Agent Wrote"
description: "A branch is a pointer, a commit is a snapshot with a written reason, and a pull request is a review conversation — here is how a change written by an AI agent gets recorded, read and merged into the club sign-up page."
keywords: [git, github, repository, commit, staging area, branch, merge conflict, pull request, code review, gitignore, secrets in git, commit history, git bisect, reviewing agent code]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.5
scope_reason: "one workflow — record, branch, review, merge — where each stage is only legible through the next, plus the genuinely new case of a diff no human wrote, so the mechanism sections cannot be lifted out without removing the review judgment the chapter exists to produce."
---

# A Journal of Every Change: Git, GitHub, and Reviewing What an Agent Wrote

Before you read a pull request, take the name apart. **Pull request** is *pull*, plus *request* — a request to pull. A picture forms quickly. Somebody wants the club's code pulled into their own copy so they can work on it, and whoever opened the pull request is the one doing the pulling.

Keep that guess. The correction arrives later, and it decides how the rest of this chapter spends its length.

You already run a version of this by hand. A document gets made, then a copy with *v2* on the end, then a third one you describe as final. Every copy keeps a whole stage of the work. What the folder cannot tell you is why anything changed, or which copy two people should now build on.

## The copy with a different name

**Git** is the program that records every version of a project's files, and it has done that job since 2005. It runs on your own machine and needs no network. **GitHub** is a website, launched in 2008 and owned by Microsoft since 2018, that keeps a second copy of that record where other people can see it.

Those two get treated as one thing constantly, and they are separate. Git does not know GitHub exists. GitHub could vanish tomorrow and every repository would keep its full history, because every clone holds the whole thing.

The difference between Git and a folder of numbered copies is smaller than it sounds and it is worth stating exactly. A copy records a state. Git records the *difference* between one state and the next, together with a written reason, under a single name that never changes. You stop maintaining *signup-page-v4-final.js* and start asking what changed, and why.

## Who made Git, and where the account lives

Linus Torvalds wrote the first working version in April 2005, for the Linux kernel. His first commit landed on 7 April 2005 and describes itself as the "Initial revision of 'git', the information manager from hell". Junio Hamano has maintained the project since July 2005.

The account to trust is *Pro Git*, by Scott Chacon and Ben Straub, published by Apress and readable free at `git-scm.com/book`. For the website's behaviour, the authority is GitHub's own documentation at `docs.github.com`, which moves faster than any book can.

## The problem a folder of copies cannot solve

Two people build the club page. You change the seat check, which refuses the thirty-first signup. Your teammate changes the form's layout. Both of you save, both upload, one file lands on top of the other, and nobody can prove afterwards who changed which line or why.

The manual fix is to take turns. That costs a message every time, and it breaks the moment one of the builders is an agent. An agent does not know a turn exists. It reads the folder, writes what it was asked for, and has no way to notice that your teammate is mid-sentence in the same file.

The first systems that fixed this kept one master copy on one server and handed out locks. You checked a file out, nobody else could touch it, and you checked it back in. That holds until two people need the same file on the same day, which on a live page is most days.

Git's answer came out of a specific argument rather than a plan. Until 2005 the Linux kernel project kept its history in a commercial tool called BitKeeper, which its maker had let them use without paying. That arrangement ended, and Torvalds replaced the tool within about ten days.

The name *git* is British slang for a disagreeable person, and Torvalds' own account of it is that he named another project after himself. Nothing inside the word describes the software. The design does: it had to be fast, and every developer had to hold a complete copy of the history instead of depending on one server. Those two demands are why a branch costs nothing, and why you keep working when GitHub is unreachable.

## What a repository actually is

A **repository** is the folder Git watches. Inside it sits a hidden folder named `.git`, and that hidden folder is the record. The files you can see and edit are the **working tree** — the single version currently laid out on disk.

A **commit** is one recorded snapshot, with a written reason and a link to the commit before it. Three things about it carry weight.

It does not store your file. It stores the content that produced a particular name, plus the tree that lists those contents. A commit that changes one line therefore costs a few hundred bytes instead of a copy of the file.

The message is the only place the *why* lives. A diff records what changed. Nothing in a diff records whether the change was wanted. A message reading "reject the thirty-first signup" survives six months of reading; a message reading "update file" leaves the next person no way back to the intent.

The author is free text. Git writes whatever name and email sit in your `git config user.name` and `user.email`, and it verifies neither. So your name appearing against a commit in `git log` is not evidence that you wrote it. That fact matters here more than anywhere else in this book.

### What the hash is a hash of

Git stores four kinds of object. A **blob** holds one file's contents. A **tree** holds a directory listing, naming blobs and other trees. A **commit** holds a tree, the hash of the commit before it, the author, the time and the message. A **tag** holds a name pointing at one of those.

Each object is named by the **hash** of its own contents — a 40-character hexadecimal string, which is why every identifier in Git looks like `e83c5163316f89bfbde7d9ab23ca2e25604af290`.

Two results follow. Identical content is stored once, however many files contain it. And because a commit's hash covers its parent's hash, editing any commit changes the hash of every commit after it, so the record cannot be quietly altered. SHA-1 was chosen in 2005. On 23 February 2017, researchers at CWI and Google published the first practical SHA-1 collision, and Git added experimental SHA-256 storage in version 2.29, released in October 2020. It still writes SHA-1 by default, for compatibility.

## The staging area, and why it exists

The **staging area**, also called the index, is the set of changes you have marked for the next commit. It makes a third place alongside the working tree and the record: you edit files in the working tree, `git add` moves chosen changes into the staging area, and `git commit` turns what is staged into one commit.

For about a week this looks like an unnecessary step, because the design that comes to mind first has only two places. The reason it exists is that your working tree is usually in the middle of several things at once. You are part-way through the seat check, you spotted a typo in the signup copy, and you repaired a broken import. Those are three decisions.

The staging area lets you commit them as three, in whatever order tells the clearest story. Without it you get one commit called "various changes", and a reviewer has nothing to judge except taste.

That is a review argument, not a storage argument. A commit should be one decision, and the staging area is the tool that makes one decision possible while two others sit unfinished in the same folder.

## A branch is a pointer, not a copy

*Branch* comes from a tree. A tree branch grows outward, becomes a separate limb, and is eventually grafted back on. The word predicts a copy of the code, growing off to one side, that must be joined again.

The thing itself is far smaller. A **branch** is one file holding one hash, naming one commit. `main` holds the hash of the newest commit on it. Creating a branch writes a new file containing the same hash that was already there. That is the whole operation, and it is why branching in Git is cheap in a way that surprises people arriving from older tools.

How cheap: on a freshly created repository, one branch is **41 bytes** — a 40-character hash and a newline. A hundred branches come to about four kilobytes, in the ordinary case where Git keeps each branch in its own small file.

**HEAD** is the pointer that says which branch you are standing on. When you commit, Git writes a new commit whose parent is the commit your branch pointed at, then moves that branch's hash forward to the new commit. Nothing is copied. Nothing needs to be.

The word breaks in one place, and the break is worth knowing. A branch carries no memory of where it came from. Nothing records that this branch began on `main`. The tree you see in a web interface is drawn when the page loads, by walking parent hashes backwards, and deleting a branch destroys the drawing without touching a single commit underneath it. People are startled that deleting a branch did not delete their work, and this is why.

**Merging** is joining one branch's commits into another. Git finds the point where the two histories last agreed, plays forward the changes made since, and either produces one new commit with two parents or moves the branch forward when nothing else has happened in between.

### Squash, merge, or rebase

GitHub offers three ways to land a pull request, and its documentation is explicit about the default. Clicking **Merge pull request** adds all commits from the branch to the base branch in a merge commit, using the `--no-ff` option.

- **Merge commit.** Keeps every commit and records the join. The history shows the branch taking shape and coming back.
- **Squash and merge.** Combines the branch's commits into one before merging. GitHub's own documentation names the cost: "You lose information about when specific changes were originally made and who authored the squashed commits."
- **Rebase and merge.** Replays the commits one at a time onto the base branch with new hashes. GitHub notes that it always rewrites the committer information, produces new commit hashes, and adds the commits "without commit signature verification".

A repository can allow or forbid each of the three, and choosing one is how a team fixes the shape of its own history.

## The merge conflict is not an error

Now the part that stops beginners, and the part worth reading twice.

Two branches change the same line. One changes a line the other deleted. Git cannot choose between the two versions, and it will not try. It stops, writes both into the file, and asks a person to decide.

That is the entire thing. A **merge conflict** is Git declining to guess. It is not corruption, and it is not a failed merge. Git could have taken the newer version or preferred the branch you are standing on, and either choice would silently discard a decision somebody made. It stops instead, because the alternative is losing work without telling anyone.

Reading one takes a minute once you have seen the three markers. Git writes them into the conflicted file:

```
<<<<<<< HEAD
if (signups.count < 30) {
=======
if (signups.count <= 29) {
>>>>>>> agent/final-seat
```

`<<<<<<<` opens the version from the branch you are standing on, labelled `HEAD`. `=======` separates it from the other version. `>>>>>>>` closes it and names the branch that disagreed. That is the whole vocabulary.

You resolve it by rewriting that block into the line that should actually exist. Often that line is neither of the two Git printed. Here both checks refuse the thirty-first student, and the one you keep should be the clearer statement, not the newer one.

A leftover marker in a merged file is a defect you shipped, so it is worth checking for them before you commit. Git will not let you finish the merge while any file is still unmerged, but it will happily record a file whose markers you forgot to remove.

### The commands that walk a conflict to resolved

```
git status                    # lists the file under "Unmerged paths"
# open the file, remove the three marker lines, keep one line
git add signup.js             # marks that file resolved
git status                    # the file moves to "Changes to be committed"
git merge --continue          # records the merge, with two parents
```

When this works, `git status` reports nothing under `Unmerged paths` and prints a line naming the branch you are on.

## Two copies of the same history

A **remote** is another copy of the same repository, held under a short name. The copy you cloned from is conventionally called `origin`. Git has no central server in its design. A remote is a second copy that happens to be reachable, and the one GitHub hosts has no special standing inside the tool.

Four verbs matter, and the direction is the thing worth learning.

`git fetch origin` downloads the remote's new commits and leaves your files alone. `git pull` fetches and then merges what came down into your branch. `git push origin seat-check` uploads your commits and moves the remote's branch to match. A **force push** replaces the remote's branch with yours, discarding anything on the remote that your copy does not have.

`git fetch`, then look, is the habit worth forming. `git pull` hides a merge inside a single command, and a merge is exactly the moment you want to be paying attention.

One small detail that catches people for an afternoon. GitHub named the default branch of new repositories `main` from 1 October 2020. Git itself still calls the first branch `master` when you run `git init`, and its documentation says the default will change to `main` when Git 3.0 is released. So a repository created on your laptop and a repository created on the website can start with different branch names, which matters the first time you push one into the other.

## What the name was hiding

Score the guess from the opening.

**Pull request** predicted that the person who opens one is the one doing the pulling. That direction is backwards. Git ships a command called `git request-pull`, which predates GitHub, and its documentation reads: "Generate a request asking your upstream project to pull changes into their tree." The request is addressed to whoever maintains the code you want to change. They pull. You propose.

So the name describes the maintainer's action, which is the smaller half of the thing. The larger half is what the name leaves out entirely. A pull request is a written proposal, a diff, and a conversation, and the conversation is where the change actually gets decided. A pull request that nobody reads is not a review. It is a merge with extra paperwork.

That gap is this chapter. The name points at the merge. The work is the reading.

## One change, all the way through

Trace one small change against the club page and the whole mechanism appears at once. You branch, because you want your work to be separable. You stage and commit, because you want the reason recorded beside the change. You push, because the second copy is where the conversation happens. Your teammate opens the pull request and reads it, and either it merges or it comes back with a question.

Break it at the last step and the mechanism becomes visible in a way the happy path never shows. Your teammate has meanwhile changed the same line of the same file. Their version is already on `main`. The moment you try to merge `main` into your branch, Git stops and writes both versions into the file with the markers from above. Nothing is broken. The mechanism has located the exact line where two people made different decisions, and handed it to the only thing that can settle it.

### The exact commands, and what each end state looks like

```
git switch -c agent/seat-check
# edit signup.js, then:
git status              # signup.js appears as not staged
git add signup.js       # that change is now in the staging area
git commit -m "Reject the 31st signup"
git push -u origin agent/seat-check
```

Then the collide, on purpose:

```
git switch main
git pull                # bring the teammate's merged change down
git switch agent/seat-check
git merge main          # this is where Git stops
```

Each of those ends somewhere checkable. After the commit, `git log --oneline -1` shows one line with your message. After the push, the terminal prints a URL for opening the pull request. After the merge, `git status` names the conflicted file and tells you to fix it and then commit the result.

## Where Git sits, and what its failure takes with it

Git lives on your machine, inside the repository folder. GitHub is a second copy on somebody else's machine. The interface between your editor, your agent, and the record is the working tree, and neither your editor nor your agent talks to GitHub except through the same Git commands you type.

Then there is blast radius, and it is not uniform. Six failures, ordered by how far they reach:

A bad commit on your own branch reaches nobody, because nothing has been shared yet. A bad merge on `main` reaches everyone, because `main` is the shared record and everyone who pulls now has it. A force push on a shared branch removes commits other people built on, and their next push will either fight you or fail. A rewritten history on a shared branch breaks every clone that has not rewritten too.

A leaked credential reaches strangers. A key committed once sits in the record permanently, in every clone, forever, and deleting the file in a later commit does not touch it. That failure gets its own section below.

A deleted branch, by contrast, reaches almost nothing. The commits are still there and recoverable for a while, which is a good demonstration that the branch was only ever a label.

GitHub can enforce the first few of those. A **protected branch** is a rule on the remote that limits what may happen to a named branch. By default, a branch protection rule disables force pushes to the branches it matches and prevents them from being deleted. On top of that you can require a pull request before anything merges, require a set number of approving reviews, require every conversation to be resolved, or require signed commits. Protected branches are available on free plans for public repositories; private repositories need a paid plan.

One default is worth knowing before you trust it. A protection rule does not apply to repository administrators unless you switch on "do not allow bypassing the above settings". On a repository you own, the rule will not stop you. On a repository owned by a team, it will.

<Callout type="info" title="Where this sits">
This is one of the numbered **Stage 1** chapters, and it takes the Git and GitHub box from the architecture map in the intro and goes inside it. The map said a pull request is the moment your judgement gets applied. This chapter is about the applying.
</Callout>

## Finding the commit that broke it

The record is not only for review. It is the most useful debugging tool on the page, because it can tell you when something changed and what the author was doing at the time.

`git log --oneline` prints the history one line per commit, newest first. `git log -p -- signup.js` prints every change ever made to one file, with the reasoning beside it. That single command replaces guessing about how a line came to look the way it does.

`git blame signup.js` prints the file with a commit hash and an author beside every line, naming the commit that last touched each one. It is the fastest way to answer "who wrote this, and in which change". The author it prints is the free-text field from earlier, so treat it as a name to go and ask rather than as proof of anything.

`git bisect` is the one worth knowing by name even before you need it. You mark a commit that worked and a commit that does not, and Git checks out the commits between them so you can test each. Because it halves the range every time, a thousand commits take about ten tests rather than a thousand. Nothing else here saves as much of your evening.

Two commands to keep apart, because one of them is safe on shared history and the other is not. `git revert` followed by a commit hash writes a new commit that undoes an earlier one, leaving the original in place, which is the correct move once a bad change is already on `main`. `git reset` moves your branch backwards and rewrites what it points at, which is fine on a branch nobody else has and destructive on one they do.

## What it costs

Review has a measured size at which it stops working, and the size is small.

The most-cited measurement is SmartBear's ten-month case study of a Cisco Systems product team, published in May 2006. It covered 2,500 reviews of 3.2 million lines, written by fifty developers. Its finding is that **200 to 400 lines reviewed over 60 to 90 minutes** finds 70 to 90% of the defects present. Past roughly 400 lines in one sitting, and at rates above about 500 lines an hour, discovery falls away sharply. For comparison, the same study puts a formal inspection at roughly nine hours per 200 lines.

Google's own numbers come from a case study of its review tooling, published in the ICSE-SEIP track in 2018 by Sadowski and others, covering close to 9 million reviewed changes between January 2014 and July 2016. The median change touched **24 lines**. Over 35% touched a single file. The median number of reviewers was **1**. The median time from sending a change for review to the end of that review was **under 4 hours**, and 70% of changes were committed within 24 hours. Developers spent a median of **2.6 hours a week** reviewing.

Read those two together, because they are the same finding from opposite ends. Google's changes are small, its reviews are fast, and the reason is that small changes are what a fast review requires. Hand a reviewer nine hundred lines and you have spent their useful hour before they reach the interesting part. What you get back is a merge, not a review, and the measured drop in what gets found is why.

Git's own storage cost, for scale. The Git project's own site states, as of 2025, that the Linux kernel's source tree is 1.7 GB on disk while Git holds the full history — around **1.4 million commits** — in 5.5 GB. A branch ref sitting on top of all that is 41 bytes.

## When to branch, and when review stops working

The decision rule is short. On any repository that more than one person commits to, every change goes on a branch and through a pull request. The exceptions are narrow and you should be able to name the one you are taking.

The choice that looks right is wrong in one place, and it is the small change. "It is one line" is the reasoning that puts a direct edit on `main`, and one line is exactly where the seat check lives. Size tells you the review will be quick. It tells you nothing about whether the change deserves one.

The second place that choice is wrong is rebasing. Rebasing your branch onto the newest `main` gives a tidier history, and it is right for a branch nobody else has pulled. On a shared branch it rewrites commits other people built on, and the only way to publish the rewrite is a force push that erases their work from the shared record. Merge the shared branch. Rebase the private one.

The two ways of getting this wrong sit at opposite ends of one rope, and both are about how you hold the record. **Over-trust** reads the agent's pull request, sees a clean diff and a green check, and merges it, because the description sounded right and reading ninety lines properly would take an hour nobody scheduled. The question "did this change things I did not ask for" never gets asked, and the answer arrives in production. **Over-caution** refuses to let an agent touch the repository at all, then reads every line of generated boilerplate by hand at the rate the study above says a person can manage, and the team ships nothing. Both end at the same place: the record is being kept, and nobody is using it to decide anything.

The failure conditions have early symptoms, and each one is cheap to catch at the time.

The pull request description cannot say what "done" means. That is the request changes, not a comment, because there is nothing for the diff to be measured against. The diff is larger than the request that produced it — you asked for the seat check and the change also renames eleven variables and reformats the file. That is unreviewable at the rate above, which is a fact about the reviewer, not about the author. Nobody can name the case that was tested. "The tests pass" answers a different question from "which failure did you decide mattered here". And the messages say "update", "fix", "wip", "changes". A record with no reasons in it is unreadable at exactly the moment you need it, which is six months later, at night, during an incident.

### The reviewer's three questions

Read in the order the decision was made, not the order the page puts the parts in.

**What did this promise to do?** Read the title, the description and the commit messages before the diff. If they cannot say what the change was for, in the author's own words, no amount of code reading recovers it. When an agent wrote the change, "the author's own words" means yours, because the agent has none of its own. It had your prompt, and your prompt is not in the pull request.

**Does the diff keep that promise, and only that promise?** Now the code. Two passes: does this do the thing, and does it do anything else. The second pass is where agent-written changes fail most often, because an agent asked to fix a check will often also tidy what it noticed nearby.

**What evidence came with it, and what does that evidence not cover?** Name the failure that matters most for this change, then look for proof it was tested. For the club page the interesting case is not the happy path. It is whether the thirty-first student is refused when the thirtieth has submitted a moment earlier, and whether the rule is enforced on the server rather than drawn on the form.

An agent moves the weight between these three questions but does not change their order. An agent's diff is typically clean, consistent, and better formatted than a person's, because that is the part agents are good at, and it is also the part a reviewer instinctively judges. The part no agent can supply is the answer to the first question. Pointing an agent at the club page produces a change and a diff; it does not produce a reason, because it does not have one to give.

So reviewing an agent-written change is not a harder code review. It is a code review in which the interesting work has moved to the two questions the code cannot answer. AI has made the writing cheap. Deciding what should be written, and who owns it once it is merged, is still the engineer's job, and that is the part this chapter is about.

## .gitignore, and the commit you cannot take back

A **.gitignore** file lists paths Git should never record. Git reads it from the repository root, matches it against file paths, and skips anything it matches. Build output, local databases, editor folders, and every file holding a credential belong on that list.

Two facts turn this from housekeeping into the most important file in the repository.

First, it only affects paths Git has not already started tracking. Add a line for a file that is already committed and Git keeps tracking it anyway. The fix is `git rm --cached .env`, which untracks the file without deleting your own copy.

Second, a committed secret stays committed. The blob is in the record, in every clone, in every backup, and nothing you do in a later commit removes it. Deleting the file adds a commit that removes a path and leaves the version underneath untouched. To take a credential out of the history you must rewrite every commit that contains it, with a tool such as `git filter-repo`, and anyone who cloned before the rewrite still has the old version. So the order is: rotate the credential first, then clean the history, and treat the cleaning as tidying rather than as the repair.

GitHub tries to stop this before it starts. **Push protection**, part of its secret scanning feature, blocks a push whose contents match the shape of a known credential, and GitHub enabled it by default for public repositories. That is a backstop for token formats it recognises, not a guarantee. A password in a config file matches no pattern, and nothing checks a key you invented yourself.

<Callout type="warning" title="Safety floor">
A change an agent wrote is not merged until you have read it and can say what it does. Never commit a credential — a committed key stays readable in the record after you delete the file, so rotate it first and clean the history second. And never merge a pull request you cannot explain in your own words, because the moment it merges, the change is yours.
</Callout>

## Where the practice comes from, and who to read next

Git's origin is the 2005 BitKeeper break and Torvalds' ten-day replacement. GitHub's origin is the observation that a distributed record is more useful when the copies can see each other. Microsoft announced it would buy GitHub on 4 June 2018, for 7.5 billion dollars in Microsoft stock.

The live disagreement is about how much history to keep. Google's data says small changes and fast reviews, and one reading of that argues for squash-merging everything so `main` reads as a clean list of features. Another reading of the same data argues for keeping every commit, because a squash merge destroys which author wrote which part and when, and GitHub's own documentation lists that as a disadvantage. Neither side is clearly right, and the usual tie-breaker is how much the team needs to audit later.

Three things to read next. *Pro Git* for the mechanism, since it is free and more accurate than most summaries of it. The CWI and Google write-up of the 2017 SHA-1 collision for what a broken hash actually means in practice. And the 2018 Google case study for what code review looks like when somebody measures it instead of describing it.

## Before you turn the page

Here is the change waiting against the club page. Its description reads: "Makes the seat check handle the thirtieth signup correctly." The diff against `main` is one line.

```
-  if (signups.count < 30) {
+  if (signups.count <= 30) {
     await recordSignup(email);
   }
```

Without scrolling back: name what this line does when the club is full, say whether the description is true, and state the one test you would run before approving. Then answer the question the opening guess was really testing. Who pulls, in a pull request, and which half of that name does the work?

**Next:** the same review question, one layer down. When the change is a schema migration rather than a page, "can this be undone" stops being about a commit you can revert, and the record has to answer whether the data can be put back.
