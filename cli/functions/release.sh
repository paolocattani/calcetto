function release {
    echo "Release start..."
    update "$@"

    add_to_commit

    # Commit
    echo "Commit release : $NEW_VERSION"
    git commit -m "Release $NEW_VERSION"

    # Create tag
    tag

    echo "Release done !.."
}