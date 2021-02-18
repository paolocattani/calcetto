echo "! Redirecting output to : $LOG_FILE. Use --no-redirect to disable this option."
# Close STDOUT and STDERR file descriptor
exec 1<&-
exec 2<&-
# Open STDOUT as $LOG_FILE file for read and write.
exec 1<>$LOG_FILE
: > $LOG_FILE
# Redirect STDERR to STDOUT
exec 2>&1