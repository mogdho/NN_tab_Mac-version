#!/bin/zsh
# Builds the Safari version of NN Tab.
#
#   1. Copies the extension files into dist/safari
#   2. Writes a Safari manifest (no toolbar popup: the button opens Settings in a tab)
#   3. Creates the Xcode project in safari-app/ (first run only)
#   4. Builds NN Tab.app into safari-app/build
#
# Usage: ./scripts/build-safari.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist/safari"
APP_DIR="$ROOT/safari-app"

echo "→ Copying extension files to dist/safari"
rm -rf "$DIST"
mkdir -p "$DIST"
cp -R "$ROOT/index.html" "$ROOT/backup.html" "$ROOT/tab.png" "$ROOT/css" "$ROOT/js" "$DIST/"

echo "→ Writing Safari manifest"
python3 -I - "$ROOT/manifest.json" "$DIST/manifest.json" <<'PY'
import json, sys
src, dst = sys.argv[1], sys.argv[2]
m = json.load(open(src))
m["action"].pop("default_popup", None)
json.dump(m, open(dst, "w"), indent=2)
PY

if [[ ! -d "$APP_DIR" ]]; then
    echo "→ Creating Xcode project in safari-app/ (first run)"
    xcrun safari-web-extension-converter "$DIST" \
        --project-location "$APP_DIR" \
        --app-name "NN Tab" \
        --bundle-identifier com.sandippal.nntab \
        --macos-only --swift --no-open --no-prompt --force
    # The converter derives the app ID from the app name ("com.sandippal.NN-Tab"),
    # which doesn't prefix the extension ID; make them match.
    sed -i '' 's/"com.sandippal.NN-Tab"/com.sandippal.nntab/g' \
        "$APP_DIR/NN Tab/NN Tab.xcodeproj/project.pbxproj"
fi

# Signed with your Apple Development certificate so Safari keeps the
# extension enabled without "Allow Unsigned Extensions".
# Override with: TEAM_ID=XXXXXXXXXX ./scripts/build-safari.sh
TEAM_ID="${TEAM_ID:-FDD637255N}"

echo "→ Building NN Tab.app (team $TEAM_ID)"
xcodebuild -project "$APP_DIR/NN Tab/NN Tab.xcodeproj" \
    -scheme "NN Tab" -configuration Release \
    -derivedDataPath "$APP_DIR/build" \
    CODE_SIGN_STYLE=Automatic DEVELOPMENT_TEAM="$TEAM_ID" \
    -allowProvisioningUpdates \
    -quiet build

APP="$APP_DIR/build/Build/Products/Release/NN Tab.app"
echo ""
echo "✓ Built: $APP"
echo "  Next: open it once, then enable NN Tab in Safari → Settings → Extensions."
