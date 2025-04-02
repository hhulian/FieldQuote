# FieldQuote Mobile App

This repository contains the mobile application code for FieldQuote, a professional quote generation app for field service professionals.

## Overview

FieldQuote is a mobile-native application for iOS and Android that allows field service professionals to quickly create, manage, and share quotes with clients. The app features voice input for job descriptions, AI-assisted line item suggestions, and seamless sharing via messaging platforms.

## Features

- **User Authentication**: Email/password and social login (Google, Apple)
- **Quote Creation**: Voice input, AI suggestions, manual editing
- **Quote Management**: View, edit, and track quotes
- **Client Management**: Store and manage client information
- **Quote Sharing**: Share via WhatsApp, iMessage, Email
- **PDF Generation**: Create professional PDF quotes

## Directory Structure

```
mobile-app/
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── services/       # Business logic and services
│   └── utils/          # Utility functions
├── assets/             # Static assets
│   ├── images/         # Image files
│   └── mockups/        # UI mockups
└── docs/               # Documentation
```

## Mockups

The `assets/mockups` directory contains HTML mockups of the key screens:

- **Onboarding**: Welcome, sign-in, and sign-up screens
- **Quote Creation**: Job description, voice input, line items, and preview screens
- **Quote Management**: Quote history and quote details screens
- **Client Management**: Client list and client profile screens

## Implementation Details

### Technology Stack

- **Framework**: React Native
- **State Management**: Redux
- **Navigation**: React Navigation
- **UI Components**: Custom components based on design system
- **Data Storage**: SQLite (local)
- **Authentication**: Firebase Authentication
- **PDF Generation**: react-native-pdf

### Key Components

- **VoiceInput**: Handles voice recording and transcription
- **QuoteBuilder**: Manages the quote creation flow
- **LineItemSuggestion**: Provides AI-suggested line items
- **QuotePreview**: Displays a preview of the quote
- **ShareQuote**: Handles quote sharing via different platforms

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm start` or `yarn start`
4. Run on iOS: `npm run ios` or `yarn ios`
5. Run on Android: `npm run android` or `yarn android`

## Development Guidelines

- Follow the design system guidelines for UI components
- Write unit tests for all business logic
- Use TypeScript for type safety
- Follow the Git workflow described in the repository structure document

## Related Repositories

- [design-system](../design-system): UI/UX design system and assets
- [messaging-integration](../messaging-integration): WhatsApp and iMessage integration
- [documentation](../documentation): Comprehensive project documentation
