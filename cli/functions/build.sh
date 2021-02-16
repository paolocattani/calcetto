function build {

    echo "Build start..."
    # Build client
    npm run CRA:build
    echo '--> Run Analysis...'
    # npm run lint:report
    npm run analyze

    # Build server
    cd server
    npm run build

    cd ..
    cp -r build .env production_build/
    cp -r production_build/* functions/
    echo "Build end !.."
}