
#import "AppDelegate.h"

#import <Foundation/Foundation.h> // ✅ NSString, NSDictionary için şart
#import <React/RCTBundleURLProvider.h>
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTComponentViewProtocol.h>

@implementation AppDelegate

- (NSDictionary<NSString *, Class<RCTComponentViewProtocol>> *)thirdPartyFabricComponents {
  NSMutableDictionary *components = [[super thirdPartyFabricComponents] mutableCopy] ?: [NSMutableDictionary new];

  // Bileşen isimlerini ve sınıflarını ayrı tutarak nil class'ları filtrele
  NSDictionary<NSString *, NSString *> *rawComponents = @{
    @"RNSScreen": @"RNSScreenView",
    @"RNSScreenContainer": @"RNSScreenContainerView",
    @"RNSScreenStack": @"RNSScreenStackView",
    @"RNSScreenStackHeaderConfig": @"RNSScreenStackHeaderConfig",
    @"RNSScreenStackHeaderSubview": @"RNSScreenStackHeaderSubview",
    @"RNSScreenNavigationContainer": @"RNSScreenNavigationContainerView",
    @"RNSFullWindowOverlay": @"RNSFullWindowOverlay",
    @"RNSModalScreen": @"RNSModalScreen",
    @"RNCSafeAreaProvider": @"RNCSafeAreaProvider"
  };

  for (NSString *key in rawComponents) {
    Class cls = NSClassFromString(rawComponents[key]);
    if (cls != nil) {
      components[key] = cls;
    }
  }

  return components;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"bridges";
  self.dependencyProvider = [RCTAppDependencyProvider new];
  [GMSServices provideAPIKey:@"AIzaSyDMpDGbYUPOA1P6swkP2DW_aIJZAw_GEWs"];
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
