# FieldQuote Repository Structure

This document outlines the repository structure for the FieldQuote project, explaining the purpose and contents of each repository.

## Overview

The FieldQuote project is organized into the following repositories:

1. **design-system**: Contains design assets, color schemes, typography, and component styles
2. **mobile-app**: Contains the React Native mobile application code for iOS and Android
3. **messaging-integration**: Contains the code for WhatsApp and iMessage integration
4. **documentation**: Contains comprehensive project documentation

## Repository Details

### 1. design-system

**Purpose**: Centralized repository for all design assets and UI/UX guidelines.

**Contents**:
- Color palette definitions
- Typography specifications
- Component style guides
- Logo files and usage guidelines
- Mockups and prototypes
- Design tokens for development

### 2. mobile-app

**Purpose**: Main application codebase for the FieldQuote mobile app.

**Contents**:
- React Native application code
- Screen implementations
- Navigation structure
- State management
- Local data storage
- PDF generation
- Unit and integration tests

### 3. messaging-integration

**Purpose**: Dedicated repository for messaging platform integrations.

**Contents**:
- WhatsApp integration code
- iMessage integration code
- Message formatting utilities
- Share dialog components
- Platform-specific native modules
- Integration tests

### 4. documentation

**Purpose**: Comprehensive project documentation.

**Contents**:
- Project overview
- Technical architecture
- API documentation
- User guides
- Development setup instructions
- Contribution guidelines
- Release notes

## File Organization

Each repository follows a consistent structure:

```
repository-name/
├── README.md           # Repository overview and setup instructions
├── CHANGELOG.md        # Version history and changes
├── LICENSE             # License information
├── docs/               # Documentation files
│   ├── images/         # Documentation images
│   └── guides/         # Specific guides
├── src/                # Source code (for code repositories)
│   ├── components/     # Reusable components
│   ├── screens/        # Screen components
│   ├── services/       # Business logic and services
│   └── utils/          # Utility functions
├── assets/             # Static assets
│   ├── images/         # Image files
│   └── fonts/          # Font files
└── examples/           # Example usage
```

## Dependency Management

Dependencies between repositories are managed as follows:

- **design-system**: No dependencies on other repositories
- **mobile-app**: Depends on design-system for styling and UI components
- **messaging-integration**: Depends on mobile-app for data models and utilities
- **documentation**: References all other repositories

## Version Control Strategy

- Each repository is versioned independently
- Semantic versioning (MAJOR.MINOR.PATCH) is used
- Release tags are created for significant versions
- Branch naming convention: feature/feature-name, bugfix/bug-description, release/version-number

## Contribution Workflow

1. Create a new branch from main/master
2. Make changes and commit with descriptive messages
3. Create a pull request with detailed description
4. Request code review
5. Address feedback
6. Merge to main/master when approved

## Continuous Integration

- Automated tests run on pull requests
- Linting and code style checks
- Build verification
- Documentation generation
