## Show Help
show_help() {
cat << EOF
	Usage: ${0##*/} [option]

	Option :
		# Update version
		  --major			Major
		  --minor			Minor
		  --patch			Patch

EOF
}

if [ ! -f "package.json" ]; then
		echo package.json not found in $( pwd )
    exit 0;
fi

# Pick current version from package.json
CURRENT_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');
NEW_VERSION=$CURRENT_VERSION

if [[ $NODE_ENV == "" ]] ||  [[ $NODE_ENV == "development" ]]; then
  ## Defaults
  major=0
  minor=0
  path=0

  i=1
  j=$# ## Number of inputs
  while [ $i -le $j ]
    #TODO: Convert to lower case
    do
        case $1 in
        --major) major=1;;
        --minor) minor=1;;
        --patch) patch=1;;
        *)
            show_help >&2
            exit 1
            ;;
        esac;
        i=$((i + 1));
        ## Move to next input
        shift 1;
    done

  mapfile -td \. versions < <(printf "%s\0" "$CURRENT_VERSION")
  if [[ $major -eq 1 ]] ; then
    MESSAGE=' ----> NEW MAJOR RELEASE --->'
    echo '    '$MESSAGE$'\n'
    NEW_VERSION=$((${versions[0]}+1)).0.0
  fi
  if [[ $minor -eq 1 ]] ; then
    MESSAGE=' ----> NEW MINOR RELEASE --->'
    echo '    '$MESSAGE$'\n'
    NEW_VERSION=${versions[0]}.$((${versions[1]}+1)).0
  fi
  if [[ $patch -eq 1 ]] ; then
    MESSAGE=$' ----> NEW PATCH --->'
    echo '    '$MESSAGE$'\n'
    NEW_VERSION=${versions[0]}.${versions[1]}.$((${versions[2]}+1))
  fi

  if [[ $major -eq 0 ]] && [[ $minor -eq 0 ]] && [[ $patch -eq 0 ]] ; then
    echo $'    No updates found...\n'
  fi
fi

if [[ $CURRENT_VERSION != $NEW_VERSION ]] ; then
  VERSION_MESSAGE='Version   |   '$CURRENT_VERSION' '$MESSAGE' '$NEW_VERSION
else
  VERSION_MESSAGE='Version   |   '$CURRENT_VERSION
fi

echo '--> Gathering informations'
export REACT_APP_CLIENT_COMMIT_HASH=$(git rev-parse --short HEAD)
today=$(date +'%Y.%m.%d')
export REACT_APP_CLIENT_VERSION=$NEW_VERSION'_v'$today

echo $VERSION_MESSAGE >> hooks/pre-commit.log

cat << EOF

  ------------------------------------------------------------
  |
  |  $VERSION_MESSAGE
  |
  |  Commit    | '$REACT_APP_CLIENT_COMMIT_HASH
  |
  ------------------------------------------------------------

EOF

if [[ $NODE_ENV == "" ]] ||  [[ $NODE_ENV == "development" ]]; then
  echo '--> Updating versions...'

  # https://zhu45.org/posts/2016/Dec/21/environment-variable-substitution-using-sed/
  # .env
  sed -i 's|^REACT_APP_CLIENT_VERSION=.*$|REACT_APP_CLIENT_VERSION='$REACT_APP_CLIENT_VERSION'|g' .env
  sed -i 's|^REACT_APP_CLIENT_COMMIT_HASH=.*$|REACT_APP_CLIENT_COMMIT_HASH='$REACT_APP_CLIENT_COMMIT_HASH'|g' .env
  # Sonar
  sed -i 's|^sonar.projectVersion=.*$|sonar.projectVersion='$NEW_VERSION'|g' sonar-project.properties
  # Package.json
  sed -i 's|\"version\": \".\..\..\"|\"version\": \"'$NEW_VERSION'\"|g' package.json

  echo '  Done...'
fi
