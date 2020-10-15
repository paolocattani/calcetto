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

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CURRENT_VERSION=$(cat $SCRIPT_DIR/../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');
NEW_VERSION=$CURRENT_VERSION

if [[ $NODE_ENV == "" ]] ||  [[ $NODE_ENV == "development" ]]; then
  echo '--> Parsing input '
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

  mapFile -td \. versions < <(printf "%s\0" "$CURRENT_VERSION")
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

cat << EOF

  ------------------------------------------------------------
  |
  |  $VERSION_MESSAGE
  |
  |  Commit    | '$REACT_APP_CLIENT_COMMIT_HASH
  |
  ------------------------------------------------------------

EOF

