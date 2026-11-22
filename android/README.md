# Android development

The installed app is **True Mafia**. Its application ID is `com.truemafia.v2`, so it can coexist with the original `com.truemafia` app. The namespace stays `com.truemafia` to preserve the Java classes.

## Toolchain

- Android 14 SDK (API 34), build tools 34.0.0, accepted SDK licenses
- Gradle 8.5 and Android Gradle Plugin 8.2.2
- JDK 21 (tested); Gradle also supports JDK 17
- Node 16.20.2 and Yarn 1.22.22 for the existing React Native JavaScript toolchain

The APK targets API 34 and retains the original minimum API 16. Targeting Android 14 avoids the old Android 9 target without opting into the latest Android release's behavior changes.

From the repository root, run `yarn install --frozen-lockfile --non-interactive`. Yarn is the project's package manager. Set `ANDROID_HOME` to your SDK directory and activate the JDK and Node versions above.

## Build a standalone test APK

From this directory:

```bash
# Create a local test signing key only if one does not already exist.
if [ ! -f app/debug.keystore ]; then
  keytool -genkeypair -keystore app/debug.keystore \
    -storepass android -keypass android -alias androiddebugkey \
    -dname 'CN=Android Debug,O=Android,C=US' \
    -keyalg RSA -keysize 2048 -validity 10000
fi
./gradlew assembleRelease
```

The output is `app/build/outputs/apk/release/app-release.apk`. It contains all four native architectures, game audio, and the production JavaScript bundle, so Metro is not needed. The included signing configuration is for testing; production distribution requires a private release signing key. Do not commit keystores.

The generated asset/resource directories are registered through the Android Components API. Gradle therefore tracks bundling dependencies for resource mapping, packaging, and lint.

## Existing native modules

The app retains React Native 0.60.4 and its game logic. The build adapters in `native-modules/` compile the installed gesture-handler, keep-awake, and sound Java sources with modern Android namespaces, without editing dependency files. Their original manifests only declared their namespaces. The packages are explicitly registered in `MainApplication.java`; update both places if adding a native dependency.

## Branding

`resources/mafia_logo.png` is the supplied transparent white-and-red logo. The splash and in-game header place it on the dark app background. The Android adaptive icon preserves its transparent foreground over the same dark background; legacy launcher and iOS icon sizes are flattened onto that background for platform compatibility. Visible labels say True Mafia; v2 is only the Android installation identity.

## Checks

From the repository root, `yarn test --runInBand --watch=false` checks entry/selection behavior, non-scrolling resize behavior, branding, and the three-second splash transition. APK builds and signature/resource checks do not replace testing on a device. iOS assets are supplied but require macOS/Xcode for native validation.
