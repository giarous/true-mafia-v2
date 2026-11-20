# True Mafia for Android

[Download True Mafia APK](https://github.com/giarous/true-mafia-v2/raw/refs/heads/main/releases/true-mafia-v2.apk)

Installed name: **True Mafia**. Application ID: `com.truemafia.v2`. App version: **2.2**.
The v2 suffix is only the installation identity: this app installs alongside the original `com.truemafia`, with separate app data.

Targets **Android 14 (API 34)**, compiled with API 34 and Android Gradle Plugin 8.2.2 / Gradle 8.5. See [build instructions](../android/README.md).

The transparent white-and-red artwork is placed on dark backgrounds for the splash, in-game logo, and launcher. Screens retain responsive, non-scrolling layouts.

Universal standalone APK built from source commit `c249512fa7ecdba171b5ddedf829127ed6fedfae`. Includes ARM64, ARMv7, x86, and x86_64 libraries, bundled JavaScript, and game audio; Metro is not required.

This release-mode build uses a local Android debug signing key for testing. Seven focused UI tests passed. APK signature, target SDK, installed name, installation identity, launcher pixels, and archive checks passed. Physical-device testing and native iOS validation have not been performed.

SHA-256:

```text
4e6041d95229dd4dc2a8ed5d607284bdf99510d101c8cec9cb770a3f897d1ea4
```
