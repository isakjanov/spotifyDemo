package com.superdupermusic.modules;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.spotify.sdk.android.authentication.AuthenticationClient;
import com.spotify.sdk.android.authentication.AuthenticationRequest;
import com.spotify.sdk.android.authentication.AuthenticationResponse;

import static com.superdupermusic.modules.SpotifyData.REDIRECT_URI;
import static com.superdupermusic.modules.SpotifyData.SPOTIFY_CLIENT_ID;

/**
 * Created on 2/16/17.
 */

public class SpotifyAuthModuleAndroid extends ReactContextBaseJavaModule {

    private static final String TAG = "SPOTIFY_AUTH_MODULE";

    private static final int REQUEST_CODE = 1337;

    private Callback mErrorCallback;
    private Callback mSuccessCallback;


    public SpotifyAuthModuleAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "SpotifyAuthModuleAndroid";
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == REQUEST_CODE && mSuccessCallback != null) {
                AuthenticationResponse response = AuthenticationClient.getResponse(resultCode, data);
                switch (response.getType()) {
                    // Response was successful and contains auth token
                    case TOKEN:
                        mSuccessCallback.invoke(response.getAccessToken());
                        break;

                    // Auth flow returned an error
                    case ERROR:
                        mErrorCallback.invoke(response.getError());
                        break;
                    // Most likely auth flow was cancelled
                    default:
                        mErrorCallback.invoke();
                        // Handle other cases
                }
            }
        }
    };

    @ReactMethod
    public void startAuthProcess(Callback errorCallback, Callback successCallback) {
        if (getCurrentActivity() == null) {
            errorCallback.invoke();
            return;
        }

        mErrorCallback = errorCallback;
        mSuccessCallback = successCallback;

        AuthenticationRequest.Builder builder =
                new AuthenticationRequest.Builder(SPOTIFY_CLIENT_ID, AuthenticationResponse.Type.TOKEN, REDIRECT_URI);

        builder.setScopes(new String[]{"streaming"});
        AuthenticationRequest request = builder.build();

        AuthenticationClient.openLoginActivity(getCurrentActivity(), REQUEST_CODE, request);
    }


    @ReactMethod
    public void logOut() {
        AuthenticationClient.clearCookies(getCurrentActivity());
    }
}
