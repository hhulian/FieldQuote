# FieldQuote MVP Testing Checklist

Use this checklist to verify all features of the FieldQuote MVP during testing:

## Setup Verification
- [ ] Successfully installed Expo Go app on mobile device
- [ ] Successfully created Expo account
- [ ] Successfully cloned the repository
- [ ] Successfully installed dependencies
- [ ] Successfully started the Expo development server
- [ ] Successfully connected mobile device to the Expo server

## Voice Input Testing
- [ ] Microphone permissions granted
- [ ] Voice recording starts when microphone button is tapped
- [ ] Recording indicator shows while recording
- [ ] Recording stops when button is tapped again
- [ ] Speech is accurately transcribed to text
- [ ] Quick Record feature works as expected

## AI Quote Generation Testing
- [ ] Generate Quote button appears after transcription
- [ ] Progress indicator shows during quote generation
- [ ] Quote is generated with appropriate line items
- [ ] Line items match services mentioned in description
- [ ] Pricing calculations are correct (subtotal, tax, total)
- [ ] Quote number is generated correctly

## UI/UX Testing
- [ ] All screens render correctly
- [ ] Color scheme matches design system (Deep Blue, Bright Orange, Off-White, Dark Gray)
- [ ] Navigation between screens works properly
- [ ] Text input fields work correctly
- [ ] Buttons are responsive and provide feedback when tapped
- [ ] Error states are handled appropriately

## Test Scenarios
- [ ] Painting scenario: "I need to paint my living room and dining room"
- [ ] Plumbing scenario: "Fix a leaking pipe under the kitchen sink"
- [ ] Electrical scenario: "Install new lighting fixtures in the hallway"
- [ ] Multiple services: "Paint the bedroom, fix the bathroom sink, and install a ceiling fan"

## Performance Testing
- [ ] App loads in reasonable time
- [ ] Voice recording starts promptly
- [ ] Transcription completes in reasonable time
- [ ] Quote generation completes in reasonable time
- [ ] App remains responsive throughout all operations

## Notes
- Record any issues encountered during testing
- Note any suggestions for improvements
- Document any feature requests for future development

This checklist will help ensure thorough testing of all MVP features and identify any areas that need attention before proceeding to the next development phase.
