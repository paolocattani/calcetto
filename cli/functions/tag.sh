function tag {
    echo "Tag start..."
    NEW_VERSION=v$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');

    if [ $(git tag -l "$NEW_VERSION") ]; then
        echo "Tag $NEW_VERSION already exists.."
    else
        echo "Create tag $NEW_VERSION"
        git tag -a "$NEW_VERSION" HEAD -m "Release $NEW_VERSION"

        echo "Update Heroku env vars"
        HEROKU_API_KEY=$(cat secrets/.heroku)
        COMMIT_HASH=$(git rev-parse --short HEAD);
        heroku config:set REACT_APP_CLIENT_VERSION=$NEW_VERSION -a calcetto2020stage
        heroku config:set REACT_APP_CLIENT_COMMIT_HASH=$COMMIT_HASH -a calcetto2020stage
        heroku config:set REACT_APP_CLIENT_VERSION=$NEW_VERSION -a calcetto2020production
        heroku config:set REACT_APP_CLIENT_COMMIT_HASH=$COMMIT_HASH -a calcetto2020production

        # Push to remote calcetto_private
        echo "Updating private repo"
        git push calcetto_private
    fi

    echo "Tag done !.."
}