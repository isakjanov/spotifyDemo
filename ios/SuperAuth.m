//
//  SuperAuth.m
//  SuperDuperMusic
//
//  Created by Tim Isakjanov on 2/28/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "SuperAuth.h"
#import "AppDelegate.h"

#import <SpotifyAuthentication/SpotifyAuthentication.h>
#import <SpotifyAudioPlayback/SpotifyAudioPlayback.h>
#import <SafariServices/SafariServices.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>

@interface SuperAuth ()

@property (nonatomic, strong) SPTAuth *auth;
@property (nonatomic, strong) SPTAudioStreamingController *player;
@property (nonatomic, strong) UIViewController *authViewController;
@property (strong) RCTResponseSenderBlock fetchTokenCallback;

@end

@implementation SuperAuth

@synthesize bridge = _bridge;

- (instancetype)init {
  
  self = [super init];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(dismissAuthViewController:) name:@"SpotifyAuth" object:nil];
  
  return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(fetchToken:(RCTResponseSenderBlock)callback)
{
  self.fetchTokenCallback = callback;
  
  // NSLog(@"Pretending to create an event %@", name);
  
  self.auth = [SPTAuth defaultInstance];
  self.player = [SPTAudioStreamingController sharedInstance];
  // The client ID you got from the developer site
  self.auth.clientID = @"43b53c4974ed4d6c92fc20c3fa3e4c59";
  // The redirect URL as you entered it at the developer site
  self.auth.redirectURL = [NSURL URLWithString:@"superduperapp://callback"];
  // Setting the `sessionUserDefaultsKey` enables SPTAuth to automatically store the session object for future use.
  self.auth.sessionUserDefaultsKey = @"current session";
  // Set the scopes you need the user to authorize. `SPTAuthStreamingScope` is required for playing audio.
  self.auth.requestedScopes = @[SPTAuthStreamingScope];
  
  // Become the streaming controller delegate
  self.player.delegate = self;
  
  // Start up the streaming controller.
  NSError *audioStreamingInitError;
  NSAssert([self.player startWithClientId:self.auth.clientID error:&audioStreamingInitError],
           @"There was a problem starting the Spotify SDK: %@", audioStreamingInitError.description);
  
  // Start authenticating when the app is finished launching
  dispatch_async(dispatch_get_main_queue(), ^{
    [self startAuthenticationFlow];
  });
}

- (void)startAuthenticationFlow
{
  // Check if we could use the access token we already have
  if ([self.auth.session isValid]) {
    // Use it to log in
    [self.player loginWithAccessToken:self.auth.session.accessToken];
  } else {
    // Get the URL to the Spotify authorization portal
    NSURL *authURL = [self.auth spotifyWebAuthenticationURL];
    // Present in a SafariViewController
    self.authViewController = [[SFSafariViewController alloc] initWithURL:authURL];
    [[UIApplication sharedApplication].delegate.window.rootViewController presentViewController:self.authViewController animated:YES completion:nil];
  }
}

- (void)dismissAuthViewController:(NSNotification *)notification {
  
  if ([notification.name isEqualToString:@"SpotifyAuth"])
  {
    [self.authViewController.presentingViewController dismissViewControllerAnimated:YES completion:nil];
    self.authViewController = nil;
    
    AppDelegate *appDelegate = (AppDelegate *) [UIApplication sharedApplication].delegate;
    if (appDelegate.spotifyToken == nil) {
      NSDictionary *error = RCTMakeError(@"There is no spotify token.", nil, nil);
      self.fetchTokenCallback(@[error, [NSNull null]]);
    } else {
      self.fetchTokenCallback(@[[NSNull null], appDelegate.spotifyToken]);
    }

    self.fetchTokenCallback = nil;
    
//    
//    
//    NSString *accessToken = notification.userInfo[@"accessToken"];
//    if (accessToken) {
//      [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
//                                                   body:@{@"accessToken": accessToken}];
//    }
  }
}

- (void)dealloc {
  
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
