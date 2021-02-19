# https://misc.flogisoft.com/bash/tip_colors_and_formatting

# Set
bold='\e[1mBold'
reset_bold='\e[21m'
reset_all='\e[0m'

# Foreground
black='\e[0;30m'
red='\e[0;31m'
green='\e[0;32m'
yellow='\e[0;33m'
blue='\e[0;34m'
magenta='\e[0;35m'
cyan='\e[0;36m'
light_gray='\e[0;37m'
dark_gray='\e[0;90m'
light_red='\e[0;91m'
light_green='\e[0;92m'
light_yellow='\e[0;93m'
light_blue='\e[0;94m'
light_magenta='\e[0;95m'
light_cyan='\e[0;96m'
white='\e[0;97m'

# text_color 'A colorful message' $RED
function text_color(){
    printf "$2$1${reset_all}\n"
}

function text_bold(){
    printf "${bold}$1${reset_all}\n"
}
