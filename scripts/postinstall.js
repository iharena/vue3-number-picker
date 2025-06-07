// postinstall.ts
const green = '\x1b[32m'
const cyan = '\x1b[36m'
const yellow = '\x1b[33m'
const magenta = '\x1b[35m'
const reset = '\x1b[0m'
const bold = '\x1b[1m'
const dim = '\x1b[2m'

console.log(
  '\n' +
    `${magenta}╭─────────────────────────────────────────────────────────────────────────────╮${reset}\n` +
    `  ${green}${bold}Thank you for installing @mgcodeur/vue-number-input!${reset}\n` +
    `  ${yellow}★${reset}  ${cyan}If you find this project helpful, please consider starring us on GitHub:${reset}\n` +
    `  ${dim}→ https://github.com/iharena/vue3-number-picker${reset}\n` +
    `${magenta}╰─────────────────────────────────────────────────────────────────────────────╯${reset}\n`,
)
