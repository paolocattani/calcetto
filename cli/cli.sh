#!/bin/bash

#------> Const
ROOT_DIR='/c/Users/PaoloCattani/Workspaces/Workspaces_private/calcetto'
LOG_FILE="$ROOT_DIR/cli/cli.log"

##############################################################################
#------> Show Help
##############################################################################
showHelp_() {
cat << EOF

    Usage: ${0##*/} [command] [option]
    Type '${0##*/} [command] --help' to get help about the command

    command :
        release         |   Release new version
        update          |   Just update version ( no tag )
        tag             |   Create new tag ( pick version from package.json )
        add_to_commit   |   Add version files to commit ( .env sonar-project.properties package.json package-lock.json )
        hooks           |   Edit hooks
        build           |   Create production build
        help            |   Show this help

    option :
        --no-redirect   |   Don't redirect output to file
        --debug         |   Enable debug

    Example :

    cli release --minor --debug

EOF
}

##############################################################################
# Functions
##############################################################################

#------> Build
function build {
    echo "Build start..."
    # Build client
    npm run CRA:build

    # TODO: Build server
    echo "Build end !.."
}

#------> Update version
function update {
    echo "Update start..."
    # Update version
    . cli/update_version.sh
    echo "Update end !.."
}

#------> Add version files to commit
function add_to_commit {
    echo "Add_to_commit start..."
    echo "Adding files to commit..."
    git add .env sonar-project.properties package.json package-lock.json
    echo "Add_to_commit end !"
}

#------> Release
function release {
    echo "Release start..."
    update "$@"

    add_to_commit

    # Commit
    echo "Commit release : $NEW_VERSION"
    git commit -m "Release $NEW_VERSION"

    # Create tag
    tag

    echo "Release done !.."
}

#------> Create new tag
function tag {
    echo "Tag start..."
    NEW_VERSION=v$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');

    if [ $(git tag -l "$NEW_VERSION") ]; then
        echo "Tag $NEW_VERSION already exists.."
    else
        echo "Create tag $NEW_VERSION"
        git tag -a "$NEW_VERSION" HEAD -m "Release $NEW_VERSION"

        echo "Update Heroku env vars"
        HEROKU_API_KEY='5156b758-3383-4d74-a0cf-69371949b4ab'
        COMMIT_HASH=$(git rev-parse --short HEAD);
        heroku config:set REACT_APP_CLIENT_VERSION=$NEW_VERSION -a calcetto2020stage
        heroku config:set REACT_APP_CLIENT_COMMIT_HASH=$COMMIT_HASH -a calcetto2020stage
        heroku config:set REACT_APP_CLIENT_VERSION=$NEW_VERSION -a calcetto2020production
        heroku config:set REACT_APP_CLIENT_COMMIT_HASH=$COMMIT_HASH -a calcetto2020production
    fi

    echo "Tag done !.."
}

#------> Enable/Disable hook
function hooks {
    echo "Tag start..."
    . cli/hooks.sh
    echo "Hooks done !.."
}

#------> Loop thought args
function log_args {
    for value in "$@"
    do
        echo $value
    done
}
##############################################################################
# Main
##############################################################################
command=$1
# Just show help
if [[ $command == "help" ]]; then
    showHelp_
    exit 0
fi

# Test if the first param is a valid command, else show help
if  [[ $command == "release" ]] || [[ $command == "tag" ]]  ||
    [[ $command == "hooks" ]]   || [[ $command == "update" ]] ||
    [[ $command == "add_to_commit" ]] || [[ $command == "build" ]]; then

    # Move to root
    echo ""
    cd $ROOT_DIR

    # general options
    noredirect=0
    debug=0

    #------> Parse Input
    i=0
    j=$#
    args=()
    while [ $i -le $j ]
    do
        argument=${BASH_ARGV[i]}
        # echo "Arg $i : $argument";
        # Build args array
        if [[ $argument != "--no-redirect" ]] && [[ $argument != $command ]] ; then
            # Add in first position
            args=("$argument" "${args[@]}")
        fi
        case "$argument" in
            # don't redirect output
            --no-redirect) noredirect=1
                ;;
            --debug) debug=1
                ;;
        esac;
        i=$((i + 1));
    done

    # Redirect output
    if [[ $noredirect -eq 0 ]]; then
        source cli/redirect_output.sh
    fi

    # Debug
    if [[ $debug -eq 1 ]]; then
        log_args "$@"
    fi

    # Exec the command
    $command "${args[@]}"
    exit 0
else
    # Show help if not a valid command
    showHelp_
    exit 0
fi

