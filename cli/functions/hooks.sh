enable=0
disable=0
status=0
hook=''
type=''

POSITIONAL=()
while [[ $# -gt 0 ]]
do
    case "$1" in
        -e|--enable)
        enable=1
        status=1
        shift
        ;;
        -d|--disable)
        disable=1
        status=0
        shift
        ;;
        -t|--type)
        type="$2"
        shift
        shift
        ;;
        -h|--hook)
        hook="$2"
        shift
        shift
        ;;
        *)
        POSITIONAL+=("$1") # save it in an array for later
        shift # past argument
        ;;
    esac
done

if [[ $enable -eq 1 ]] && [[ $disable -eq 1 ]]; then
    echo "Enable and disable togheter ? Really ?"
    exit 0;
fi

if [[ $hook != "pre-commit" ]] && [[ $hook != "post-commit" ]] && [[ $hook != "all" ]]; then
    echo "Unknown hook '$hook'"
    exit 0;
fi

if [[ $type != "major" ]] && [[ $type != "minor"  ]] && [[ $type != "patch"  ]] && [[ ! -z "$type" ];] then
    echo "Unknown type '$type'"
    exit 0;
fi

if [[ $hook == "pre-commit" ]]; then
    sed -i "s|^PRE-COMMIT=.*$|PRE-COMMIT=$status|g" hooks/.hooks
elif [[ $hook == "post-commit" ]]; then
    sed -i "s|^POST-COMMIT=.*$|POST-COMMIT=$status|g" hooks/.hooks
elif [[ $hook == "all" ]]; then
    sed -i "s|^PRE-COMMIT=.*$|PRE-COMMIT=$status|g" hooks/.hooks
    sed -i "s|^POST-COMMIT=.*$|POST-COMMIT=$status|g" hooks/.hooks
fi

if [ ! -z "$type" ]; then
    sed -i "s|^TYPE=.*$|TYPE=$type|g" hooks/.hooks
fi

