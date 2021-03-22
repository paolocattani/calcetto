## Show Help
function showHelp_docker() {
cat << EOF
    Usage: cli.sh docker [option]

    options :
        --build             Docker build

EOF
}

function docker_cli {

    build=0;
    env='production';
    push=0;

    while [[ $# -gt 0 ]]
    do
        case "$1" in
            -b|--build)
            build=1;
            shift
            ;;
            -p|--push)
            push=1;
            shift
            ;;
            -e|--env)
            shift
            env=$1
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
    if  [[ $build -eq 0 ]]; then
        showHelp_docker
        exit 0
    fi

    tag=$(git describe --tags --abbrev=0)

    # Create docker image
    if [[ $build -eq 1 ]]; then
        text_color " --------------> Create production build" $green
        #build --all 
        text_color " --------------> Production build done !" $green

        text_color " --------------> Create docker image" $green
        echo "tag : paolocattani/calcetto:$tag"
        echo "ENV : $env"

        # cat ./secrets/.github | docker login https://docker.pkg.github.com -u paolocattani --password-stdin
        # docker push docker.pkg.github.com/OWNER/REPOSITORY/IMAGE_NAME:VERSION
        # docker push docker.pkg.github.com/paolocattani/calcetto/calcetto:v2.14.1
        docker build -t paolocattani/calcetto:$tag -t docker.pkg.github.com/paolocattani/calcetto/calcetto:$tag -f docker/Dockerfile --build-arg ENV=$env .
        text_color " --------------> Docker image created !" $green
        # cat ./secrets/.github | docker login https://docker.pkg.github.com -u paolocattani --password-stdin
    fi

}

