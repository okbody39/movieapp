package com.movieapp;

import android.app.Application;
import android.util.Log;
import android.support.annotation.NonNull;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.RNSvgPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.mmazzarolo.beaconsandroid.BeaconsAndroidPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @NonNull
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add the packages you require here.
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
		new VectorIconsPackage(),
		new LinearGradientPackage(),
		new MapsPackage(),
		new BeaconsAndroidPackage(),
		new ReactNativeConfigPackage(),
		new RNSvgPackage(),
		new ReactNativePushNotificationPackage()

    );
  }
}
