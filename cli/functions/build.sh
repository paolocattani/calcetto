function build {
    echo "Clean up destination folder..."
    rm -r production_build/*

    echo "Build start..."
    # Build client
    npm run CRA:build
    echo '--> Run Analysis...'
    # npm run lint:report
    npm run analyze

    # Build server
    cd server
    npm run build
    echo "Build end !.."
}