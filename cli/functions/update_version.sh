## Show Help
showHelp_release() {
cat << EOF
    Usage: cli.sh release [option]

    options :
        --major     |   Major
        --minor     |   Minor
        --patch     |   Patch
        --help      |   Show this help

EOF
}

update_type=$(echo "$@" | xargs)
if [[ $update_type == "--patch" ]] ||  [[ $update_type == "--minor" ]] || [[ $update_type == "--major" ]]; then

  if [ ! -f "package.json" ]; then
      echo package.json not found in $( pwd )
      exit 0;
  fi

  # Get current version
  CURRENT_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');
  NEW_VERSION=$CURRENT_VERSION

  # Spilt $CURRENT_VERSION
  mapfile -td \. versions < <(printf "%s\0" "$CURRENT_VERSION")
  if [[ $update_type == "--major" ]]; then
    MESSAGE=' ----> NEW MAJOR RELEASE --->'
    NEW_VERSION=$((${versions[0]}+1)).0.0
  elif [[ $update_type == "--minor" ]]; then
    MESSAGE=' ----> NEW MINOR RELEASE --->'
    NEW_VERSION=${versions[0]}.$((${versions[1]}+1)).0
  elif [[ $update_type == "--patch" ]]; then
    MESSAGE=$' ----> NEW PATCH --->'
    NEW_VERSION=${versions[0]}.${versions[1]}.$((${versions[2]}+1))
  else
     echo $'    No updates found...\n'
  fi

  if [[ $CURRENT_VERSION != $NEW_VERSION ]] ; then
    # Print message about new version
    echo '    '$MESSAGE$'\n'
    echo '--> Gathering informations'
    export REACT_APP_CLIENT_COMMIT_HASH=$(git rev-parse --short HEAD)
    today=$(date +'%Y.%m.%d')
    export REACT_APP_CLIENT_VERSION=$NEW_VERSION'_v'$today
    VERSION_MESSAGE='Version   |   '$CURRENT_VERSION' '$MESSAGE' '$NEW_VERSION
    cat << EOF

      ------------------------------------------------------------
      |
      |  $VERSION_MESSAGE
      |
      |  Commit    | '$REACT_APP_CLIENT_COMMIT_HASH'
      |
      ------------------------------------------------------------

EOF
  echo '--> Updating versions...'

  # https://zhu45.org/posts/2016/Dec/21/environment-variable-substitution-using-sed/
  # .env
  sed -i 's|^REACT_APP_CLIENT_VERSION=.*$|REACT_APP_CLIENT_VERSION='$REACT_APP_CLIENT_VERSION'|g' .env.development
  sed -i 's|^REACT_APP_CLIENT_VERSION=.*$|REACT_APP_CLIENT_VERSION='$REACT_APP_CLIENT_VERSION'|g' .env.test
  sed -i 's|^REACT_APP_CLIENT_VERSION=.*$|REACT_APP_CLIENT_VERSION='$REACT_APP_CLIENT_VERSION'|g' .env.production
  sed -i 's|^REACT_APP_CLIENT_COMMIT_HASH=.*$|REACT_APP_CLIENT_COMMIT_HASH='$REACT_APP_CLIENT_COMMIT_HASH'|g' .env.development
  sed -i 's|^REACT_APP_CLIENT_COMMIT_HASH=.*$|REACT_APP_CLIENT_COMMIT_HASH='$REACT_APP_CLIENT_COMMIT_HASH'|g' .env.test
  sed -i 's|^REACT_APP_CLIENT_COMMIT_HASH=.*$|REACT_APP_CLIENT_COMMIT_HASH='$REACT_APP_CLIENT_COMMIT_HASH'|g' .env.production
  # Sonar
  sed -i 's|^sonar.projectVersion=.*$|sonar.projectVersion='$NEW_VERSION'|g' sonar-project.properties
  # Package.json
  sed -i 's|\"version\": \".*\..*\..*\"|\"version\": \"'$NEW_VERSION'\"|g' package.json

  echo '  Done...'

  fi

else
  # Invalid option / show help
  #if [[ $update_type != "--help" ]] && [[ $update_type != "" ]]; then
  #  echo "Option is not valid : "$update_type
  #fi
  showHelp_release
  exit 1
fi
