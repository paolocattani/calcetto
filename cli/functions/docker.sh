## Show Help
function showHelp_docker() {
cat << EOF
    Usage: cli.sh docker [option]

    Example : ./cli/cli.sh docker --build --push --no-redirect
    Options :
        --build             Docker build
        --push              Push image to github container registry


EOF
}

function docker_cli {

    build=0;
    force=0;
    env='production';
    push=0;
    tag=$(git describe --tags --abbrev=0)

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
            -f|--force)
            force=1;
            shift
            ;;
            -e|--env)
            shift
            env=$1
            shift
            ;;
            -t|--tag)
            shift
            tag=$1
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
    if  [[ $build -eq 0 ]] && [[ $push -eq 0 ]]; then
        showHelp_docker
        exit 0
    fi   

    # Create docker image
    if [[ $build -eq 1 ]]; then
        text_color " --------------> Create production build" $green
        # build --all 
        text_color " --------------> Production build done !" $green

        text_color " --------------> Create docker image" $green
        tag=$(git describe --tags --abbrev=0)
        echo "tag : paolocattani/calcetto:$tag"
        echo "ENV : $env"

        docker build -t paolocattani/calcetto:$tag -t docker.pkg.github.com/paolocattani/calcetto/calcetto:$tag -f docker/Dockerfile --build-arg ENV=$env .
        text_color " --------------> Docker image created !" $green
    fi

    if [[ $build -eq 1 ]]; then
        text_color " --------------> Create docker image" $green
        cat ./secrets/.github | docker login https://docker.pkg.github.com -u paolocattani --password-stdin
        image_name="docker.pkg.github.com/paolocattani/calcetto/calcetto:$tag"

        if [[ force -eq 0]]; then
            echo "You're going to push image $(text_color $image_name $blue)"
            read -p "Continue ? ( y/n ) : " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # Deploy
                force=1
            else
                echo "Aborted.."
                exit 0;
            fi
        fi

        if [[ forcd -eq 1]]; then
            echo "Pushing $image_name..."
            docker push $image_name
            text_color " --------------> Docker push done !" $green
        fi

    fi
}

