## Show Help
showHelp_build() {
cat << EOF
    Usage: cli.sh build [option]

    options :
        -a , --all          Build all
        -f , --frontend     Build only frontend
        -b , --backend      Build only backend
        -h , --help         Show this help

EOF
}

function build {

    buildFeOnly=0;
    buildBeOnly=0;
    buildAll=0;
    while [[ $# -gt 0 ]]
    do
        case "$1" in
            -a|--all)
            buildAll=1;
            shift
            ;;
            -f|--frontend)
            buildFeOnly=1
            shift
            ;;
            -b|--backend)
            buildBeOnly=1
            shift
            ;;
            -h|--help)
            showHelp_build
            exit 0
            ;;
            *)
            shift
            ;;
        esac
    done

    # Show help if no option selected
    if [[ $buildFeOnly -eq 0 ]] && [[ $buildBeOnly -eq 0 ]] && [[ $buildFeOnly -eq 0 ]] ; then
        showHelp_build
        exit 0
    fi
    # Only build Frontend
    if [[ $buildFeOnly -eq 1 ]] && [[ $buildBeOnly -eq 0 ]]; then
        echo "Start frontend build..."
    fi
    # Only build Backend
    if [[ $buildFeOnly -eq 0 ]] && [[ $buildBeOnly -eq 1 ]]; then
        echo "Start backend build..."
    fi
    # Build All
    if [[ $buildFeOnly -eq 1 ]] && [[ $buildBeOnly -eq 1 ]]; then
        buildAll=1;
        echo "Start build..."
        if [ -d "production_build" ]; then
            echo "Clean up destination folder..."
            rm -r production_build/*
        fi
    fi

    if [[ $buildFeOnly -eq 1 ]] || [[ $buildAll -eq 1 ]]; then
        echo "[ FrontEnd ] Run --> npm run CRA:build"
        npm run CRA:build
        echo "[ FrontEnd ] Run --> npm run analyze"
        npm run analyze
    fi

    if [[ $buildBeOnly -eq 1 ]] || [[ $buildAll -eq 1 ]]; then
        # Build server
        cd server
        echo "[ BackEnd ] Run --> npm run build"
        npm run build
        cd ..
    fi

    if [[ $buildAll -eq 1 ]]; then
        echo "[ All ] Composing folder 'production_build'..."
        if [ ! -d "production_build" ]; then
            echo "[ All ] Creating folder 'production_build'..."
            mkdir production_build
        fi
        echo "[ All ] Copy builds and config files..."
        # Frontend build
        cp build ./production_build
        # Backend build
        cp server/build_server ./production_build
        # Config files
        cp .env ./production_build
        cp server/package*.json ./production_build/server
        echo "[ All ] Install production dependecies..."
        cd ./production_build/server
        npm install --only=prod
        cd ../..

        echo '[ All ] Done!..'
    fi
}

