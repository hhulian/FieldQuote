// This is a mockup file to simulate screenshots for the FieldQuote app
// In a real implementation, these would be actual screenshots captured from the running app

// Demo Instructions Screen
const DemoInstructionsScreenMockup = `
+-----------------------------------------------+
|                 FieldQuote Demo               |
+-----------------------------------------------+
|                                               |
|  Welcome to FieldQuote!                       |
|                                               |
|  This demo showcases the voice input and      |
|  AI quote generation features.                |
|                                               |
|  Voice Input Feature:                         |
|  1. Navigate to Quote Creation screen         |
|  2. Tap the microphone button                 |
|  3. Describe a job                            |
|  4. Tap again to stop recording               |
|  5. The app will transcribe your speech       |
|                                               |
|  AI Quote Generation:                         |
|  1. After transcription, tap "Generate Quote" |
|  2. AI will analyze and identify services     |
|  3. A quote will be generated                 |
|  4. Review the generated quote                |
|                                               |
|  +----------------------------------+         |
|  |           Start Demo             |         |
|  +----------------------------------+         |
|                                               |
+-----------------------------------------------+
`;

// Quote Creation Screen - Initial State
const QuoteCreationInitialMockup = `
+-----------------------------------------------+
|              Create New Quote                 |
+-----------------------------------------------+
|                                               |
|  Job Description                              |
|  +-----------------------------------+        |
|  |                                   |        |
|  | Describe the job or use voice     |        |
|  | input below                       |        |
|  |                                   |        |
|  +-----------------------------------+        |
|                                               |
|  Or use voice input:                          |
|                                               |
|           +-------------+                     |
|           |     🎤      |                     |
|           +-------------+                     |
|                                               |
|           Quick Record                        |
|                                               |
+-----------------------------------------------+
`;

// Quote Creation Screen - Recording State
const QuoteCreationRecordingMockup = `
+-----------------------------------------------+
|              Create New Quote                 |
+-----------------------------------------------+
|                                               |
|  Job Description                              |
|  +-----------------------------------+        |
|  |                                   |        |
|  | Describe the job or use voice     |        |
|  | input below                       |        |
|  |                                   |        |
|  +-----------------------------------+        |
|                                               |
|  Or use voice input:                          |
|                                               |
|           +-------------+                     |
|           |     ⏹️      |                     |
|           +-------------+                     |
|                                               |
|           Recording... Tap to stop            |
|                                               |
+-----------------------------------------------+
`;

// Quote Creation Screen - Transcription Complete
const QuoteCreationTranscribedMockup = `
+-----------------------------------------------+
|              Create New Quote                 |
+-----------------------------------------------+
|                                               |
|  Job Description                              |
|  +-----------------------------------+        |
|  |                                   |        |
|  | I need to paint two bedrooms and  |        |
|  | repair a leaking faucet in the    |        |
|  | bathroom                          |        |
|  +-----------------------------------+        |
|                                               |
|  Or use voice input:                          |
|                                               |
|           +-------------+                     |
|           |     🎤      |                     |
|           +-------------+                     |
|                                               |
|  +--------------------------------------+     |
|  |           Generate Quote             |     |
|  +--------------------------------------+     |
|                                               |
+-----------------------------------------------+
`;

// Quote Creation Screen - Generating Quote
const QuoteCreationGeneratingMockup = `
+-----------------------------------------------+
|              Create New Quote                 |
+-----------------------------------------------+
|                                               |
|  Job Description                              |
|  +-----------------------------------+        |
|  |                                   |        |
|  | I need to paint two bedrooms and  |        |
|  | repair a leaking faucet in the    |        |
|  | bathroom                          |        |
|  +-----------------------------------+        |
|                                               |
|  +--------------------------------------+     |
|  |          Generating Quote...         |     |
|  |                                      |     |
|  |  [====================------] 75%    |     |
|  +--------------------------------------+     |
|                                               |
+-----------------------------------------------+
`;

// Quote Creation Screen - Quote Generated
const QuoteCreationCompleteMockup = `
+-----------------------------------------------+
|              Create New Quote                 |
+-----------------------------------------------+
|                                               |
|  Generated Quote                              |
|  Quote #: FQ-123456-789                       |
|                                               |
|  Job Description:                             |
|  I need to paint two bedrooms and repair a    |
|  leaking faucet in the bathroom               |
|                                               |
|  Painting service             $250            |
|  Repair work                  $120            |
|  Materials                    $75             |
|  Labor - 2 hours              $120            |
|                                               |
|  Subtotal                     $565            |
|  Tax                          $45             |
|  Total                        $610            |
|                                               |
|  +--------------------------------------+     |
|  |           Share Quote                |     |
|  +--------------------------------------+     |
|                                               |
|  +--------------------------------------+     |
|  |           Create New Quote           |     |
|  +--------------------------------------+     |
|                                               |
+-----------------------------------------------+
`;

// Export all mockups
console.log("FieldQuote App UI Mockups Generated");
