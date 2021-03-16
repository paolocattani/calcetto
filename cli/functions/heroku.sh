## Show Help
function showHelp_heroku() {
cat << EOF
    Usage: cli.sh build [option]

    options :
        --postbuild         Heroku postbuild command
        --prebuild          Heroku prebuild command
        --cleanup           Heroku cleanup command
        --start             Heroku start command
        -d , --deploy       Deploy current branch
        -p , --prod         Deploy on production env

EOF
}

function heroku_cli {

    deploy=0;
    destination='calcetto2020stage';
    start=0;
    prebuild=0;
    postbuild=0;
    cleanup=0;

    while [[ $# -gt 0 ]]
    do
        case "$1" in
            -d|--deploy)
            deploy=1;
            shift
            ;;
            -s|--start)
            start=1;
            shift
            ;;
            --cleanup)
            cleanup=1;
            shift
            ;;
            --prebuild)
            prebuild=1;
            shift
            ;;
            --postbuild)
            postbuild=1;
            shift
            ;;
            -p|--prod)
            destination='calcetto2020production';
            shift
            ;;
            -h|--help)
            showHelp_heroku
            exit 0
            ;;
            *)
            shift
            ;;
        esac
    done

    # Show help if no option selected
    if  [[ $deploy -eq 0 ]] && [[ $start -eq 0 ]] && [[ $prebuild -eq 0 ]] && [[ $postbuild -eq 0 ]] && [[ $cleanup -eq 0 ]]; then
        showHelp_heroku
        exit 0
    fi

    # Deploy to Heroku
    # Add remotes : 
    # heroku git:remote -a calcetto2020production
    # git remote rename heroku calcetto2020production
    # heroku git:remote -a calcetto2020stage
    # git remote rename heroku calcetto2020stage
    if [[ $deploy -eq 1 ]]; then
        echo "Start deploy on Heroku"
        # Get current branch name
        branchName=$(git rev-parse --abbrev-ref HEAD)
        # https://stackoverflow.com/questions/1885525/how-do-i-prompt-a-user-for-confirmation-in-bash-script
        echo "You're going to push branch $(text_color $branchName $blue) to $(text_color $destination $red)"
        read -p "Continue ? ( y/n ) : " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            # Deploy
            echo "Deploy $branchName to $destination..."
            git push $destination $branchName:master
        else
            echo "Aborted.."
        fi
    fi

    # https://devcenter.heroku.com/articles/nodejs-support
    # Heroku prebuild commands
    # "This runs before Heroku installs dependencies"
    if [[ $prebuild -eq 1 ]]; then
        text_color " --------------> Prebuild" $yellow
        # Uninstall cypress to speed up build process
        npm uninstall cypress @cypress/code-coverage @cypress/instrument-cra @cypress/webpack-preprocessor \
            cypress-intellij-reporter cypress-plugin-snapshots cypress-skip-and-only-ui cypress-watch-and-reload

        cd server
        npm ci
        ./node_modules/.bin/pm2 install pm2-intercom
        text_color " --------------> Prebuild Done!" $yellow
    fi

    # Heroku postbuild
    # Given that :
    #   default buildpack installs frontend dependencies
    #   heroku-prebuild installs server dependecies and pm2
    #
    # We have to :
    #   - build frontend
    #   - transpile server
    # "This runs after Heroku installs dependencies, but before Heroku prunes and caches dependencies."
    # "If the package.json has a build script that needs to be customized for Heroku, define a heroku-postbuild script, which will run instead of the build script."
    if [[ $postbuild -eq 1 ]]; then
        text_color " --------------> Build frontend" $yellow
        # Stop deploy if build breaks
        npm i
        npm run CRA:build || ( text_color "Frontend build error ! " $red && exit 1 )
        text_color " --------------> Frontend build done! " $yellow

        text_color " --------------> Build backend" $yellow
        cd server
        npm run build || ( text_color "Backend build error ! " $red && exit 1 )
        cd ..
        text_color " --------------> Backend build done! " $yellow

        text_color " --------------> Create destination folder" $yellow
        mkdir production_build

        text_color " --------------> Copy files" $yellow
        cp -r build server/build_server/* ./production_build
        rm ./production_build/server/ecosystem.*.js
        rm -r ./production_build/server/test
        cp server/ecosystem.config.prod.js ./production_build/server/ecosystem.config.js
        cp server/package*.json ./production_build
        cp Procfile ./production_build

        # !!! I want to clean up before heroku caches dependencies
        text_color " --------------> Cleanup" $yellow
        # remove all files
        rm ./*
        # remove directories
        rm -rf .github .idea .vscode build cypress docker hooks node_modules public server sql src
        cp -r production_build/* .
        rm -rf production_build
        text_color " --------------> Cleanup done" $yellow

        text_color " --------------> Installing production dependencies" $yellow
        npm i --only=prod
        text_color " --------------> Complete.! " $yellow

        # Add execute permession to cli
        chmod -R +x cli

    fi

    # "This runs after Heroku prunes and caches dependencies."
    # @unused
    if [[ $cleanup -eq 1 ]]; then
        text_color " --------------> Cleanup" $yellow
        # remove all files
        rm ./*
        # remove directories
        rm -rf .github .idea .vscode build cypress docker hooks node_modules public server sql src
        cp -r production_build/* .
        rm -rf production_build
        text_color " --------------> Cleanup done" $yellow
    fi

    #
    if [[ $start -eq 1 ]]; then
        text_color " --------------> Bootstrap application using pm2-runtime" $yellow
        cd server 
        ./node_modules/.bin/pm2-runtime start ecosystem.config.js
    fi
    exit 0
}

