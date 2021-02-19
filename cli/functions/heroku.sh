## Show Help
showHelp_heroku() {
cat << EOF
    Usage: cli.sh build [option]

    options :
        -d , --deploy       Deploy current branch
        -p , --prod         Deploy on production env

EOF
}

function build {

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

    # Get current branch name
    branchName=$(git rev-parse --abbrev-ref HEAD)

    # Deploy
    heroku push $destination $branchName:master

}

