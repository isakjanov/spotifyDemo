/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SuperDuperMusic"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary *)options
{
  // If the incoming url is what we expect we handle it
  if ([[url scheme] isEqualToString:@"superduperapp"]) {
    // Close the authentication window
    
    NSString * callback = [url absoluteString];
    NSLog(@"URL path: %@", callback);
   
    NSRange start = [callback rangeOfString:@"access_token="];
    NSRange end = [callback rangeOfString:@"&token_type"];
    NSRange tokenRange = NSMakeRange(start.location + start.length, end.location - (start.location + start.length));
    NSString * token = [callback substringWithRange:tokenRange];
    
    self.spotifyToken = token;

    [[NSNotificationCenter defaultCenter] postNotificationName:@"SpotifyAuth" object:nil];
    
    return YES;
  }
  return NO;
}

@end
