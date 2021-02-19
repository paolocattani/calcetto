## Show Help
showHelp_heroku() {
cat << EOF
    Usage: cli.sh build [option]

    options :
        -d , --deploy       Deploy current branch
        -p , --prod         Deploy on production env

EOF
}

function heroku_cli {

    deploy=0;
    destination='heroku-staging';

    while [[ $# -gt 0 ]]
    do
        case "$1" in
            -d|--deploy)
            deploy=1;
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
    if [[ $deploy -eq 0 ]]; then
        showHelp_heroku
        exit 0
    fi

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
    exit 0
}

