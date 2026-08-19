# Feature Specification: Remove Internal LLM Provider Decision from Public Site

**Feature Branch**: `003-remove-llm-providers-page`  
**Created**: 2026-08-18  
**Status**: Draft  
**Input**: User description: "whythe LLM providers page listed in the web? it's an internal website archtectural chatbot (which will be built later) decision."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Keep Internal Architecture Out of Public Navigation (Priority: P1)

As a visitor to The Bridge Balance, I should not see the internal LLM-provider decision page in the public textbook, because provider selection supports a future chatbot and is not current learning content.

**Why this priority**: The public site should present only learner-facing content. Exposing an unfinished internal decision creates confusion about what is available now and implies that a future chatbot is already part of the product.

**Independent Test**: Build and serve the textbook, then inspect the navigation and direct route for the former page. The page must not be discoverable through public navigation and the former route must not render the internal decision content.

**Acceptance Scenarios**:

1. **Given** the public textbook is loaded, **When** a visitor scans the sidebar and other learner-facing navigation, **Then** no link or label for LLM providers, provider comparison, or chatbot architecture is displayed.
2. **Given** a visitor requests the former LLM-provider page route, **When** the site handles the request, **Then** it returns the site's normal missing-page behavior rather than rendering the internal decision page.
3. **Given** the repository contains the future chatbot architecture decision, **When** maintainers inspect the source, **Then** the decision remains available internally outside the public documentation tree.

### Edge Cases

- A stale browser cache or previously indexed URL must not cause the current build to render the removed page; a fresh build must contain no page generated from the former document.
- References elsewhere in public Markdown, frontmatter, or navigation must not point to the removed page.
- Backend provider abstractions and ADR material must remain unchanged; this feature removes public exposure, not the future chatbot architecture.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The public textbook MUST NOT generate a documentation page from the internal LLM-provider decision document.
- **FR-002**: Public navigation MUST NOT contain an entry, label, or link for the removed LLM-provider page.
- **FR-003**: The generated site MUST respond to the former page URL with the site's standard not-found behavior rather than the removed page content.
- **FR-004**: The repository MUST preserve the future chatbot's provider decision in an internal project artifact that is not part of the public documentation content tree.
- **FR-005**: The change MUST NOT remove or alter backend provider interfaces, provider implementations, or configuration needed for the future chatbot.
- **FR-006**: Public content MUST NOT contain links that target the removed page or present the future chatbot provider decision as a current textbook feature.

### Key Entities

- **Public documentation page**: A rendered learner-facing route generated from content in the textbook documentation tree.
- **Internal architecture decision**: Repository-only material describing future chatbot provider selection, retained for maintainers and future implementation work.
- **Public navigation entry**: Any sidebar, menu, index, or cross-reference that exposes a documentation route to visitors.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A fresh production build generates zero public routes from the former LLM-provider document.
- **SC-002**: A navigation/content scan finds zero public links or labels targeting the former LLM-provider page.
- **SC-003**: The existing backend provider source files remain present and unchanged by this feature.
- **SC-004**: A maintainer can locate the retained provider decision in the repository without it being rendered as learner-facing textbook content.
