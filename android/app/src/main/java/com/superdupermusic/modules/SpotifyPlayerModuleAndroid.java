package com.superdupermusic.modules;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.spotify.sdk.android.player.Config;
import com.spotify.sdk.android.player.ConnectionStateCallback;
import com.spotify.sdk.android.player.Error;
import com.spotify.sdk.android.player.Player;
import com.spotify.sdk.android.player.PlayerEvent;
import com.spotify.sdk.android.player.Spotify;
import com.spotify.sdk.android.player.SpotifyPlayer;

/**
 * Created on 2/27/17.
 */

public class SpotifyPlayerModuleAndroid extends ReactContextBaseJavaModule implements
        ConnectionStateCallback,
        Player.NotificationCallback {


    private static final String TAG = "SPOTIFY_PLAYER_MODULE";

    private Player mPlayer;

    private Promise playerInitializePromise;
    private Promise playAlbumPromise;
    private Promise pauseAlbumPromise;

    public SpotifyPlayerModuleAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SpotifyPlayerModuleAndroid";
    }

    @ReactMethod
    public void initPlayer(String accessToken, Promise promise) {
        playerInitializePromise = promise;

        Config playerConfig = new Config(getCurrentActivity(), accessToken, SpotifyData.SPOTIFY_CLIENT_ID);

        Spotify.getPlayer(playerConfig, this, new SpotifyPlayer.InitializationObserver() {
            @Override
            public void onInitialized(SpotifyPlayer spotifyPlayer) {
                mPlayer = spotifyPlayer;
                mPlayer.addConnectionStateCallback(SpotifyPlayerModuleAndroid.this);
                mPlayer.addNotificationCallback(SpotifyPlayerModuleAndroid.this);
            }

            @Override
            public void onError(Throwable throwable) {
                Log.e(TAG, "Could not initialize player: " + throwable.getMessage());
            }
        });
    }

    @ReactMethod
    public void play(String uri, Promise promise) {
        playAlbumPromise = promise;
        mPlayer.playUri(uri, 0, 0);
    }

    @ReactMethod
    public void pause(Promise promise) {
        pauseAlbumPromise = promise;
        mPlayer.pause();
    }

    @ReactMethod
    public void destroyPlayer() {
        Spotify.destroyPlayer(this);
    }

    @Override
    public void onLoggedIn() {
        if (playerInitializePromise != null) {
            playerInitializePromise.resolve("success");
        }
        Log.d(TAG, "onLoggedIn");
    }

    @Override
    public void onLoggedOut() {
        Log.d(TAG, "onLoggedOut");
    }

    @Override
    public void onLoginFailed(int i) {
        if (playerInitializePromise != null) {
            playerInitializePromise.reject("error", "failed to auth");
        }
        Log.d(TAG, "onLoginFailed");
    }

    @Override
    public void onTemporaryError() {
        Log.d(TAG, "onTemporaryError");
    }

    @Override
    public void onConnectionMessage(String s) {
        Log.d(TAG, "onConnectionMessage");
    }

    @Override
    public void onPlaybackEvent(PlayerEvent playerEvent) {
        switch(playerEvent) {
            case kSpPlaybackNotifyPlay:
                // Start playing
                if (playAlbumPromise != null) {
                    Log.d(TAG, "play");
                    playAlbumPromise.resolve("success");
                }
                break;
            case kSpPlaybackNotifyPause:
                if (pauseAlbumPromise != null) {
                    Log.d(TAG, "pause");
                    pauseAlbumPromise.resolve("success");
                }
                break;
        }
    }

    @Override
    public void onPlaybackError(Error error) {
        Log.d(TAG, "error happened, we should inform user");
    }
}
