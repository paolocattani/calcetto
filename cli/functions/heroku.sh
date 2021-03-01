## Show Help
showHelp_heroku() {
cat << EOF
    Usage: cli.sh build [option]

    options :
        -s , --start        Start app
        -d , --deploy       Deploy current branch
        -p , --prod         Deploy on production env

EOF
}

function heroku_cli {

    deploy=0;
    destination='heroku-staging';
    start=0;

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
            -p|--prod)
            destination='heroku-production';
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
    if [[ $deploy -eq 0 ]] && [[ $start -eq 0 ]]; then
        showHelp_heroku
        exit 0
    fi

    # Deploy to Heroku
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

    # Start app
    # This option runs after heroku buid to start the application
    # Given that :
    #   default buildpack installs frontend dependencies
    #   heroku-prebuild installs server dependecies and pm2
    #   heroku-postbuild build fronted
    #
    # We just have to transpile server and put everything in the final folder.
    # Then we remove everythings else
    if [[ $start -eq 1 ]]; then
        # Where are we?
        echo " --------------> We are we ?"
        pwd
        ls -ls
        echo " --------------> Ok"

        echo " --------------> Create destination folder"
        mkdir production_build
        echo " --------------> Copy files"
        cp -r build server/build_server/* ./production_build
        cp .env* ./production_build
        cp server/ecosystem.config.prod.js ./production_build/ecosystem.config.js
        cp server/package*.json ./production_build/server
        echo " --------------> We are we ?"
        pwd
        ls -ls
        echo " --------------> Ok"
        cd ./production_build/server
        npm install --only=prod
    fi
    exit 0
}

