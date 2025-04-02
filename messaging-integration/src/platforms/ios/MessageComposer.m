// iOS Native Module for iMessage Integration
// This would be implemented in Objective-C or Swift in a real application
// MessageComposer.m

#import "MessageComposer.h"
#import <MessageUI/MessageUI.h>

@interface MessageComposer () <MFMessageComposeViewControllerDelegate>
@property (nonatomic, strong) RCTResponseSenderBlock callback;
@end

@implementation MessageComposer

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(canSendText:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve(@([MFMessageComposeViewController canSendText]));
}

RCT_EXPORT_METHOD(send:(NSDictionary *)options
                  callback:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    if (![MFMessageComposeViewController canSendText]) {
      callback(@[@"error", @"Device cannot send text messages"]);
      return;
    }
    
    self.callback = callback;
    
    MFMessageComposeViewController *messageController = [[MFMessageComposeViewController alloc] init];
    messageController.messageComposeDelegate = self;
    
    if (options[@"recipients"]) {
      messageController.recipients = options[@"recipients"];
    }
    
    if (options[@"body"]) {
      messageController.body = options[@"body"];
    }
    
    // Handle attachments if provided
    if (options[@"attachments"] && [options[@"attachments"] isKindOfClass:[NSArray class]]) {
      for (NSDictionary *attachment in options[@"attachments"]) {
        NSString *url = attachment[@"url"];
        NSString *typeIdentifier = attachment[@"typeIdentifier"];
        NSString *filename = attachment[@"filename"];
        
        if (url && typeIdentifier) {
          // Convert file:// URL to local path
          if ([url hasPrefix:@"file://"]) {
            url = [url substringFromIndex:7];
          }
          
          NSData *data = [NSData dataWithContentsOfFile:url];
          if (data) {
            BOOL success = [messageController addAttachmentData:data
                                                typeIdentifier:typeIdentifier
                                                      filename:filename ?: @"attachment"];
            if (!success) {
              NSLog(@"Failed to add attachment: %@", url);
            }
          }
        }
      }
    }
    
    UIViewController *rootViewController = RCTKeyWindow().rootViewController;
    while (rootViewController.presentedViewController) {
      rootViewController = rootViewController.presentedViewController;
    }
    
    [rootViewController presentViewController:messageController animated:YES completion:nil];
  });
}

#pragma mark - MFMessageComposeViewControllerDelegate

- (void)messageComposeViewController:(MFMessageComposeViewController *)controller
                 didFinishWithResult:(MessageComposeResult)result
{
  switch (result) {
    case MessageComposeResultCancelled:
      self.callback(@[@"cancelled", @"User cancelled"]);
      break;
    case MessageComposeResultFailed:
      self.callback(@[@"error", @"Message failed to send"]);
      break;
    case MessageComposeResultSent:
      self.callback(@[@"sent", @"Message sent successfully"]);
      break;
    default:
      self.callback(@[@"unknown", @"Unknown result"]);
      break;
  }
  
  [controller dismissViewControllerAnimated:YES completion:nil];
}

@end
